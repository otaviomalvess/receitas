<script lang="ts">
	import cardImage from '$lib/img/card_image.png';

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

<a href="/recipe/{data.slug}" class="card">
	<img src={cardImage} alt={data.name} />
	<div class="recipe-name">
		{data.name}
	</div>
</a>

<style>
	.card {
		background-color: lightgray;
		margin: 0 auto;
		min-height: 100px;
		min-width: 150px;
	}

	.recipe-name {
		padding-left: 5px;
		padding-right: 5px;
	}
</style>

