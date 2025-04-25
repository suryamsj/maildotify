<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { toastState } from '$lib/store.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Maildotify</title>
</svelte:head>

<Toast
	message={toastState.message}
	type={toastState.type}
	visible={toastState.visible}
	duration={toastState.duration}
/>

<main class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-slate-800">
	<div class="container mx-auto max-w-4xl px-4 py-8">
		<Header />
		{@render children()}
		<Footer />
	</div>
</main>
