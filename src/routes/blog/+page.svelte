<script>
	import BlogCard from '$lib/components/BlogCard.svelte';
	export let data;
</script>

<section class="mb-16">
	<ul class="flex flex-col items-center">
		<h2 class="text-4xl font-serif">Work In Progress</h2>
		<!-- Add an argument to blog card being a number starting from 1 going up for each card rendered -->
		<!-- {#each data.posts as post, i} -->
		<!-- 	<BlogCard {post} {i} /> -->
		<!-- {/each} -->
	</ul>
</section>
