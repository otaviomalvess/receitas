<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';

	type Receipt = {
		id: string;
		name: string;
		slug: string;
		ingredients: string[];
		preparationMethod: string;
	};

	export let data: Receipt;
</script>

<!-- SLOT -->
<h1>{data.name}</h1>

<img src={heroImage} alt="Recipe." width="100%" />

<h3>Ingredientes:</h3>
<ul>
	{#each data.ingredients as ingredient}
		<li>{ingredient}</li>
	{/each}
</ul>

<h3>Modo de Preparo:</h3>
<p>{data.preparationMethod}</p>
<!-- SLOT -->
