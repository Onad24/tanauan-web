import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getRelevantContext, searchDocuments } from '$lib/ragSearch';

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

// Curated list of high-quality free models on OpenRouter (proven to handle Philippine languages accurately)
const FREE_MODELS = [
	'nex-agi/nex-n2.5-pro:free',
	'nex-agi/nex-n2.5-mini:free',
	'cohere/north-mini-code:free'
];

// Fallback candidates if individual requests needed
const FALLBACK_MODELS = [
	'nex-agi/nex-n2.5-pro:free',
	'nex-agi/nex-n2.5-mini:free',
	'cohere/north-mini-code:free',
	'google/gemma-4-31b-it:free'
];

function cleanAssistantResponse(text) {
	if (!text || typeof text !== 'string') return '';
	// Strip reasoning blocks <think>...</think>
	let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
	// Strip occasional thinking traces like "Here's a thinking process:\n..."
	cleaned = cleaned.replace(/^Here's a thinking process:[\s\S]*?\n\n/i, '').trim();
	cleaned = cleaned.replace(/^Okay, the user is asking[\s\S]*?\n\n/i, '').trim();
	// Fix broken split markdown links like [https://tanauan-leyte](https://tanauan-leyte/).vercel.app/Departments
	cleaned = cleaned.replace(
		/\[(?:Source:\s*)?\[?(https?:\/\/[^\]]+)\]\([^)]+\)([^\]\s)]+)/gi,
		'$1$2'
	);
	return cleaned;
}

