<script>
	import {
		CompassOutline,
		CodeSlashOutline,
		RocketOutline,
		BriefcaseOutline,
		HammerOutline,
		LogoGithub,
		LogoLinkedin,
		Book
	} from 'svelte-ionicons';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/all';

	let heroSection;
	let philosophySection;
	let projectsSection;
	let experienceSection;
	let contactSection;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// Hero section animations
		gsap.from(heroSection.querySelector('h1'), {
			y: 30,
			opacity: 0,
			duration: 1,
			delay: 0.5
		});

		gsap.from(heroSection.querySelector('.hero-text'), {
			y: 20,
			opacity: 0,
			duration: 1,
			delay: 0.8
		});

		gsap.from(heroSection.querySelector('.hero-seperator'), {
			y: 20,
			opacity: 0,
			duration: 1,
			delay: 0.85
		});

		gsap.from(heroSection.querySelector('.scroll-indicator'), {
			y: 20,
			opacity: 0,
			duration: 1,
			delay: 0.9
		});

		gsap.from(heroSection.querySelectorAll('.social-link'), {
			y: 20,
			opacity: 0,
			duration: 0.8,
			stagger: 0.2,
			delay: 1,
			clearProps: 'opacity'
		});

		// Philosophy section animations
		const philosophyItems = philosophySection.querySelectorAll('.philosophy-item');
		philosophyItems.forEach((item) => {
			gsap.from(item, {
				scrollTrigger: {
					trigger: item,
					start: 'top 80%',
					end: 'top 20%',
					toggleActions: 'play none none reverse'
				},
				y: 40,
				opacity: 0,
				duration: 1
			});
		});

		// Projects animations
		const projectCards = projectsSection.querySelectorAll('.group');
		gsap.from(projectCards, {
			scrollTrigger: {
				trigger: projectsSection,
				start: 'top 70%',
				toggleActions: 'play none none reverse'
			},
			y: 30,
			opacity: 0,
			duration: 0.8,
			stagger: 0.2
		});

		// Experience animations
		const experienceItems = experienceSection.querySelectorAll('.space-y-16 > div');
		gsap.from(experienceItems, {
			scrollTrigger: {
				trigger: experienceSection,
				start: 'top 70%',
				toggleActions: 'play none none reverse'
			},
			y: 30,
			opacity: 0,
			duration: 0.8,
			stagger: 0.2
		});

		// Contact section animation
		gsap.from(contactSection, {
			scrollTrigger: {
				trigger: contactSection,
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			},
			y: 30,
			opacity: 0,
			duration: 1
		});
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>Jasper Clarke | Backend Developer</title>
	<link rel="canonical" href="https://jasperclarke.com" />
	<meta
		name="description"
		content="Meet Jasper Clarke, a web/software developer who loves solving problems, finding simple solutions to complex challenges and bringing clarity to complicated systems."
	/>
	<meta property="og:url" content="https://jasperclarke.com" />
	<meta property="og:title" content="Jasper Clarke | Backend Developer" />
	<meta
		property="og:description"
		content="I transform complex problems into elegant solutions. Backend developer, bass guitarist, and perpetual learner creating digital experiences that matter."
	/>
	<meta property="og:site_name" content="Jasper Clarke" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<div class="min-h-screen flex items-center relative overflow-hidden" bind:this={heroSection}>
		<div class="max-w-3xl mx-auto px-6 py-24 relative">
			<h1 class="text-6xl font-light mb-8">Hello, I'm Jasper Clarke</h1>
			<p class="text-xl text-gray-400 mb-12 leading-relaxed hero-text">
				I'm a web/software developer who loves solving problems. I enjoy finding simple solutions to
				complex challenges and bringing clarity to complicated systems.
			</p>
			<div class="h-px w-24 bg-white opacity-30 mb-12 hero-seperator"></div>
			<p class="text-lg text-gray-500 mb-12 scroll-indicator">Scroll to explore my world</p>
			<div class="flex gap-6">
				<a
					href="https://github.com/jasper-clarke"
					class="opacity-50 hover:opacity-100 transition-opacity social-link"
				>
					<LogoGithub class="w-6 h-6" />
					<span class="sr-only">GitHub</span>
				</a>
				<a
					href="https://bsky.app/profile/jasperclarke.com"
					class="opacity-50 hover:opacity-100 transition-opacity social-link mt-[1px]"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"
						><path
							d="M111.8 62.2C170.2 105.9 233 194.7 256 242.4c23-47.6 85.8-136.4 144.2-180.2c42.1-31.6 110.3-56 110.3 21.8c0 15.5-8.9 130.5-14.1 149.2C478.2 298 412 314.6 353.1 304.5c102.9 17.5 129.1 75.5 72.5 133.5c-107.4 110.2-154.3-27.6-166.3-62.9l0 0c-1.7-4.9-2.6-7.8-3.3-7.8s-1.6 3-3.3 7.8l0 0c-12 35.3-59 173.1-166.3 62.9c-56.5-58-30.4-116 72.5-133.5C100 314.6 33.8 298 15.7 233.1C10.4 214.4 1.5 99.4 1.5 83.9c0-77.8 68.2-53.4 110.3-21.8z"
							fill="#FFFFFF"
						/></svg
					>
					<span class="sr-only">Bluesky</span>
				</a>
				<a
					href="https://www.linkedin.com/in/jasper-clarke/"
					class="opacity-50 hover:opacity-100 transition-opacity social-link"
				>
					<LogoLinkedin class="w-6 h-6" />
					<span class="sr-only">LinkedIn</span>
				</a>
				<a href="/blog" class="opacity-50 hover:opacity-100 transition-opacity social-link">
					<Book class="w-6 h-6" />
					<span class="sr-only">Blog</span>
				</a>
				<!-- <a href="/podcasts" class="opacity-50 hover:opacity-100 transition-opacity social-link"> -->
				<!-- 	<Mic class="w-6 h-6" /> -->
				<!-- 	<span class="sr-only">Podcasts</span> -->
				<!-- </a> -->
			</div>
		</div>
	</div>

	<!-- Personal Philosophy Section -->
	<div class="min-h-screen flex items-center bg-zinc-900" bind:this={philosophySection}>
		<div class="max-w-3xl mx-auto px-6 py-24">
			<div class="space-y-24">
				<div class="philosophy-item">
					<div class="flex items-center gap-4 mb-6">
						<CompassOutline class="w-12 h-12 opacity-75" />
						<h2 class="text-sm uppercase tracking-wider text-gray-500">My Approach</h2>
					</div>
					<p class="text-3xl font-light leading-relaxed mb-8">
						I believe in the power of persistence. My individual way of seeing the world has taught
						me that different perspectives aren't limitations – they're advantages. They're what
						make my solutions unique.
					</p>
					<p class="text-gray-400 leading-relaxed">
						Every challenge I face becomes a story of growth. Whether I'm diving into low-level
						programming or architecting complex systems, I bring my whole self to the task.
					</p>
				</div>

				<div class="philosophy-item">
					<div class="flex items-center gap-4 mb-6">
						<CodeSlashOutline class="w-12 h-12 opacity-75" />
						<h2 class="text-sm uppercase tracking-wider text-gray-500">My Work</h2>
					</div>
					<p class="text-3xl font-light leading-relaxed mb-8">
						I speak multiple languages – Go, PHP, TypeScript, and more. But what matters isn't the
						tools I use, it's how I use them to bring ideas to life.
					</p>
					<p class="text-gray-400 leading-relaxed">
						Backend development isn't just my profession; it's where I find my flow. It's where
						complex puzzles meet elegant solutions.
					</p>
				</div>

				<div class="philosophy-item">
					<div class="flex items-center gap-4 mb-6">
						<RocketOutline class="w-12 h-12 opacity-75" />
						<h2 class="text-sm uppercase tracking-wider text-gray-500">My Journey</h2>
					</div>
					<p class="text-3xl font-light leading-relaxed mb-8">
						Every day is a new opportunity to learn, to grow, to push beyond what I thought was
						possible. This isn't just about code – it's about continuous improvement.
					</p>
					<p class="text-gray-400 leading-relaxed">
						I'm not just building software; I'm building a legacy of problem-solving and
						perseverance. Each challenge overcome is a story worth telling.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="min-h-screen flex items-center bg-black" bind:this={projectsSection}>
		<div class="max-w-3xl mx-auto px-6 py-24">
			<div class="flex items-center gap-4 mb-12">
				<HammerOutline class="w-8 h-8 opacity-75" />
				<h2 class="text-sm uppercase tracking-wider text-gray-500">Featured Projects</h2>
			</div>

			<div class="space-y-16">
				<div class="group">
					<div class="flex justify-between items-start mb-4">
						<span
							><a
								class="text-2xl font-light linkanimation"
								href="https://github.com/jasper-clarke/atlaswm"
								target="_blank">AtlasWM</a
							></span
						>
						<span class="text-sm text-gray-500">Late 2024</span>
					</div>
					<p class="text-gray-400 mb-4">
						After using Linux for years and my curiosity to learn C bursting at the seams, I decided
						to write my own window manager. It's a simple and lightweight window manager that I've
						been using for a few months now and it has taught me a lot about memory management in
						the C ecosystem.
					</p>
					<div class="flex gap-3">
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>C</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>TOML</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>Nix</span
						>
					</div>
				</div>

				<div class="group">
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-2xl font-light">Website CMS</h3>
						<span class="text-sm text-gray-500">Mid-Late 2024</span>
					</div>
					<p class="text-gray-400 mb-4">
						This is a website management CMS I built over a weekend to build and deploy multiple
						websites using PHP and Docker through just the interface. This was inspired by a CMS my
						employer created when I worked at Cloud Concepts. I gained a much better understand of
						PHP and its patterns through this project.
					</p>
					<div class="flex gap-3">
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>PHP</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>Docker</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>NGINX</span
						>
					</div>
				</div>

				<div class="group">
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-2xl font-light">There Is A Reason</h3>
						<span class="text-sm text-gray-500">Mid 2024</span>
					</div>
					<p class="text-gray-400 mb-4">
						My interest in the Golang programming language sprouted into the idea to make my own
						game. I had always been fascinated with graphics programming and wanted to learn more
						about it. This project was a chance to explore the language and its ecosystem.
					</p>
					<div class="flex gap-3">
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>Golang</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>OpenGL</span
						>
						<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"
							>Image Manipulation</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="min-h-screen flex items-center bg-zinc-900" bind:this={experienceSection}>
		<div class="max-w-3xl mx-auto px-6 py-24">
			<div class="flex items-center gap-4 mb-12">
				<BriefcaseOutline class="w-8 h-8 opacity-75" />
				<h2 class="text-sm uppercase tracking-wider text-gray-500">Education &amp; Experience</h2>
			</div>

			<div class="space-y-16">
				<div>
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-2xl font-light">Looking for Work</h3>
							<p class="text-gray-500">Remote</p>
						</div>
						<span class="text-sm text-gray-500">Present</span>
					</div>
					<p class="text-gray-400">
						I'm currently looking for work as a full-stack or backend web/software developer. Reach
						out <span><a href="mailto:me@jasperclarke.com" class="linkanimation">here</a></span>.
					</p>
				</div>

				<div>
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-2xl font-light">PHP Developer</h3>
							<p class="text-gray-500">Cloud Concepts</p>
						</div>
						<span class="text-sm text-gray-500">July 2024 - Nov 2024</span>
					</div>
					<p class="text-gray-400">
						At Cloud Concepts, I primarily worked on building backend systems using PHP and reactive
						frontends using JavaScript. This job gave me the opportunity to learn more about UI and
						UX design.
					</p>
				</div>

				<div>
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-2xl font-light">Certificate III in Programming (Web Development)</h3>
							<p class="text-gray-500">TAFE NSW</p>
						</div>
						<span class="text-sm text-gray-500">Jan 2024 - July 2024</span>
					</div>
					<p class="text-gray-400 italic">
						"Jasper, you have clearly demonstrated that your skills in these areas are well beyond
						what is required in this course." - 'Coby D' TAFE NSW
					</p>
				</div>

				<div>
					<div class="flex justify-between items-start mb-4">
						<div>
							<h3 class="text-2xl font-light">Programming and Web Development</h3>
							<p class="text-gray-500">Self Taught</p>
						</div>
						<span class="text-sm text-gray-500">2018 - 2024</span>
					</div>
					<p class="text-gray-400">
						I started my programming journey with HTML and CSS, then progressed to Python and
						Django. I've since moved on to JavaScript based web frameworks like React, NextJS,
						SvelteKit and more. In my free time I have picked up other languages like Java and C
						through modding games and making my own desktop environment on my Linux computer.
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Contact Section -->
	<div class="min-h-screen flex items-center" bind:this={contactSection}>
		<div class="max-w-3xl mx-auto px-6 py-24 text-center">
			<h2 class="text-4xl font-light mb-8">Let's Write the Next Chapter Together</h2>
			<p class="text-xl text-gray-400 mb-12">
				Whether you have a challenge that needs solving or a vision that needs bringing to life, I'd
				love to hear from you.
			</p>
			<a class="btn" href="mailto:me@jasperclarke.com"> Contact Me </a>
		</div>
	</div>

	<footer class="py-8 px-6 bg-black">
		<div
			class="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm"
		>
			<div>
				© {new Date().getFullYear()} Jasper Clarke. All rights reserved.
			</div>
			<div class="flex items-center gap-6">
				<a href="/blog" class="hover:text-white transition-colors">Blog</a>
				<a href="https://github.com/jasper-clarke" class="hover:text-white transition-colors"
					>GitHub</a
				>
				<a
					href="https://www.linkedin.com/in/jasper-clarke/"
					class="hover:text-white transition-colors">LinkedIn</a
				>
			</div>
		</div>
	</footer>
</div>

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

	.btn {
		background: #000;
		box-shadow:
			4px 4px #000,
			9px 9px #3f3f46;
		color: white;
		text-transform: lowercase;
		border: solid 2px #3f3f46;

		text-decoration: none;

		padding: 18px 32px;
		display: inline-flex;
		align-items: center;
		font-size: 14px;
		font-weight: 700;
		position: relative;
		z-index: 1;
		transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
		cursor: pointer;
		overflow: hidden;
		transition-delay: 0s !important;
		text-transform: uppercase !important;
		letter-spacing: 1.5px;
		font-family: sans-serif;
	}
	.btn::before {
		position: absolute;
		content: '';
		top: 0;
		right: 0;
		width: 0%;
		height: 100%;
		background: #151515;
		z-index: -1;
		transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
	}
	.btn:hover::before {
		width: 100%;
		left: 0;
		right: unset;
	}
	.btn:hover {
		box-shadow:
			0 0 #000,
			0 0 #151515;
		color: white;
	}
</style>
