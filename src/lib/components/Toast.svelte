<script lang="ts">
	import { hideToast } from '$lib/store.svelte';
	import { elasticOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let {
		message,
		type = 'info',
		duration,
		visible
	}: { message: string; type: string; duration: number; visible: boolean } = $props();

	const bgColor = $derived(() => {
		return type === 'success'
			? 'bg-green-50 border-green-200'
			: type === 'error'
				? 'bg-red-50 border-red-200'
				: 'bg-blue-50 border-blue-200';
	});

	const textColor = $derived(() => {
		return type === 'success'
			? 'text-green-700'
			: type === 'error'
				? 'text-red-700'
				: 'text-blue-700';
	});

	const iconColor = $derived(() => {
		return type === 'success'
			? 'text-green-600'
			: type === 'error'
				? 'text-red-600'
				: 'text-blue-600';
	});

	$effect(() => {
		if (visible) {
			const timer = setTimeout(() => {
				hideToast();
			}, duration);

			return () => clearTimeout(timer);
		}
	});
</script>

{#if visible}
	<div
		class="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform"
		in:fly={{ y: 100, duration: 400, easing: elasticOut }}
		out:fade={{ duration: 300 }}
	>
		<div class={`rounded-lg border ${bgColor()} max-w-md p-4 shadow-lg`}>
			<div class="flex">
				<div class="flex-shrink-0">
					{#if type === 'success'}
						<svg
							class={`h-5 w-5 ${iconColor()}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else if type === 'error'}
						<svg
							class={`h-5 w-5 ${iconColor()}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						<svg
							class={`h-5 w-5 ${iconColor()}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</div>
				<div class="ml-3 flex-1">
					<p class={`text-sm font-medium ${textColor()}`}>{message}</p>
				</div>
			</div>
		</div>
	</div>
{/if}
