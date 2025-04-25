<script lang="ts">
	let { emailCount, copyAllToClipboard, generatedEmails, copyToClipboard } = $props();
</script>

<section class="mb-12">
	<div class="overflow-hidden rounded-2xl bg-white shadow-xl">
		<div
			class="flex flex-col items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center"
		>
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-5 w-5 text-blue-500"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
				</svg>
				<h2 class="text-lg font-semibold text-slate-800">Generated Emails</h2>
			</div>
			<div class="flex w-full items-center gap-2 sm:w-auto">
				{#if emailCount > 0}
					<span class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
						>{emailCount} emails</span
					>
					<button
						onclick={() => copyAllToClipboard(generatedEmails)}
						class="ml-auto flex cursor-pointer items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:ml-0"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1.5 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
							/>
						</svg>
						Copy All
					</button>
				{/if}
			</div>
		</div>

		<div class="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
			{#each generatedEmails as email}
				<div class="flex items-center justify-between bg-white p-4">
					<p
						class="mr-2 max-w-[calc(100%-2rem)] flex-1 truncate overflow-hidden font-mono text-sm text-slate-700"
						title={email}
					>
						{email}
					</p>
					<button
						onclick={() => copyToClipboard(email)}
						class="flex-shrink-0 cursor-pointer rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
						title="Copy to clipboard"
						aria-label="copy"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
					</button>
				</div>
			{:else}
				<div
					class="flex h-40 items-center justify-center bg-white p-8 text-center text-slate-500 col-span-full"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mx-auto mb-2 h-10 w-10 text-slate-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<p class="text-sm">No emails have been generated yet.</p>
						<p class="mt-1 text-xs text-slate-400">
							Enter your Gmail address and click the 'Generate' button.
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
