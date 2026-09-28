// Semantic and keyword search utility for RAG
// Practical relevance scoring: query-coverage ratio with title, tag, and synonym boosts.
// Single source of truth: wiki compiled into ragKnowledgeBase.json

import ragData from './ragKnowledgeBase.json' with { type: 'json' };

// Stopwords removed so phrase queries match meaningful content terms.
const STOPWORDS = new Set([
	'the', 'a', 'an', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'is', 'are',
	'what', 'who', 'where', 'when', 'how', 'do', 'does', 'did', 'i', 'you',
	'we', 'they', 'it', 'he', 'she', 'my', 'your', 'our', 'their', 'this',
	'that', 'there', 'here', 'me', 'us', 'about', 'pls', 'please',
	'municipality', 'municipal', 'town', 'from', 'by', 'at', 'with',
	'has', 'have', 'had', 'can', 'get', 'give', 'tell', 'much', 'many',
	'ano', 'sino', 'saan', 'kailan', 'paano', 'ang', 'mga', 'ng', 'sa', 'kay',
	'hino', 'hain', 'diin', 'san-o', 'nano', 'kay-ano', 'an', 'hin', 'ha'
]);

// Multilingual synonym mappings (Waray, Tagalog, English) to bridge vocabulary gaps
const SYNONYMS = {
	'alkalde': ['mayor', 'mayors', 'ehekutibo'],
	'punong-bayan': ['mayor', 'mayors'],
	'punong': ['mayor'],
	'bise': ['vice', 'mayor', 'sanggunian'],
	'kapitan': ['barangay'],
	'kapistahan': ['festival', 'pasaka', 'fiesta'],
	'piyesta': ['festival', 'pasaka', 'fiesta'],
	'fiesta': ['festival', 'pasaka'],
	'trabaho': ['job', 'employment', 'peso', 'hrmo'],
	'empleyo': ['job', 'employment', 'peso', 'hrmo'],
	'hanapbuhay': ['employment', 'peso', 'livelihood'],
	'buwis': ['tax', 'taxes', 'treasurer', 'revenue'],
	'buhis': ['tax', 'taxes', 'treasurer', 'revenue'],
	'bayad': ['fee', 'fees', 'taxes', 'treasurer'],
	'lisensya': ['license', 'licensing', 'permit'],
	'negosyo': ['business', 'licensing', 'market'],
	'kalamidad': ['disaster', 'mdrrmo', 'emergency'],
	'bagyo': ['disaster', 'mdrrmo', 'emergency'],
	'baha': ['disaster', 'mdrrmo', 'emergency'],
	'sunog': ['fire', 'emergency', 'contact'],
	'pulis': ['police', 'emergency', 'contact'],
	'doktor': ['health', 'sanitation', 'hospital', 'rhu'],
	'gamot': ['health', 'sanitation', 'rhu'],
	'kasal': ['marriage', 'civil-registrar', 'registrar'],
	'kapanganakan': ['birth', 'civil-registrar', 'registrar'],
	'patay': ['death', 'civil-registrar', 'cemetery'],
	'turismo': ['tourism', 'spots', 'attractions', 'heritage'],
	'pasyalan': ['tourism', 'spots', 'attractions', 'heritage'],
	'simbahan': ['church', 'assumption', 'heritage', 'religion']
};

// Tokenize and normalize text
function tokenize(text) {
	if (!text) return [];
	const baseWords = text
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((word) => word.length > 2 && !STOPWORDS.has(word));

	// Expand with synonyms
	const expanded = [...baseWords];
	for (const word of baseWords) {
		if (SYNONYMS[word]) {
			expanded.push(...SYNONYMS[word]);
		}
	}

	return expanded;
}

// Calculate relevance: what fraction of the QUERY tokens appear in the document token set.
function calculateSimilarity(queryTokens, documentTokens) {
	if (queryTokens.length === 0 || documentTokens.length === 0) return 0;

	const docSet = new Set(documentTokens);
	let matches = 0;
	for (const token of queryTokens) {
		if (docSet.has(token)) matches++;
	}
	return matches / queryTokens.length;
}

// Search documents by query with weighted title, tags, and content
export function searchDocuments(query, topK = 4) {
	const queryTokens = tokenize(query);
	if (queryTokens.length === 0) return [];

	const results = ragData.documents
		.map((doc) => {
			const contentTokens = tokenize(doc.content);
			const titleTokens = tokenize(doc.title);
			const tagTokens = tokenize((doc.tags || []).join(' '));

			const contentScore = calculateSimilarity(queryTokens, contentTokens);
			const titleScore = calculateSimilarity(queryTokens, titleTokens);
			const tagScore = calculateSimilarity(queryTokens, tagTokens);

			// Title and tags strongly indicate topic relevance
			const totalScore = contentScore + 3.0 * titleScore + 2.0 * tagScore;

			return {
				...doc,
				score: totalScore
			};
		})
		.filter((doc) => doc.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, topK);

	return results;
}

// Get top K relevant documents as a context block formatted with URLs for citations
export function getRelevantContext(query, topK = 4) {
	const results = searchDocuments(query, topK);

	// If no specific documents matched, provide municipal overview and navigation map as baseline
	if (results.length === 0) {
		const baselineDocs = ragData.documents.filter(
			(d) => d.id === 'municipal-government' || d.id === 'website-navigation'
		);
		return baselineDocs
			.map(
				(doc) =>
					`Source: ${doc.title}\nOfficial URL: ${doc.url}\nInformation:\n${doc.content}`
			)
			.join('\n\n====================\n\n');
	}

	return results
		.map(
			(doc) =>
				`Source: ${doc.title}\nOfficial URL: ${doc.url}\nInformation:\n${doc.content}`
		)
		.join('\n\n====================\n\n');
}

// Get all documents (for initialization or reference)
export function getAllDocuments() {
	return ragData.documents;
}

// Get metadata
export function getMetadata() {
	return ragData.metadata;
}