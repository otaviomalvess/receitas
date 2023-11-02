<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';
	import Card from './Card.svelte';
	import Container from './Container.svelte';
	import TagContainer from './TagContainer.svelte';

	export let data;

	let searchTerm = '';
	let filteredRecipes: typeof data.feed = [];

	const searchRecipes = () => {
		return (filteredRecipes = data.feed.filter((f) => {
			return f.name.toLowerCase().includes(searchTerm.toLowerCase());
		}));
	};
</script>

<div class="hero-image" style="background-image: url({heroImage})">
	<form>
		<input
			class="query-search"
			type="text"
			placeholder="Procurar..."
			name="query"
			spellcheck={false}
			bind:value={searchTerm}
			on:input={searchRecipes}
		/>
	</form>
</div>

<Container>
	<section class="search-container">
		<div class="search-input-container">
			<input type="text" class="tag-search" placeholder="Procurar tag..." />
		</div>

		<div class="tag-container">
			<span>Com:</span>
			<TagContainer data={{ tags: ['Atum', 'Peixe'], color: '#c0d733' }} />
		</div>

		<div class="tag-container">
			<span>Sem:</span>
			<TagContainer data={{ tags: ['Azeitona'], color: '#C87575E0' }} />
		</div>
	</section>

	{#if searchTerm && filteredRecipes.length === 0}
		<div>Sem receitas com esse titulo</div>
	{:else if filteredRecipes.length > 0}
		<div class="grid-container">
			{#each filteredRecipes as card}
				<Card data={card} />
			{/each}
		</div>
	{:else}
		<div class="grid-container">
			{#each data.feed as card}
				<Card data={card} />
			{/each}
		</div>
	{/if}
</Container>

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

	.grid-container {
		padding: 15px 0px 0px 0px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 15px;
	}

	.search-container {
		background-color: #ededed;
		border: 1px solid #bbbbbb;
		border-radius: 5px;
		padding: 1rem;
	}

	.tag-search {
		font-size: 1.25rem;
		height: 50px;
	}

	.search-input-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.tag-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}
</style>
