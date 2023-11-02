<script lang="ts">
	import cardImage from '$lib/img/card_image.png';
	import { expoInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	type Data = {
		id: number;
		name: string;
		ingredients: string[];
		method: string;
		pictures: string[];
		slug: string;
	};

	export let data: Data;
</script>

<a href="/recipe/{data.slug}" class="card" transition:fade={{ duration: 1000, easing: expoInOut }}>
	<img src={cardImage} alt={data.name} />
	<span class="recipe-name">
		{data.name}
	</span>
</a>

<style>
	.card {
		background-color: lightgray;
		margin: 0 auto;
		min-height: 100px;
		min-width: 150px;
		border-radius: 10px;
	}
	.card img {
		width: 100%;
		border-radius: 10px 10px 0px 0px;
	}

	.recipe-name {
		display: block;
		text-align: center;
		padding: 0.5rem 0;
	}
</style>
