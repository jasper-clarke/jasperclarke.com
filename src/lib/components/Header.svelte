<script>
	import { animate } from '../../animate.js';
</script>

<header
	class="bg-gray-800 text-white p-4"
	use:animate={{ type: 'from', duration: 1, y: -200, z: 0, ease: 'power2.out', opacity: 0.5 }}
>
	<div class="container mx-auto flex justify-between items-center">
		<a href="/" class="text-white">
			<h1 class="text-2xl font-bold">SvelteKit Blog</h1>
		</a>
		<nav>
			<ul class="flex space-x-4">
				<li>
					<a href="/" class="text-white hover:underline">Home</a>
				</li>
				<li>
					<a href="/about" class="text-white hover:underline">About</a>
				</li>
			</ul>
		</nav>
	</div>
</header>