export async function POST({ request }) {
	try {
		const apiKey = env.OPENROUTER_API_KEY || env.GEMINI_API_KEY;
		if (!apiKey) {
			return json(
				{ error: 'OpenRouter API key is not configured on the server.' },
				{ status: 500 }
			);
		}

		const body = await request.json();
		const userMessage = body.message || body.query;
		const history = Array.isArray(body.history) ? body.history : [];

		if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
			return json({ error: 'A valid message is required.' }, { status: 400 });
		}

		// 1. Retrieve verified Wiki and Website context
		const wikiContext = getRelevantContext(userMessage, 4);
		const sources = searchDocuments(userMessage, 4).map((doc) => ({
			title: doc.title,
			url: doc.url
		}));

		// 2. Build system prompt grounded strictly in the wiki
		const systemPrompt = `You are "TANI", the friendly, knowledgeable, and STRICTLY FACTUAL AI Assistant for the Municipality of Tanauan, Leyte, Philippines.
You help citizens and visitors on the official website.

CRITICAL FACTUAL RULES (MUST BE FOLLOWED STRICTLY):
1. Base your answers SOLELY on the official verified information provided in the "RELEVANT WIKI & OFFICIAL WEBSITE INFORMATION" section below.
2. DO NOT invent, assume, or infer any names, dates, phone numbers, department heads, fees, or requirements that are not in the provided text.
3. If the user's question cannot be answered using the provided wiki information, state clearly:
   "Waray po ako hito nga detalye ha akon opisyal nga datos yana. Palihog bisitaha an opisyal nga website o kadto ha Tanauan Municipal Town Hall para han opisyal nga impormasyon." (or equivalent in Tagalog or English).
4. When mentioning offices, services, or procedures, provide the exact Official URL from the context in clean format (e.g. [Office Name](url)). Never mangle or break URLs.
5. ANTI-HALLUCINATION & VOCABULARY GUARDRAILS:
   - A municipality is a "munisipyo" or "bungto". NEVER translate municipality as "kabundakan" or anything mountain-related.
   - "Tanauan" is the proper noun/name of the town. NEVER translate it as "tanaw" or "tanaw na".
   - Offices and departments are "opisina" or "departamento". NEVER use fabricated or corrupted words (like "deptuwation" or "kagamaan sa sibol").
   - DO NOT output inner monologue, reasoning steps, or preamble. Answer directly to the visitor.
6. Language & Dialect Instructions:
   - When the user asks in Waray-Waray, speak in the CASUAL TACLOBANON DIALECT (the modern, friendly everyday Waray spoken in Tacloban and Tanauan, Leyte).
   - DO NOT use deep, ancient, or archaic Waray words (avoid archaic terms like "kasikatan", "hinaot", "pananglitan", "alayon", "pinanngasoy").
   - DO naturally mix in conversational Tagalog and English words just like locals do (Taglish/Waray code-switching).
     For example: use words like "requirements", "office", "fee", "website", "details", "steps", "processing", "pwede", "check", "mismo".
   - Examples of natural Taclobanon tone:
     * "Oo! An Tanauan, Leyte kay usa nga munisipyo (bungto) ha probinsya han Leyte, Eastern Visayas."
     * "Hi! An incumbent Mayor hit Tanauan kay hi Hon. Ma. Gina E. Merilo."
     * "Puyde ka kumadto ha Municipal Civil Registrar ha may Town Hall..."
     * "₱80.00 la it fee para hit birth certificate, tapos mga 34 minutes la it processing."
     * "Para ha iba pa nga details, icheck la ini nga link: [Mayor's Office](https://tanauan-leyte-gov-locale.vercel.app/Mayors%20Corner)."
   - If the user asks in Tagalog / Filipino, reply in natural conversational Tagalog.
   - If the user asks in English, reply in friendly English.
   - Always remain polite, concise, and helpful.

====================
RELEVANT WIKI & OFFICIAL WEBSITE INFORMATION:
${wikiContext}
====================`;

		// 3. Format messages payload
		const recentHistory = history.slice(-6).map((msg) => ({
			role: msg.role === 'user' ? 'user' : 'assistant',
			content: msg.text || msg.content || ''
		}));

		const messages = [
			{ role: 'system', content: systemPrompt },
			...recentHistory,
			{ role: 'user', content: userMessage.trim() }
		];

		// 4. Call OpenRouter with free models and fallback
		let replyText = '';
		let lastError = null;

		// First try with models array (OpenRouter automatic fallback)
		try {
			const res = await fetch(OPENROUTER_ENDPOINT, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
					'HTTP-Referer': 'https://tanauan-leyte-gov-locale.vercel.app',
					'X-Title': 'Tanauan Leyte Website Assistant'
				},
				body: JSON.stringify({
					models: FREE_MODELS,
					messages,
					temperature: 0.5,
					max_tokens: 1200
				})
			});

			if (res.ok) {
				const data = await res.json();
				const rawReply =
					data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || '';
				replyText = cleanAssistantResponse(rawReply);
			} else {
				const errBody = await res.text().catch(() => '');
				lastError = new Error(`OpenRouter returned HTTP ${res.status}: ${errBody}`);
			}
		} catch (err) {
			lastError = err;
		}

		// If initial request failed, try candidate free models one by one
		if (!replyText) {
			for (const model of FALLBACK_MODELS) {
				try {
					const fallbackRes = await fetch(OPENROUTER_ENDPOINT, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${apiKey}`,
							'HTTP-Referer': 'https://tanauan-leyte-gov-locale.vercel.app',
							'X-Title': 'Tanauan Leyte Website Assistant'
						},
						body: JSON.stringify({
							model,
							messages,
							temperature: 0.5,
							max_tokens: 1200
						})
					});

					if (fallbackRes.ok) {
						const fallbackData = await fallbackRes.json();
						const rawReply =
							fallbackData?.choices?.[0]?.message?.content ||
							fallbackData?.choices?.[0]?.text ||
							'';
						replyText = cleanAssistantResponse(rawReply);
						if (replyText) break;
					}
				} catch (err) {
					lastError = err;
				}
			}
		}

		if (!replyText) {
			throw lastError || new Error('No response generated from free models.');
		}

		return json({
			reply: replyText,
			sources,
			success: true
		});
	} catch (error) {
		console.error('Chat API error:', error);
		return json(
			{
				error: error.message || 'Failed to process chat message',
				reply:
					'Pasensya po, mayda teknikal nga aberya ha koneksyon ha AI assistant yana. Palihog sulayi utro unina.'
			},
			{ status: 500 }
		);
	}
}
