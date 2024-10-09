<script lang="ts">
	import { gsap } from 'gsap';
	import { animate } from '../../../animate';
	import { isMobile, formatDate } from '$lib/utils';
	import { url, title } from '$lib/config';
	import { onMount } from 'svelte';
	export let data;

	onMount(() => {
		// For each child element of the article animate it with gsap staggered
		const article = document.querySelector('article');
		if (isMobile()) {
			return;
		}
		// @ts-ignore
		article.querySelectorAll('*').forEach((el, i) => {
			if (el.classList.contains('chip')) {
				return;
			}
			gsap.from(el, {
				duration: 1,
				y: -100,
				opacity: 0,
				ease: 'power4.out',
				delay: i * 0.05
			});
		});
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}${data.url}`} />
	<meta name="description" content={data.meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}${data.url}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />

	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a
	class="group/btn relative xl:absolute right-4 left-4 flex-row gap-4 flex"
	href="/blog"
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
			Blog
		</h2>
	</div>
</a>
<article
	class="prose prose-invert md:prose-lg lg:prose-2xl prose-h1:mb-2 prose-h2:mt-10 mb-16 mx-4 md:mx-auto mt-8"
>
	<!-- Title -->
	<hgroup class="flex flex-col">
		<h1>{data.meta.title}</h1>
		<p class="text-sm">
			Published at {formatDate(data.meta.date)}
		</p>
	</hgroup>

	<!-- Tags -->
	<div class="flex flex-wrap gap-4 mb-6">
		{#each data.meta.categories as category}
			<a
				href={`/blog/categories/${category}`}
				class="chip variant-filled-secondary no-underline hover:scale-105 transition"
				>&num;{category}</a
			>
		{/each}
	</div>
	<!-- Post -->
	<svelte:component this={data.content} />
</article>
