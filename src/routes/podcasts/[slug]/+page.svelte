<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import {
		PauseCircleOutline,
		PlayCircleOutline,
		VolumeMediumOutline,
		VolumeMuteOutline,
		ArrowBackOutline,
		ArrowForwardOutline
	} from 'svelte-ionicons';
	import { animate } from '$lib/animate.js';
	import { podcasts } from '$lib/podcasts.js';

	let { data } = $props();

	let isPlaying = $state(false);
	let isMuted = $state(false);
	let playbackRate = $state(1);
	let volume = $state(1);
	let audio: HTMLAudioElement;
	let currentTime = $state(0);
	let duration = $state(0);
	let progress = $state(0);

	let streamTitle: string = $state('');
	let streamDescription: string = $state('');
	let streamArtwork: string = $state('');

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	}

	function updateProgress() {
		if (audio && duration > 0) {
			progress = (currentTime / duration) * 100;
		}
	}

	function setPlaybackRate(rate: number) {
		if (audio) {
			playbackRate = rate;
			audio.playbackRate = rate;
		}
	}

	onMount(() => {
		const fetchMetadata = async () => {
			// Get podcasts object from array that matches data.podcast
			const podcast = podcasts.find((podcast) => podcast.slug === data.podcast);
			if (podcast) {
				streamTitle = podcast.title;
				streamDescription = podcast.description;
				streamArtwork = podcast.image || '/profile.jpg';
			}
		};
		fetchMetadata();
		audio = new Audio(`https://r2.jasperclarke.com/${data.podcast}.mp3`);
		audio.volume = volume;
		audio.playbackRate = playbackRate;

		// Update time every second
		const timeInterval = setInterval(() => {
			if (audio && isPlaying) {
				currentTime = audio.currentTime;
				duration = audio.duration || 0;
				updateProgress();
			}
		}, 1000);

		return () => {
			clearInterval(timeInterval);
			audio.pause();
			audio.src = '';
		};
	});

	function togglePlay() {
		if (audio) {
			if (isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
			isPlaying = !isPlaying;
		}
	}

	function toggleMute() {
		if (audio) {
			audio.muted = !isMuted;
			isMuted = !isMuted;
		}
	}

	function handleVolumeChange(event: Event) {
		const input = event.target as HTMLInputElement;
		volume = parseFloat(input.value);
		if (audio) {
			audio.volume = volume;
		}
	}

	function handleProgressChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const newTime = (parseFloat(input.value) / 100) * duration;
		if (audio) {
			audio.currentTime = newTime;
			currentTime = newTime;
		}
	}

	function skip(seconds: number) {
		if (audio) {
			const newTime = Math.min(Math.max(0, audio.currentTime + seconds), duration);
			audio.currentTime = newTime;
			currentTime = newTime;
		}
	}
</script>

<!-- SEO -->
<svelte:head>
	<title>Podcasting Live with Jasper Clarke</title>

	<link rel="canonical" href="https://jasperclarke.com/podcasts/{data.podcast}" />

	<meta
		name="description"
		content="Exploring the intersections of technology, personal growth, and creative problem-solving. Join me (Jasper Clarke) for in-depth conversations and insights in my own podcast collection."
	/>

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>
<Header position="absolute" />
<a
	class="group/btn absolute top-16 left-4 flex-row gap-4 flex w-fit z-40"
	href="/podcasts"
	use:animate={{ type: 'from', duration: 1, x: -200, ease: 'expo.inOut' }}
>
	<div class="flex items-center opacity-50 group-hover/btn:opacity-100 transition-opacity">
		<svg
			role="img"
			viewBox="0 0 16 16"
			width="10"
			height="10"
			style="transform: scale(-1.5, 1.5); transform-origin: center;"
			fill="currentColor"
			class="mt-1"
		>
			<path
				d="M7.293 1.707L13.586 8l-6.293 6.293a1 1 0 001.414 1.414l7-7a.999.999 0 000-1.414l-7-7a1 1 0 00-1.414 1.414z"
			></path>
		</svg>
		<svg
			role="img"
			viewBox="0 0 16 16"
			width="0"
			height="10"
			fill="currentColor"
			style="transform: translateX(-0.6em);"
			class="w-0 group-hover/btn:w-[0.7em] h-[0.7em] mt-1 ease-out duration-200 transition-all transform-gpu"
		>
			<path d="M1 9h14a1 1 0 000-2H1a1 1 0 000 2z"></path>
		</svg>
		<h2
			class="font-serif text-3xl group-hover/btn:pl-2 ease-out duration-200 transition-all transform-gpu"
		>
			Podcasts
		</h2>
	</div>
