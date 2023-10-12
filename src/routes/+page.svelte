<script lang="ts">
	import heroImage from '$lib/img/home-hero.jpg';
	import type { PageData } from './$types';

	$: queryResults = 10;
	$: queryOptions = 3;

	export let data: PageData;
</script>

<!-- SLOT -->

<div class="hero-image" style="background-image: url({heroImage})">
	<h1>Site de Receitas</h1>
	<form>
		<input type="text" name="query" spellcheck={false} />
	</form>
</div>

<ul>
	{#each { length: queryOptions } as _, i}
		<li>Item {i + 1}</li>
	{/each}
</ul>

<div class="grid-container">
	{#each { length: queryResults } as _, i}
		<div class="grid-item">
			<img src="" alt="Foto do item {i + 1}." />
			<p>Receita {i + 1}</p>
			<p />
		</div>
	{/each}
</div>

<!-- SLOT -->

<style>
	.grid-container {
		display: grid;
		grid-template-columns: auto auto;
	}
</style>
