<script lang="ts">
	import type { Recipe } from '$lib/Recipe.js';
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	let isSaving: boolean = false;
	let recipe: Recipe = {
		ingredients: [],
		method: '',
		name: '',
		pictures: ['', '', '', '', ''],
		tags: []
	};

	export let data;

	const saveRecipe = async () => {
		isSaving = true;
		// console.log('Save request sent!');

		await fetch('/api/recipe-crud', {
			method: 'POST',
			body: JSON.stringify(recipe),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((response: Response) => {
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}
				alert('Recipe was saved succesfully!');
				// console.log(response.statusText);
			})
			.catch((error) => {
				alert(`ERROR: ${error}.`);
			})
			.finally(() => {
				isSaving = false;
				// console.log('Promise resolved.');
			});
	};
</script>

<RecipeForm lockForm={isSaving} {recipe} tags={data.tags} {saveRecipe} />

<style>
</style>
