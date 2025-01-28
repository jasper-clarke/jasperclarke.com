<script lang="ts">
	import { onMount } from 'svelte';
	import Instafeed from 'instafeed.js';

	const startDate = new Date('2025-01-29');

	let dayCount = $state<number>(0);

	function calculateDays() {
		const today = new Date();
		const diffTime = Math.abs(today.getTime() - startDate.getTime());
		dayCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
	}

	onMount(() => {
		calculateDays();

		const feed = new Instafeed({
			accessToken:
				'IGAAPwxyGos7NBZAFAwQzRzbFJSM19FTVRRQ0ZABLXFMUEwzZA29uOGxrRnNKb2R0ejB4SFRaQmlCOHlFbHFQeUtmVS1aaHJ4X0pvYzVyUVl3OVNSSVZAQMkZAudTZAGcWJGUERJN21xeFJCSkFURkVjbGlSYmRB',
			limit: 1,
			template:
				'<div class="cols"><a href="{{link}}"><img style="max-width: 200px;" title="{{caption}}" src="{{image}}" /></a></div>'
		});
		feed.run();

		// Update the counter every day at midnight
		const timer = setInterval(calculateDays, 24 * 60 * 60 * 1000);

		return () => {
			clearInterval(timer);
		};
	});
</script>

<div class="h-screen flex flex-col items-center justify-center">
	<p class="text-xl">Days since {startDate.toLocaleDateString()}</p>
	<div class="text-4xl font-bold p-4">{dayCount}</div>
	<p>If you can see the image below, its still working.</p>
	<div id="instafeed"></div>
</div>
