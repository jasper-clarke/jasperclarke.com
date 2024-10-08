<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..800&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap"
	/>
</svelte:head>

<main class="container mx-auto h-full bg-black text-white">
	<Header />
	<slot />
</main>