</a>
<div class="h-screen bg-black text-white flex flex-col">
	<!-- Main Content Grid -->
	<div class="flex flex-col md:flex-row h-full">
		<!-- Left Column - Artwork -->
		<div
			class="w-full h-1/2 md:w-1/2 md:h-full flex items-center justify-center p-12 border-r border-zinc-900 mt-12 md:mt-0"
		>
			<div class="relative w-full max-w-sm md:max-w-lg aspect-square">
				<!-- Artwork Container -->
				<div class="absolute inset-0 bg-zinc-900 rounded-lg overflow-hidden">
					<img
						src={streamArtwork || '/profile.jpg'}
						alt="Episode Artwork"
						class="w-full h-full object-cover opacity-80"
					/>
				</div>
			</div>
		</div>

		<!-- Right Column - Info & Controls -->
		<div class="w-full h-1/2 md:w-1/2 md:h-full flex flex-col pl-12 pr-12 pb-12 md:p-12">
			<!-- Episode Info -->
			<div class="flex-1 md:mt-6">
				<div class="space-y-6 max-w-lg">
					<div>
						<h1 class="text-4xl font-light mb-2">{streamTitle || 'Loading Title...'}</h1>
						<p class="text-lg text-gray-400">Live Session</p>
					</div>

					<p class="text-gray-400 leading-relaxed">
						{streamDescription || 'Loading Description...'}
					</p>
				</div>
			</div>

			<!-- Audio Controls -->
			<div class="border-t border-zinc-900 pt-8">
				<div class="max-w-lg">
					<!-- Progress Bar -->
					<div class="mb-6">
						<input
							type="range"
							min="0"
							max="100"
							bind:value={progress}
							oninput={handleProgressChange}
							class="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
						/>
						<div class="flex justify-between mt-2 text-sm text-gray-500">
							<span>{formatTime(currentTime)}</span>
							<span>{formatTime(duration)}</span>
						</div>
					</div>

					<!-- Play/Pause, Skip, and Volume -->
					<div class="flex flex-col sm:flex-row items-center gap-8">
						<div class="flex items-center gap-4">
							<button
								onclick={() => skip(-10)}
								class="p-2 hover:bg-zinc-900 rounded-full transition-colors"
							>
								<ArrowBackOutline class="w-5 h-5" />
							</button>

							<button
								onclick={togglePlay}
								class="p-2 hover:bg-zinc-900 rounded-full transition-colors"
							>
								{#if isPlaying}
									<PauseCircleOutline class="w-10 h-10" />
								{:else}
									<PlayCircleOutline class="w-10 h-10" />
								{/if}
							</button>

							<button
								onclick={() => skip(10)}
								class="p-2 hover:bg-zinc-900 rounded-full transition-colors"
							>
								<ArrowForwardOutline class="w-5 h-5" />
							</button>
						</div>

						<div class="hidden sm:flex items-center gap-4 flex-1">
							<button
								onclick={toggleMute}
								class="p-2 hover:bg-zinc-900 rounded-full transition-colors"
							>
								{#if isMuted}
									<VolumeMuteOutline class="w-5 h-5" />
								{:else}
									<VolumeMediumOutline class="w-5 h-5" />
								{/if}
							</button>
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								bind:value={volume}
								oninput={handleVolumeChange}
								class="flex-1 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
							/>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<button
							onclick={() => setPlaybackRate(1)}
							class="text-sm p-1 px-2 rounded hover:bg-zinc-900 transition-colors {playbackRate ===
							1
								? 'bg-zinc-900'
								: ''}"
						>
							1x
						</button>
						<button
							onclick={() => setPlaybackRate(1.25)}
							class="text-sm p-1 px-2 rounded hover:bg-zinc-900 transition-colors {playbackRate ===
							1.25
								? 'bg-zinc-900'
								: ''}"
						>
							1.25x
						</button>
						<button
							onclick={() => setPlaybackRate(1.5)}
							class="text-sm p-1 px-2 rounded hover:bg-zinc-900 transition-colors {playbackRate ===
							1.5
								? 'bg-zinc-900'
								: ''}"
						>
							1.5x
						</button>
						<button
							onclick={() => setPlaybackRate(2)}
							class="text-sm p-1 px-2 rounded hover:bg-zinc-900 transition-colors {playbackRate ===
							2
								? 'bg-zinc-900'
								: ''}"
						>
							2x
						</button>
					</div>

					<!-- Episode Notes Link -->
					<!-- <div class="mt-6 text-sm text-gray-500"> -->
					<!-- 	<a href="#" class="hover:text-white transition-colors" -->
					<!-- 		>View episode notes and resources →</a -->
					<!-- 	> -->
					<!-- </div> -->
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Optional: Add any Svelte-specific styles here */
	:global(input[type='range']::-webkit-slider-thumb) {
		-webkit-appearance: none;
		appearance: none;
		width: 12px;
		height: 12px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}

	:global(input[type='range']::-moz-range-thumb) {
		width: 12px;
		height: 12px;
		background: white;
		border-radius: 50%;
		cursor: pointer;
		border: none;
	}
</style>
