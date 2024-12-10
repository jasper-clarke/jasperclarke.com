<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<BuyMeACoffee classes="fixed top-4 right-4" />
<Header position="fixed" />
{@render children?.()}
