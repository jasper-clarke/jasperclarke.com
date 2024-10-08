<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	export let data;
</script>

<section class="mb-16">
	<ul class="flex flex-col items-center">
		{#each data.posts as post}
			<BlogCard {post} />
		{/each}
	</ul>
</section>
