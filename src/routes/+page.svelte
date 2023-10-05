<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';
	import Card from './Card.svelte';

	let cards: Array<any> = [];
	let queryResults = 5;

	$: {
		// @TODO: re-use old cards. Remove or add more if array length changed.
		cards = [];
		for (let i = 0; i < queryResults; i++) {
			cards[i] = { id: "1a2s3d", name: "Sushi", slug: "special-sushi" };
		}
	}
</script>


<div class="hero-image" style="background-image: url({heroImage})">
	<form>
		<input class="query-search" type="text" placeholder="Procurar..." name="query" spellcheck={false} />
	</form>
</div>

<!-- <ul>
	{#each { length: queryOptions } as _, i}
		<li>Item {i + 1}</li>
	{/each}
</ul> -->

<div class="grid-container">
	{#each cards as data}
		<Card {data}/>
	{/each}
</div>


<style>
	.hero-image {
		width: 100%;
		min-height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.query-search {
		border-radius: 50px;
		width: 250px;
		height: 40px;
		font-size: medium;
		padding: 0 10px;
	}

	.grid-container {
		padding: 25px 25px 0px 25px;
		display: grid;
		grid-template-columns: auto auto;
		gap: 15px;
	}
</style>

