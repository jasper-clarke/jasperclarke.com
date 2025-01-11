<script>
	import { CompassOutline, CodeSlashOutline, RocketOutline } from 'svelte-ionicons';
</script>

<!-- SEO -->
<svelte:head>
	<title>Jasper Clarke | Backend Developer</title>
	<link rel="canonical" href="https://jasperclarke.com" />
	<meta
		name="description"
		content="Meet Jasper Clarke, a backend developer who sees patterns in chaos and beauty in logic, crafting elegant solutions to complex digital challenges."
	/>
	<meta property="og:url" content="https://jasperclarke.com" />
	<meta property="og:title" content="Jasper Clarke | Digital Craftsman & Problem Solver" />
	<meta
		property="og:description"
		content="I transform complex problems into elegant solutions. Backend developer, bass guitarist, and perpetual learner creating digital experiences that matter."
	/>
	<meta property="og:site_name" content="Jasper Clarke" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Hero - More like an introduction -->
	<div class="min-h-screen flex items-center relative overflow-hidden">
		<!-- <div class="absolute top-0 left-0 w-full h-full opacity-5"> -->
		<!-- 	<div class="absolute w-full h-full border-l-2 border-white" style="left: 33%"></div> -->
		<!-- 	<div class="absolute w-full h-full border-l-2 border-white" style="left: 66%"></div> -->
		<!-- </div> -->

		<div class="max-w-3xl mx-auto px-6 py-24 relative">
			<h1 class="text-6xl font-light mb-8">Hello, I'm Jasper Clarke</h1>
			<p class="text-xl text-gray-400 mb-12 leading-relaxed">
				I craft digital solutions, but that's just part of my story. I'm someone who sees patterns
				in chaos and beauty in logic. Every day, I'm driven by the challenge of turning complex
				problems into elegant solutions.
			</p>
			<div class="h-px w-24 bg-white opacity-30 mb-12"></div>
			<p class="text-lg text-gray-500">Scroll to explore my world</p>
		</div>
	</div>

	<!-- Personal Philosophy Section -->
	<div class="min-h-screen flex items-center bg-zinc-900">
		<div class="max-w-3xl mx-auto px-6 py-24">
			<div class="space-y-24">
				<div>
					<div class="flex items-center gap-4 mb-6">
						<CompassOutline class="w-12 h-12 opacity-75" />
						<h2 class="text-sm uppercase tracking-wider text-gray-500">My Approach</h2>
					</div>
					<p class="text-3xl font-light leading-relaxed mb-8">
						I believe in the power of persistence. Being neurodivergent has taught me that different
						perspectives aren't limitations – they're advantages. They're what make my solutions
						unique.
					</p>
					<p class="text-gray-400 leading-relaxed">
						Every challenge I face becomes a story of growth. Whether I'm diving into low-level
						programming or architecting complex systems, I bring my whole self to the task.
					</p>
				</div>

				<div>
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

				<div>
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

	<!-- Contact Section -->
	<div class="min-h-screen flex items-center">
		<div class="max-w-3xl mx-auto px-6 py-24 text-center">
			<h2 class="text-4xl font-light mb-8">Let's Write the Next Chapter Together</h2>
			<p class="text-xl text-gray-400 mb-12">
				Whether you have a challenge that needs solving or a story that needs telling, I'd love to
				hear from you.
			</p>
			<button
				class="border border-white px-8 py-3 text-lg hover:bg-white hover:text-black transition-colors"
			>
				Start a Conversation
			</button>
		</div>
	</div>
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
</style>
