<script lang="ts">
	import EmailGenerated from '$lib/components/EmailGenerated.svelte';
	import Info from '$lib/components/Info.svelte';
	import { showToast } from '$lib/store.svelte';
	import { copyAllToClipboard, copyToClipboard, generateDotCombinations } from '$lib/utils';

	let generatedEmails = $state<string[]>([]);
	let emailCount = $state<number>(0);

	let email = $state('');
	let maxDots = $state(3);
	let includeOriginal = $state(true);
	let randomize = $state(true);
	let loading = $state(false);

	function handleSubmit() {
		if (!email) {
			showToast('Please enter a valid email address', 'error');
			return;
		}
		if (email.includes('@')) {
			if (!email.toLowerCase().endsWith('@gmail.com')) {
				showToast('Please enter a valid Gmail address', 'error');
				return;
			}
		}
		showToast('Generating emails...', 'info', 1000);
		loading = true;
		const username = email.replace(/@gmail\.com$/, '');
		email = '';
		setTimeout(() => {
			generatedEmails = generateDotCombinations(username, maxDots, includeOriginal, randomize);
			emailCount = generatedEmails.length;
			loading = false;
			showToast('Emails generated successfully', 'success');
		}, 2000);
	}
</script>

<section class="mb-12">
	<div class="overflow-hidden rounded-2xl bg-white shadow-xl">
		<div class="border-b border-slate-100">
			<div class="p-6">
				<h3 class="mb-4 text-lg font-medium text-slate-800">
					<span
						class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600"
						>1</span
					>
					Enter Your Gmail Address
				</h3>
				<div class="space-y-4">
					<div class="space-y-2">
						<label for="email" class="block text-sm font-medium text-slate-700">Gmail Address</label
						>
						<div class="relative">
							<input
								type="text"
								name="email"
								id="email"
								placeholder="youremail"
								required
								class="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
								bind:value={email}
							/>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<span class="text-slate-400">@gmail.com</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-6">
			<h3 class="mb-4 text-lg font-medium text-slate-800">
				<span
					class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600"
					>2</span
				>
				Email Variation Settings
			</h3>
			<div class="space-y-6">
				<div class="space-y-2">
					<label for="dots" class="block text-sm font-medium text-slate-700"
						>Maximum Dots (1-5)</label
					>
					<input
						type="number"
						name="dots"
						id="dots"
						placeholder="3"
						min="1"
						max="5"
						required
						class="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 transition duration-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						bind:value={maxDots}
					/>
				</div>
				<div class="flex flex-wrap items-center gap-4">
					<div class="flex items-center">
						<input
							type="checkbox"
							id="include-original"
							name="include-original"
							class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
							bind:checked={includeOriginal}
						/>
						<label for="include-original" class="ml-2 text-sm text-slate-700"
							>Include original email</label
						>
					</div>
					<div class="flex items-center">
						<input
							type="checkbox"
							id="randomize"
							name="randomize"
							class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
							bind:checked={randomize}
						/>
						<label for="randomize" class="ml-2 text-sm text-slate-700"
							>Randomize dot positions</label
						>
					</div>
				</div>
				<div>
					<button
						onclick={handleSubmit}
						disabled={loading}
						class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
					>
						{#if loading}
							<svg
								class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Generating...
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
								/>
							</svg>
							Generate Email Variations
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
</section>

<Info {emailCount} />

<EmailGenerated {emailCount} {generatedEmails} {copyAllToClipboard} {copyToClipboard} />
