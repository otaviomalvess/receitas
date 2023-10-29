<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';
	import Card from './Card.svelte';

	let cards: Array<any> = [];
	let queryResults = 5;

	$: {
		// @TODO: re-use old cards. Remove or add more if array length changed.
		cards = [];
		for (let i = 0; i < queryResults; i++) {
			cards[i] = { id: '1a2s3d', name: 'Sushi', slug: 'special-sushi' };
		}
	}

	export let data;
</script>

<div class="hero-image" style="background-image: url({heroImage})">
	<form>
		<input
			class="query-search"
			type="text"
			placeholder="Procurar..."
			name="query"
			spellcheck={false}
		/>
	</form>
</div>

<div>
	<input type="text" placeholder="Procurar tag..." />

	<div>
		<span>Com:</span>

		<div>
			<div>Atum</div>
			<div>Peixe</div>
		</div>
	</div>

	<span>Sem:</span>
	<div>
		<div>Azeitona</div>
	</div>
</div>

<div class="grid-container">
	{#each data.feed as card}
		<Card data={card} />
	{/each}
</div>

<style>
	.hero-image {
		width: 100%;
		height: 60vw;
		display: flex;
		justify-content: center;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0px 4px 4px 0px #00000040, inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
	}

	.query-search {
		border-radius: 50px;
		height: 40px;
		font-size: medium;
		padding: 0 10px;
		border: none;
		margin-top: 2rem;
	}

	.query-search:focus {
		outline: none;
	}

	.grid-container {
		padding: 15px 0px 0px 0px;
		display: grid;
		grid-template-columns: auto auto;
		gap: 15px;
	}
</style>
