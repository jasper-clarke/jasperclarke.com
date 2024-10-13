<script>
	import Header from '$lib/components/Header.svelte';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
</script>

<BuyMeACoffee classes="fixed top-4 right-4" />
<Header position="fixed" />
<slot />
