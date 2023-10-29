<script lang="ts">
	import Tag from './Tag.svelte';

	type Data = {
		tags: Array<string>;
		color: string;
	};

	export let data: Data;
</script>

<div class="tag-container">
	{#each data.tags as tag}
		<Tag data={{ tag, color: data.color }} />
	{/each}
</div>

<style>
	.tag-container {
		display: flex;
		gap: 0.5rem;
	}
</style>
