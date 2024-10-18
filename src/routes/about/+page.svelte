<script lang="ts">
	import { animate } from '$lib/animate';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	import Header from '$lib/components/Header.svelte';
	export let data;
</script>

<Header position="static" />
<BuyMeACoffee classes="fixed top-4 right-4" />
<article
	class="prose prose-invert md:prose-lg lg:prose-2xl prose-h1:mb-2 prose-h2:mt-10 mb-16 mx-4 md:mx-auto mt-32 xl:mt-24"
	use:animate={{ type: 'from', duration: 1, y: -200, opacity: 0, ease: 'expo.inOut' }}
>
	<svelte:component this={data.content} />
</article>
