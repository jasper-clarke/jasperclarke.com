<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { animate } from '$lib/animate.js';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';

	// Ensure the component is mounted before adding event listeners
	onMount(() => {
		const input = document.getElementById('askJasperInput');
		// @ts-ignore
		input.addEventListener('keyup', onKeyup);
		gsap.from('.down', {
			duration: 1,
			y: -200,
			z: 0,
			stagger: 0.15,
			ease: 'power2.out'
		});
		// gsap.from('.suggestion', {
		// 	duration: 1,
		// 	x: -200,
		// 	opacity: 0,
		// 	stagger: 0.15,
		// 	ease: 'power2.out'
		// });
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>Jasper Clarke | Web Architect &amp; Engineer</title>

	<link rel="canonical" href="https://jasperclarke.com" />

	<meta
		name="description"
		content="Jasper Clarke, a Web Architect &amp; Engineer with a passion for building performant and scalable web applications."
	/>

	<meta property="og:url" content="https://jasperclarke.com" />
	<meta property="og:title" content="Jasper Clarke | Web Architect &amp; Engineer" />
	<meta
		property="og:description"
		content="Portfolio of Jasper Clarke, a Web Architect &amp; Engineer with a passion for building performant and scalable web applications."
	/>
	<meta property="og:site_name" content="Jasper Clarke" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<BuyMeACoffee classes="absolute top-4 right-4" />
<main
	class="min-h-screen bg-black text-white flex items-center md:justify-center font-serif flex-col"
>
	<div class="absolute top-4 left-4 flex flex-col gap-1">
		<h1 class="text-4xl down">Jasper Clarke</h1>
		<span class="down">
			<a
				href="https://www.linkedin.com/in/jasper-clarke/"
				target="_blank"
				rel="noreferrer"
				class="text-2xl linkanimation">LinkedIn</a
			>
		</span>
		<span class="down"
			><a
				href="https://github.com/jasper-clarke"
				target="_blank"
				rel="noreferrer"
				class="text-2xl linkanimation">GitHub</a
			></span
		>
		<span class="down">
			<a href="/blog" class="text-2xl linkanimation"
				>Blog<span class="text-sm absolute top-0 -right-8">New!</span></a
			>
		</span>
	</div>
	<div
		class="flex flex-col border-2 border-zinc-900 shadow-2xl shadow-white/15 rounded-lg p-4 font-sans min-w-[200px] md:min-w-[700px] md:mt-0 max-w-[700px] mr-4 ml-4 mt-64 askJasper"
		use:animate={{ type: 'from', duration: 1.5, scale: 0.6, opacity: 0, ease: 'expo.inOut' }}
	>
		<p>
			Hey wait, your not supposed to see this? Come back later when I rebuild this part of the site!
		</p>
	</div>
</main>

<style>
	.linkanimation {
		text-decoration: none;
		text-decoration-color: none;
		position: relative;
	}
	.linkanimation::before {
		position: absolute;
		content: '';
		width: 100%;
		height: 1px;
		background-color: #d4d4d8;
		transform: scale(1, 1);
		transition: background-color 0.5s ease-in-out;
		bottom: 0px;
	}
	.linkanimation:hover::before {
		animation: link ease 1s 1 300ms;
		transform-origin: right;
	}
	@keyframes link {
		50% {
			transform: scaleX(0);
		}
		50.1% {
			transform: translateX(-100%) scalex(-0.01);
		}
		100% {
			transform: translateX(-100%) scalex(-1);
		}
	}
</style>
