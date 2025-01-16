<script lang="ts">
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import {
		ArrowForward,
		CalendarClearOutline,
		MicOutline,
		PlayCircleOutline,
		Radio,
		TimeOutline
	} from 'svelte-ionicons';

	let isLive: boolean = $state(false);
	let streamName: string = $state('');
	let checkInterval = $state();

	async function updateStatus() {
		try {
			const response = await fetch('/api/checkLive');
			const data = await response.json();
			isLive = data.isLive;
			streamName = data.streamTitle;
		} catch (error) {
			console.error('Error fetching stream status:', error);
			isLive = false;
		}
	}

	onMount(() => {
		updateStatus();
		// Check every 30 seconds
		checkInterval = setInterval(updateStatus, 30000);

		return () => {
			clearInterval(checkInterval);
		};
	});

	let activeTab = $state('live');

	function setActiveTab(tab: string) {
		activeTab = tab;
	}
</script>

<div class="min-h-screen bg-black text-white">
	{#if isLive}
		<div
			class="fixed top-0 left-0 w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-2 z-50"
			style=""
		>
			<div class="max-w-3xl mx-auto px-6 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="flex items-center gap-2">
						<div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
						<span class="font-medium">LIVE NOW</span>
					</div>
					<span class="text-sm opacity-90">{streamName}</span>
				</div>
				<a
					href="/podcasts/live"
					class="px-4 py-1 bg-white text-red-600 text-sm font-medium rounded-full hover:bg-opacity-90 transition-colors"
				>
					Join Stream
				</a>
			</div>
		</div>
		<Header position="mt-12" />
		<BuyMeACoffee classes="absolute top-16 right-4" />
	{:else}
		<Header position="absolute" />
		<BuyMeACoffee classes="absolute top-4 right-4" />
	{/if}
	<!-- Hero Section -->
	<div class="min-h-[50vh] flex items-center relative overflow-hidden">
		<div class="max-w-3xl mx-auto px-6 py-24 relative">
			<div class="flex items-center gap-4 mb-8">
				<MicOutline class="w-12 h-12 opacity-75" />
				<h1 class="text-4xl font-light">The Archi-techs Podcast</h1>
			</div>
			<p class="text-xl text-gray-400 mb-12 leading-relaxed">
				Exploring the intersections of technology, personal growth, and creative problem-solving.
				Join me (Jasper Clarke) for in-depth conversations and insights.
			</p>
		</div>
	</div>

	<!-- Navigation -->
	<div class="border-b border-zinc-800">
		<div class="max-w-3xl mx-auto px-6">
			<div class="flex space-x-8">
				<button
					onclick={() => setActiveTab('live')}
					class="py-4 relative {activeTab === 'live' ? 'text-white' : 'text-gray-500'}"
				>
					<div class="flex items-center gap-2">
						<Radio class="w-4 h-4" />
						<span>Live Sessions</span>
					</div>
					{#if activeTab === 'live'}
						<div class="absolute bottom-0 left-0 w-full h-px bg-white"></div>
					{/if}
				</button>
				<button
					onclick={() => setActiveTab('recorded')}
					class="py-4 relative {activeTab === 'recorded' ? 'text-white' : 'text-gray-500'}"
				>
					<div class="flex items-center gap-2">
						<PlayCircleOutline class="w-4 h-4" />
						<span>Recorded Episodes</span>
					</div>
					{#if activeTab === 'recorded'}
						<div class="absolute bottom-0 left-0 w-full h-px bg-white"></div>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Content Section -->
	<div class="max-w-3xl mx-auto px-6 py-24">
		{#if activeTab === 'recorded'}
			<div class="space-y-12">
				<!-- Episode -->
				<!-- <div class="group"> -->
				<!-- 	<div class="flex justify-between items-start mb-4"> -->
				<!-- 		<div> -->
				<!-- 			<h2 class="text-2xl font-light mb-2">Building Resilient Systems</h2> -->
				<!-- 			<div class="flex items-center gap-4 text-gray-500 text-sm"> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<CalendarClearOutline class="w-4 h-4" /> -->
				<!-- 					Jan 15, 2024 -->
				<!-- 				</span> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<TimeOutline class="w-4 h-4" /> -->
				<!-- 					45 minutes -->
				<!-- 				</span> -->
				<!-- 			</div> -->
				<!-- 		</div> -->
				<!-- 		<button class="p-2 hover:bg-zinc-900 rounded-full transition-colors"> -->
				<!-- 			<PlayCircleOutline class="w-6 h-6" /> -->
				<!-- 		</button> -->
				<!-- 	</div> -->
				<!-- 	<p class="text-gray-400 mb-4"> -->
				<!-- 		Exploring the principles behind building systems that can withstand the test of time and -->
				<!-- 		scale. We discuss patterns, practices, and real-world examples. -->
				<!-- 	</p> -->
				<!-- 	<div class="flex gap-3"> -->
				<!-- 		<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"> -->
				<!-- 			System Design -->
				<!-- 		</span> -->
				<!-- 		<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"> -->
				<!-- 			Architecture -->
				<!-- 		</span> -->
				<!-- 	</div> -->
				<!-- </div> -->
				<!---->
				<!-- <div class="group"> -->
				<!-- 	<div class="flex justify-between items-start mb-4"> -->
				<!-- 		<div> -->
				<!-- 			<h2 class="text-2xl font-light mb-2">The Human Side of Code</h2> -->
				<!-- 			<div class="flex items-center gap-4 text-gray-500 text-sm"> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<CalendarClearOutline class="w-4 h-4" /> -->
				<!-- 					Jan 1, 2024 -->
				<!-- 				</span> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<TimeOutline class="w-4 h-4" /> -->
				<!-- 					38 minutes -->
				<!-- 				</span> -->
				<!-- 			</div> -->
				<!-- 		</div> -->
				<!-- 		<button class="p-2 hover:bg-zinc-900 rounded-full transition-colors"> -->
				<!-- 			<PlayCircleOutline class="w-6 h-6" /> -->
				<!-- 		</button> -->
				<!-- 	</div> -->
				<!-- 	<p class="text-gray-400 mb-4"> -->
				<!-- 		A deep dive into the personal growth aspects of being a developer. How neurodiversity -->
				<!-- 		shapes our approach to problem-solving. -->
				<!-- 	</p> -->
				<!-- 	<div class="flex gap-3"> -->
				<!-- 		<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"> -->
				<!-- 			Personal Growth -->
				<!-- 		</span> -->
				<!-- 		<span class="text-sm px-3 py-1 border border-gray-700 rounded-full text-gray-400"> -->
				<!-- 			Neurodiversity -->
				<!-- 		</span> -->
				<!-- 	</div> -->
				<!-- </div> -->
			</div>
		{:else}
			<div class="space-y-12">
				<!-- Upcoming Live Session -->
				<div class="border border-zinc-800 rounded-lg p-6 relative overflow-hidden">
					<div class="absolute top-0 right-0 bg-blue-500 px-3 py-1 text-sm">Next Live</div>
					<h2 class="text-2xl font-light mb-4">Archi-techs</h2>
					<div class="flex items-center gap-4 text-gray-500 text-sm mb-4">
						<span class="flex items-center gap-1">
							<CalendarClearOutline class="w-4 h-4" />
							Sunday, Every Week
						</span>
						<span class="flex items-center gap-1">
							<TimeOutline class="w-4 h-4" />
							10:00 AM AEDT
						</span>
					</div>
					<p class="text-gray-400 mb-6">
						Join me each week to discuss the latest trends in technology, personal growth, and
						creative problem-solving. We'll explore topics like open source contributions, building
						resilient systems, and the human side of code.
					</p>
					<!-- <button -->
					<!-- 	class="flex items-center gap-2 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors" -->
					<!-- > -->
					<!-- 	<span>Set Reminder</span> -->
					<!-- 	<ArrowForward class="w-4 h-4" /> -->
					<!-- </button> -->
				</div>
				<!---->
				<!-- <div class="group"> -->
				<!-- 	<div class="flex justify-between items-start mb-4"> -->
				<!-- 		<div> -->
				<!-- 			<h2 class="text-2xl font-light mb-2">Building a Go Microservice</h2> -->
				<!-- 			<div class="flex items-center gap-4 text-gray-500 text-sm"> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<CalendarClearOutline class="w-4 h-4" /> -->
				<!-- 					Dec 15, 2023 -->
				<!-- 				</span> -->
				<!-- 				<span class="flex items-center gap-1"> -->
				<!-- 					<TimeOutline class="w-4 h-4" /> -->
				<!-- 					1.5 hours -->
				<!-- 				</span> -->
				<!-- 			</div> -->
				<!-- 		</div> -->
				<!-- 		<button class="p-2 hover:bg-zinc-900 rounded-full transition-colors"> -->
				<!-- 			<PlayCircleOutline class="w-6 h-6" /> -->
				<!-- 		</button> -->
				<!-- 	</div> -->
				<!-- 	<p class="text-gray-400"> -->
				<!-- 		Recording of our live session building a microservice in Go from scratch. Watch the -->
				<!-- 		development process and decision-making in real-time. -->
				<!-- 	</p> -->
				<!-- </div> -->
			</div>
		{/if}
	</div>
</div>
