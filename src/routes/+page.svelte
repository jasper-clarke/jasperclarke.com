<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { animate } from '$lib/animate.js';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';

	let message = '';
	let responseText = 'Thinking...';
	let showLoader = false;
	let showButton = true;
	let showResponseContainer = false;

	// Function to handle the 'Enter' keypress event
	// @ts-ignore
	function onKeyup(e) {
		if (e.key === 'Enter') {
			askJasper(message);
		}
	}

	// Async function to call the API and update the UI accordingly
	// @ts-ignore
	async function askJasper(message) {
		showLoader = true;
		showButton = false;
		showResponseContainer = true;
		responseText = 'Thinking...';
		try {
			const response = await fetch('/api/askJasper', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message })
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			showLoader = false;
			showButton = true;

			let answerText = result.answer;
			responseText = '';

			let timeline = gsap.timeline();
			// @ts-ignore
			answerText.split(' ').forEach((word, index) => {
				timeline.to(
					{},
					{
						// Use an empty object for GSAP animation instead of DOM
						duration: 0.2,
						ease: 'back.inOut',
						onComplete: () => {
							responseText += ' ' + word;
						}
					}
				);
			});
		} catch (error) {
			console.error('Error:', error);
		}
	}

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
		content="Portfolio of Jasper Clarke, a Web Architect &amp; Engineer with a passion for building performant and scalable web applications."
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
		use:animate={{ type: 'from', duration: 1.2, y: -600, opacity: 0, ease: 'back.out' }}
	>
		<div class="flex flex-row items-center gap-2 mb-2">
			<button
				class="rounded-2xl bg-zinc-900 border border-zinc-800 p-2 text-sm sm:text-md suggestion hover:scale-105 transition ease-in-out duration-300"
				on:click={() => askJasper('Who are you?')}
			>
				Who are you?
			</button>
			<button
				class="rounded-2xl bg-zinc-900 border border-zinc-800 p-2 text-sm sm:text-md suggestion hover:scale-105 transition ease-in-out duration-300"
				on:click={() => askJasper('What do you do?')}
			>
				What do you do?
			</button>
			<button
				class="rounded-2xl bg-zinc-900 border border-zinc-800 p-2 text-sm sm:text-md hidden md:block suggestion hover:scale-105 transition ease-in-out duration-300"
				on:click={() => askJasper('What is your advice to developers?')}
			>
				What is your advice to developers?
			</button>
		</div>
		<div
			class="flex flex-row items-center border-2 border-zinc-900 rounded-tl-lg rounded-tr-lg flex-1"
		>
			<input
				type="text"
				id="askJasperInput"
				bind:value={message}
				placeholder="Ask Jasper..."
				class="p-2 text-white bg-black rounded-lg flex-1 focus:outline-none text-md"
			/>
			<button
				on:click={() => askJasper(message)}
				class="border-l-2 border-zinc-900 p-2 min-w-[50px] askJasperButton"
				style="display: {showButton ? 'block' : 'none'}"
			>
				<img src="/return-down-back-outline.svg" alt="Send" class="w-[32px] h-[32px]" />
			</button>
			<div class="loader w-2 mr-6" style="display: {showLoader ? 'block' : 'none'}"></div>
		</div>
		<div
			id="responseContainer"
			class="flex-col border-l-2 border-r-2 border-b-2 border-zinc-900 rounded-bl-lg rounded-br-lg flex-1"
			style="display: {showResponseContainer ? 'flex' : 'none'}"
		>
			<div class="ml-4 mt-4 flex flex-row gap-2 align-top">
				<img src="/profile.jpg" alt="Jasper Clarke" class="w-8 h-8 rounded-full" />
				<strong class="text-lg">Jasper:</strong>
			</div>
			<p id="responseText" class="text-lg ml-14 mb-4" style="max-width: 80%">{responseText}</p>
		</div>
		<a href="/about" class="text-sm absolute -bottom-14 self-center linkanimation text-zinc-200"
			>who <em>really</em> has time for small talk anyway...</a
		><small
			class="text-xs absolute -bottom-[3.7rem] self-center text-zinc-500 hover:text-zinc-200 transition ease-in-out duration-300 hover:scale-105"
		>
			I mean it's not like Jasper spent a <em>whole week</em> on that, right?
		</small>
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
	.loader {
		width: 10px;
		aspect-ratio: 1;
		border-radius: 50%;
		animation: loader 1s infinite linear alternate;
	}
	@keyframes loader {
		0% {
			box-shadow:
				15px 0 #fff,
				-15px 0 #fff2;
			background: #fff;
		}
		33% {
			box-shadow:
				15px 0 #fff,
				-15px 0 #fff2;
			background: #fff2;
		}
		66% {
			box-shadow:
				15px 0 #fff2,
				-15px 0 #fff;
			background: #fff2;
		}
		100% {
			box-shadow:
				15px 0 #fff2,
				-15px 0 #fff;
			background: #fff;
		}
	}
</style>
