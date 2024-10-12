<script>
	import { animate } from '$lib/animate.js';
	export let position;
</script>

<header
	class="text-white p-4 w-full {position} top-0 z-50 bg-black/50"
	use:animate={{ type: 'from', duration: 1, y: -200, z: 0, ease: 'expo.inOut' }}
>
	<div class="flex justify-between items-center">
		<a href="/" class="text-white">
			<h1 class="text-4xl font-serif">Jasper Clarke</h1>
		</a>
	</div>
</header>
