<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import {
		PauseCircleOutline,
		PeopleOutline,
		PlayCircleOutline,
		Radio,
		VolumeMediumOutline,
		VolumeMuteOutline,
		TimeOutline,
		ArrowForwardCircleOutline
	} from 'svelte-ionicons';
	import { animate } from '$lib/animate.js';

	let isPlaying = $state(false);
	let isMuted = $state(false);
	let volume = $state(1);
	let audio: HTMLAudioElement;
	let currentTime = $state(0);
	let duration = $state(0);
	let isBehindLive: boolean = $state(false);
	let streamTitle: string = $state('');
	let streamDescription: string = $state('');
	let streamListeners: number = $state(0);
	let streamTime = $state('');
	let streamArtwork: string = $state('');

	function calculateTimeDifference(timestamp: string) {
		const currentTime = new Date();
		const fetchedTime = new Date(timestamp);

		const diffInMilliseconds = Math.abs(currentTime - fetchedTime);
		const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

		const hours = Math.floor(diffInSeconds / 3600);
		const minutes = Math.floor((diffInSeconds % 3600) / 60);
		const seconds = diffInSeconds % 60;

		// Pad with leading zeros for consistent formatting
		const paddedHours = String(hours).padStart(2, '0');
		const paddedMinutes = String(minutes).padStart(2, '0');
		const paddedSeconds = String(seconds).padStart(2, '0');

		streamTime = `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
	}

	function formatTime(seconds: number): string {
		const [hours, minutes, secs] = streamTime.split(':').map(Number);
		const totalStreamSeconds = hours * 3600 + minutes * 60 + secs;
		const totalSeconds = totalStreamSeconds + seconds;

		const hrs = Math.floor(totalSeconds / 3600);
		const mins = Math.floor((totalSeconds % 3600) / 60);
		const remainingSecs = Math.floor(totalSeconds % 60);

		return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
	}

	onMount(() => {
		audio = new Audio('https://stream.jasperclarke.com/live.nsv');
		audio.volume = volume;

		const fetchMetadata = async () => {
			const metadata = await fetch('https://stream.jasperclarke.com/status-json.xsl').then((res) =>
				res.json()
			);
			if (metadata.icestats.source) {
				const streamInfo = JSON.parse(metadata.icestats.source.title);
				streamTitle = streamInfo.title;
				streamDescription = streamInfo.desc;
				streamListeners = metadata.icestats.source.listeners;
				streamArtwork = streamInfo.image;
				if (streamTime === '') {
					calculateTimeDifference(metadata.icestats.source.stream_start_iso8601);
				}
			} else {
				streamTime = '0:0:0';
				streamTitle = 'Offline';
				streamDescription = 'The stream is currently offline. Please check back later.';
				streamListeners = 0;
			}
		};

		fetchMetadata();

		const metadataInterval = setInterval(() => {
			if (audio && isPlaying) {
				fetchMetadata();
			}
		}, 5000);

		// Start playing automatically
		audio
			.play()
			.then(() => {
				isPlaying = true;
			})
			.catch((error) => {
				console.error('Auto-play failed:', error);
				isPlaying = false;
			});

		// Update time every second
		const timeInterval = setInterval(() => {
			if (audio && isPlaying) {
				currentTime = audio.currentTime;
				duration = audio.duration || 0;
				isBehindLive = Boolean(audio.duration && audio.duration - audio.currentTime > 5);
			}
		}, 1000);

		return () => {
			clearInterval(timeInterval);
			clearInterval(metadataInterval);
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

	function catchUpToLive() {
		if (audio && audio.duration) {
			audio.currentTime = audio.duration;
		}
	}
</script>

<Header position="absolute" />
<a
	class="group/btn fixed top-16 left-4 flex-row gap-4 flex w-fit z-40"
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
					<!-- Live Indicator Overlay -->
					<div
						class="absolute top-6 left-6 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full"
					>
						<Radio class="w-4 h-4 text-red-500" />
						<span class="text-sm font-medium">LIVE</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column - Info & Controls -->
		<div class="w-full h-1/2 md:w-1/2 md:h-full flex flex-col pl-12 pr-12 pb-12 md:p-12 md:mt-6">
			<!-- Episode Info -->
			<div class="flex-1">
				<div class="space-y-6 max-w-lg">
					<div>
						<h1 class="text-4xl font-light mb-2">{streamTitle || 'Loading Title...'}</h1>
						<p class="text-lg text-gray-400">Live Session</p>
					</div>

					<p class="text-gray-400 leading-relaxed">
						{streamDescription || 'Loading Description...'}
					</p>

					<div class="flex items-center gap-6 text-gray-400">
						<div class="flex items-center gap-2">
							<PeopleOutline class="w-4 h-4" />
							<span>{streamListeners} listening</span>
						</div>
						<div class="flex items-center gap-2">
							<TimeOutline class="w-4 h-4" />
							<span>{formatTime(currentTime)}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Audio Controls -->
			<div class="border-t border-zinc-900 pt-8">
				<div class="max-w-lg">
					<!-- Play/Pause and Volume -->
					<div class="flex items-center gap-8">
						<div class="flex items-center gap-4">
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

							{#if isBehindLive}
								<button
									onclick={catchUpToLive}
									class="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:bg-zinc-900 rounded-full transition-colors"
								>
									<ArrowForwardCircleOutline class="w-4 h-4" />
									<span>Catch up to live</span>
								</button>
							{/if}
						</div>

						<div class="flex items-center gap-4 flex-1">
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
								class="flex-1 h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white max-w-24"
							/>
						</div>
					</div>

					<!-- Social Integration -->
					<!-- <div class="mt-6 text-sm text-gray-500"> -->
					<!-- 	Join the conversation: #BuildingResilientSystems -->
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
