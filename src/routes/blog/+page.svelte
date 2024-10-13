<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	import BuyMeACoffee from '$lib/components/BuyMeACoffee.svelte';
	import Header from '$lib/components/Header.svelte';
	import { url, title } from '$lib/config';
	export let data;
	// List of all categories
	const categories = data.posts
		.map((post) => post.categories)
		.flat()
		.filter((category, i, arr) => arr.indexOf(category) === i);
	let posts = data.posts;
	let firstPosts = posts.slice(0, 3);
	let search = data.category ? '#' + data.category : '';
	$: {
		if (search !== '') {
			// Filter post titles and descriptions by search query
			if (search.startsWith('#')) {
				const category = search.slice(1);
				posts = data.posts.filter((post) => post.categories.includes(category));
			} else {
				posts = data.posts.filter(
					(post) =>
						post.title.toLowerCase().includes(search.toLowerCase()) ||
						post.description.toLowerCase().includes(search.toLowerCase())
				);
				posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			}
		} else {
			posts = data.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
			firstPosts = posts.slice(0, 3);
		}
	}
</script>

<Header position="static" />
<BuyMeACoffee classes="fixed top-4 right-4" />
<div class="flex flex-col mx-6 lg:flex-row lg:mx-0 justify-center self-center mt-2">
	{#if search !== ''}
		<button
			on:click={() => (search = '')}
			class="text-white bg-zinc-900 border border-zinc-800 px-4 py-2 text-lg rounded-full mr-4 hidden lg:block"
		>
			&times;
		</button>
	{/if}
	<input
		bind:value={search}
		type="text"
		placeholder="Search"
		class="bg-zinc-900 border border-zinc-800 p-2 pl-4 text-md rounded-full focus:outline-none"
	/>
	<div class="flex flex-row gap-2 items-center mt-2 lg:mt-0 lg:ml-4">
		{#if search.startsWith('#')}
			{#each categories
				.filter((category) => category.includes(search.slice(1)) || search === '')
				.slice(0, 3) as category}
				<button
					on:click={() => (search = '#' + category)}
					class="text-white bg-zinc-900 border border-zinc-800 px-4 py-2 text-md rounded-full"
				>
					&num;{category}
				</button>
			{/each}
		{/if}
	</div>
</div>
<main
	class="flex flex-row mx-6 mt-4 {search !== '' ? 'justify-center' : ''}"
	style="height: calc(100vh - 200px);"
>
	{#if search !== ''}
		<section
			class="max-h-screen flex-1 block max-w-xl overflow-y-scroll overflow-x-hidden"
			style="scrollbar-width: none;"
		>
			{#each posts as post, i}
				<BlogCard {post} {i} classes="mt-6 p-6" />
			{/each}
		</section>
	{:else}
		<section class="hidden lg:flex flex-1 flex-wrap gap-6">
			{#each firstPosts as post, i}
				<BlogCard {post} {i} />
			{/each}
		</section>
		<section
			class="max-h-screen {posts.length <= 3
				? 'lg:hidden'
				: ''} flex-1 flex flex-col lg:block lg:flex-[0.3] overflow-y-scroll overflow-x-hidden lg:ml-6"
			style="scrollbar-width: none;"
		>
			{#each posts as post, i}
				<BlogCard {post} {i} height={200} />
			{/each}
		</section>
	{/if}
</main>
