<script>
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let isOpen = false;
	let showMenu = false;
	let messages = [];
	let inputValue = '';
	let isLoading = false;
	let chatContainer;

	// Helper function to parse text and extract markdown links [text](url) and bare URLs
	function parseMessageWithLinks(text) {
		if (!text) return [];
		const combinedRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s,.)\]]+)/g;
		const parts = [];
		let lastIndex = 0;
		let match;

		while ((match = combinedRegex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				parts.push({
					type: 'text',
					content: text.substring(lastIndex, match.index)
				});
			}

			if (match[1] && match[2]) {
				// Markdown link [label](url)
				parts.push({
					type: 'link',
					url: match[2],
					content: match[1]
				});
			} else if (match[3]) {
				// Standalone URL
				parts.push({
					type: 'link',
					url: match[3],
					content: match[3]
				});
			}

			lastIndex = match.index + match[0].length;
		}

		if (lastIndex < text.length) {
			parts.push({
				type: 'text',
				content: text.substring(lastIndex)
			});
		}

		return parts.length > 0 ? parts : [{ type: 'text', content: text }];
	}

	function toggleChat() {
		isOpen = !isOpen;
		if (isOpen && messages.length === 0) {
			addSystemMessage(
				"Maupay nga adlaw! Ako hi TANI, an official AI Assistant han Tanauan, Leyte. Puyde ka magpakiana ha akon in Waray, Tagalog, o English parte ha mga serbisyo, permits, opisyales, turismo, o festivals han aton bungto!"
			);
		}
		if (isOpen) {
			setTimeout(() => chatContainer?.scrollTo(0, chatContainer.scrollHeight), 0);
		}
	}

	function addSystemMessage(text) {
		messages = [...messages, { role: 'system', text, timestamp: new Date() }];
		setTimeout(() => chatContainer?.scrollTo(0, chatContainer.scrollHeight), 0);
	}

	async function sendMessage() {
		if (!inputValue.trim() || isLoading) return;

		const userMessage = inputValue.trim();
		inputValue = '';
		messages = [...messages, { role: 'user', text: userMessage, timestamp: new Date() }];
		isLoading = true;

		try {
			const resp = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: userMessage,
					history: messages.filter((m) => m.role === 'user' || m.role === 'assistant')
				})
			});

			const data = await resp.json();

			if (!resp.ok) {
				throw new Error(data.error || `HTTP ${resp.status}`);
			}

			const finalText =
				data.reply ||
				'Waray po ako hito nga detalye ha akon opisyal nga datos yana. Palihog bisitaha an Tanauan Municipal Hall.';

			messages = [...messages, { role: 'assistant', text: finalText, timestamp: new Date() }];
		} catch (error) {
			console.error('Chat Assistant error:', error);
			addSystemMessage(`Pasensya, mayda aberya: ${error.message}`);
		} finally {
			isLoading = false;
			setTimeout(() => chatContainer?.scrollTo(0, chatContainer.scrollHeight), 50);
		}
	}

	function handleKeyDown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	function clearChat() {
		messages = [];
		addSystemMessage('Chat cleared! Hello! What can I do to help?');
	}
</script>

