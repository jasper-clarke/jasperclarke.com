<script>
	import { animate } from '../../animate.js';
	import { formatDate } from '$lib/utils';
	import { title, description, url } from '$lib/config';
	export let post;
	export let i;
	let cardHover = false;
</script>

<svelte:head>
	<title>{title}</title>

	<meta name="description" content={description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content="/blog-banner.webp" />

	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/blog-banner.webp" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

{#key post.slug}
	<a
		class="{cardHover
			? 'card'
			: ''} overflow-hidden w-full max-w-4xl flex flex-row mt-4 mx-4 bg-zinc-900/75 rounded-2xl"
		on:mouseenter={() => (cardHover = true)}
		href={`/blog/${post.slug}`}
		use:animate={{
			type: 'from',
			duration: 1.4,
			x: i % 2 == 0 ? 500 : -500,
			opacity: 0.3,
			ease: 'expo.inOut'
		}}
	>
		<article class="flex flex-col flex-1">
			<div class="p-4 space-y-4">
				<h3 class="text-2xl font-bold" data-toc-ignore>{post.title}</h3>
				<article>
					<p>
						{post.description}
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>By Jasper Clarke</h6>
					<small>On {formatDate(post.date)}</small>
				</div>
			</footer>
		</article>
	</a>
{/key}

<style>
	.card {
		transition: transform 0.3s ease-in-out;
	}
	.card:hover {
		transform: scale(1.02) rotate3d(1, 1, 1, 5deg) translate3d(0, -5px, 0) !important;
	}
</style>
