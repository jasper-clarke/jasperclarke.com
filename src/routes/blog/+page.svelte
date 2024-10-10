<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Header from '$lib/components/Header.svelte';
	export let data;
	// Sort posts by date
	let posts = data.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	// Create an object called first posts and set it to the first 3 posts
	let firstPosts = posts.slice(0, 3);
</script>

<Header />
<main class="flex flex-1 mt-24 flex-row mx-6" style="height: calc(100vh - 150px);">
	<section class="hidden lg:flex flex-1 flex-wrap gap-6">
		{#each firstPosts as post, i}
			<BlogCard {post} {i} />
		{/each}
	</section>
	<section
		class="max-h-screen {posts.length <= 3
			? 'lg:hidden'
			: ''} flex-1 flex flex-col lg:block lg:flex-[0.3] overflow-y-scroll overflow-x-hidden ml-6"
	>
		{#each posts as post, i}
			<BlogCard {post} {i} height={300} />
		{/each}
	</section>
</main>
