<script lang="ts">
	import type { Recipe } from '$lib/Recipe.js';
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	let isSaving: boolean = false;

	const saveRecipe = async (recipe: Recipe) => {
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

	export let data;
</script>

<RecipeForm
	lockForm={isSaving}
	recipe={{ ingredients: [], method: '', name: '', pictures: ['', '', '', '', ''], tags: [] }}
	tags={data.tags}
	{saveRecipe}
/>

<style>
</style>
