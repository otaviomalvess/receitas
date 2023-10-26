<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';
	import cardImage from '$lib/img/card_image.png';

	type Recipe = {
		id: string;
		name: string;
		slug: string;
		images: string[];
		ingredients: string[];
		preparationMethod: string;
	};
	
	export let data: Recipe;
	data.images = [heroImage, cardImage, heroImage];

	let selectedImage = heroImage;
	$: currentImage = selectedImage;
</script>


<h1>{data.name}</h1>

<div class="recipe-images">
	<div class="current-image-container">
		<img src={currentImage} alt="Recipe." class="current-image"/>
	</div>
	<div class="images-list-container">
		<div class="images-list">
			{#each data.images as image}
				<button on:click={() => { selectedImage = image; }} class="radio-button">
					<img src={image} alt="Recipe." class="recipe-image"/>
				</button>
			{/each}
		</div>
	</div>
</div>

<h2>Ingredientes:</h2>
<ul>
	{#each data.ingredients as ingredient}
		<li>{ingredient}</li>
	{/each}
</ul>

<h2>Modo de Preparo:</h2>
<p>{data.preparationMethod}</p>


<style>
	.recipe-images {
		width: 100%;
	}

	.current-image-container {
		min-width: 312px;
		min-height: 163px;
		display: flex;
		justify-content: center;
	}

	.current-image {
		width: 80%;
		margin: 0 auto;
	}

	.images-list-container {
		display: flex;
		justify-content: center;
	}

	.images-list {
		display: inline;
		margin: 10px auto 5px;
	}

	.radio-button {
		max-width: 75px;
		margin: auto 5px;
		padding: 2px;
	}

	.radio-button:focus .recipe-image {
		opacity: 1.0;
	}

	.recipe-image {
		max-width: 60px;
		margin: 0 auto;
		opacity: .5;
	}
</style>