<div class="fixed right-6 bottom-6 z-40 font-sans">

	<!-- Launcher Menu Backdrop for closing on outside click -->
	{#if showMenu && !isOpen}
		<button
			type="button"
			class="fixed inset-0 z-30 cursor-default bg-black/15 backdrop-blur-[2px] transition-opacity"
			on:click={() => (showMenu = false)}
			aria-label="Close menu backdrop"
		></button>
	{/if}

	<!-- Unified Floating Help Desk Card -->
	{#if showMenu && !isOpen}
		<div
			transition:scale={{ duration: 220, start: 0.92, easing: cubicOut }}
			class="relative z-40 mb-3 w-80 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-xl transition-all"
			style="transform-origin: bottom right;"
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-blue-800/40 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 px-4 py-3 text-white">
				<div class="flex items-center gap-2.5">
					<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/20 text-yellow-300">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
					</div>
					<div>
						<h4 class="text-xs font-black tracking-wider uppercase text-white">Tanauan Help Desk</h4>
						<p class="text-[10px] text-blue-200">How can we assist you today?</p>
					</div>
				</div>
				<button
					type="button"
					on:click={() => (showMenu = false)}
					class="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
					title="Close"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>

			<!-- Menu Options -->
			<div class="p-2 space-y-1.5">
				<!-- TANI AI Assistant Option -->
				<button
					type="button"
					on:click={() => { showMenu = false; toggleChat(); }}
					class="group flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-blue-50/80 cursor-pointer border border-transparent hover:border-blue-200/80"
				>
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-yellow-300 shadow-md shadow-blue-500/20 transition-transform duration-200 group-hover:scale-105">
							<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
							</svg>
						</div>
						<div>
							<p class="text-xs font-bold text-slate-800 group-hover:text-blue-900 transition-colors">TANI AI Assistant</p>
							<p class="text-[10px] text-slate-500">Ask questions, permits & municipal info</p>
						</div>
					</div>
					<svg class="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
				</button>

				<!-- FAQ Option -->
				<a
					href="/FAQ"
					on:click={() => (showMenu = false)}
					class="group flex w-full items-center justify-between rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-blue-50/80 cursor-pointer border border-transparent hover:border-blue-200/80"
				>
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-700 transition-transform duration-200 group-hover:scale-105 group-hover:bg-blue-100">
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<div>
							<p class="text-xs font-bold text-slate-800 group-hover:text-blue-900 transition-colors">Frequently Asked Questions</p>
							<p class="text-[10px] text-slate-500">Citizen guidelines, requirements & forms</p>
						</div>
					</div>
					<svg class="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
				</a>
			</div>
		</div>
	{/if}

	<!-- Floating Launcher Button -->
	{#if !isOpen}
		<div class="relative z-40 flex justify-end">
			<button
				type="button"
				on:click={() => (showMenu = !showMenu)}
				class="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white shadow-xl shadow-blue-900/35 ring-4 ring-white transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 cursor-pointer"
				title="Tanauan Assistance & FAQ"
				aria-label="Open assistance menu"
			>
				<div class="transition-transform duration-300 ease-out {showMenu ? 'rotate-90' : 'rotate-0'}">
					{#if showMenu}
						<!-- X icon when menu is open -->
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{:else}
						<!-- Chat bubble icon -->
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
						</svg>
					{/if}
				</div>

				{#if !showMenu}
					<!-- Notification dot -->
					<span class="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 ring-2 ring-white shadow-md">
						<span class="text-[9px] font-black text-blue-950">2</span>
					</span>
				{/if}
			</button>
		</div>
	{/if}

	{#if isOpen}
		<div
			transition:scale={{ duration: 260, start: 0.92, easing: cubicOut }}
			class="mb-4 flex max-h-[600px] w-96 flex-col overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-2xl backdrop-blur-md"
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-3 text-white"
			>
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
					</svg>
					<div>
						<h3 class="text-sm font-bold leading-none">TANI</h3>
						<p class="text-[10px] text-blue-100">Tanauan AI Assistant</p>
					</div>
				</div>
				<div class="flex gap-2">
					<button
						on:click={clearChat}
						class="rounded p-1 transition-colors hover:bg-blue-600"
						title="Clear chat"
						aria-label="Clear chat history"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"
							/>
						</svg>
					</button>
					<button
						on:click={toggleChat}
						class="rounded p-1 transition-colors hover:bg-blue-600"
						title="Close chat"
						aria-label="Close chat assistant"
					>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Messages Container -->
			<div bind:this={chatContainer} class="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
				{#each messages as message (message.timestamp)}
					<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
						<div
							class="max-w-xs rounded-lg px-4 py-2 {message.role === 'user'
								? 'rounded-br-none bg-blue-500 text-white'
								: message.role === 'system'
									? 'rounded-bl-none border border-yellow-300 bg-yellow-100 text-yellow-800'
									: 'rounded-bl-none bg-slate-200 text-slate-900'}"
						>
							<div class="text-sm">
								{#each parseMessageWithLinks(message.text) as part}
									{#if part.type === 'link'}
										<a
											href={part.url}
											target="_blank"
											rel="noopener noreferrer"
											class="font-semibold underline hover:opacity-80"
										>
											{part.content}
										</a>
									{:else}
										{part.content}
									{/if}
								{/each}
							</div>
						</div>
					</div>
				{/each}

				{#if isLoading}
					<div class="flex justify-start">
						<div class="rounded-lg rounded-bl-none bg-slate-200 px-4 py-2 text-slate-900">
							<div class="flex gap-1">
								<div class="h-2 w-2 animate-bounce rounded-full bg-slate-600"></div>
								<div
									class="h-2 w-2 animate-bounce rounded-full bg-slate-600"
									style="animation-delay: 0.2s"
								></div>
								<div
									class="h-2 w-2 animate-bounce rounded-full bg-slate-600"
									style="animation-delay: 0.4s"
								></div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Input Area -->
			<div class="border-t border-slate-200 bg-white p-3">
				<div class="flex gap-2">
					<textarea
						bind:value={inputValue}
						on:keydown={handleKeyDown}
						placeholder="Magsulat ng iyong tanong..."
						class="flex-1 resize-none rounded-lg border border-slate-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
						rows="2"
						disabled={isLoading}
					></textarea>
					<button
						on:click={sendMessage}
						disabled={isLoading || !inputValue.trim()}
						class="flex h-full items-center justify-center rounded-lg bg-blue-500 px-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
						title="Send message (Enter)"
						aria-label="Send message"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.4322088 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4689847 C0.994623095,2.0379695 0.837654326,3.0805539 1.15159189,3.8660409 L3.03521743,10.3070339 C3.03521743,10.4641313 3.19218622,10.6212287 3.50612381,10.6212287 L16.6915026,11.4067156 C16.6915026,11.4067156 17.1624089,11.4067156 17.1624089,12.0350746 C17.1624089,12.6634335 16.6915026,12.4744748 16.6915026,12.4744748 Z"
							/>
						</svg>
					</button>
				</div>
				<p class="mt-2 text-xs text-slate-500">Nagsasalita sa Waray-Waray | Powered by OpenRouter</p>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.animate-bounce) {
		animation: bounce 1.4s infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
