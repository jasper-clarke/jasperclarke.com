<script lang="ts">
	import { animate } from '$lib/animate';
	import { LogoLinkedin, LogoDiscord, LogoGithub } from 'svelte-ionicons';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	import Header from '$lib/components/Header.svelte';
	export let data;
</script>

<Header position="static" />
<BuyMeACoffee classes="fixed top-4 right-4" />
<article
	class="prose prose-invert md:prose-lg lg:prose-2xl prose-h1:mb-2 prose-h2:mt-10 mb-16 mx-4 md:mx-auto mt-24"
	use:animate={{ type: 'from', duration: 1, y: -200, opacity: 0, ease: 'expo.inOut' }}
>
	<svelte:component this={data.content} />
	<!-- <small class="text-sm text-zinc-500 -mt-4">This isn't AI generated ;D</small> -->
	<div class="flex flex-row gap-4 items-center">
		<a href="https://www.linkedin.com/in/jasper-clarke/" target="_blank" rel="noreferrer">
			<LogoLinkedin size="60" />
		</a>
		<div class="grid mt-2 h-min">
			<!-- Tiny alert confirming that the user has copied the text -->
			<div
				class="absolute flex -mt-12 justify-self-center bg-zinc-900 text-white text-sm p-2 rounded-lg"
				style="display: none;"
				id="copySuccess"
			>
				Copied "jasper_clarke"
			</div>
			<button
				on:click={() => {
					navigator.clipboard.writeText('jasper_clarke');
					// @ts-ignore
					document.getElementById('copySuccess').style.display = 'flex';
					setTimeout(() => {
						// @ts-ignore
						document.getElementById('copySuccess').style.display = 'none';
					}, 5000);
				}}
				class="text-white"
			>
				<LogoDiscord size="60" />
			</button>
		</div>
		<a href="https://github.com/jasper-clarke" target="_blank" rel="noreferrer">
			<LogoGithub size="60" />
		</a>
	</div>
</article>
