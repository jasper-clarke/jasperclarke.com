<script>
	import { animate } from '$lib/animate.js';
	import { formatDate } from '$lib/utils';
	import { title, description, url } from '$lib/config';
	export let post;
	export let i;
	export let classes = '';
	export let height = 0;
	let isHovered = false;
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
		class="w-full {(i === 0 || i === 1 || i === 2) && height !== 0 ? 'lg:hidden' : ''} {height !== 0
			? 'lg:h-[' + height + 'px] p-6 mb-6'
			: i === 0
				? ''
				: 'flex-1'} flex flex-col rounded-2xl items-center justify-center {isHovered
			? 'transition duration-300 ease-in-out'
			: ''} {classes} relative bg-gray-500/5"
		style="contain: layout paint;"
		href={`/blog/${post.slug}`}
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
		use:animate={{
			type: 'from',
			duration: 1,
			scale: 0.9,
			opacity: 0.5,
			ease: 'expo.inOut'
		}}
	>
		<div
			class="absolute top-0 left-0 w-full h-full transition duration-500 ease-in-out rounded-2xl"
			style="background-image: url({post.image}); background-size: cover; opacity: 0.1; background-position: center; z-index: 0; {isHovered
				? 'transform: scale(1.08); opacity: 0.4;'
				: ''}"
		></div>
		<h3 class="text-3xl font-bold relative z-10 text-center max-w-[80%]" data-toc-ignore>
			{post.title}
		</h3>
		<p class="relative z-10 text-lg text-center max-w-[60%]">
			{post.description}
		</p>
		<small>On {formatDate(post.date)}</small>
	</a>
{/key}
