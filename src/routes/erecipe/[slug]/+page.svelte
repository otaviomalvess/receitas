<script lang="ts">
	import RecipeForm from '$lib/components/RecipeForm.svelte';

	let isSaving: boolean = false;

	const deleteRecipe = async () => {
		isSaving = true;

		console.log('Delete request sent!');

		await fetch('/api/recipe-crud', {
			method: 'DELETE',
			body: JSON.stringify(data.recipe?.id),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((response: Response) => {
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}

				console.log(response.statusText);
				alert('Recipe was deleted succesfully!');
			})
			.catch((error) => {
				console.log(error);
				alert('ERROR: something went wrong.');
			})
			.finally(() => {
				isSaving = false;
				console.log('Promise resolved.');
			});
	};

	const saveRecipe = async (recipe: any) => {
		isSaving = true;
		console.log('Save request sent!');

		await fetch('/api/recipe-crud', {
			method: 'PUT',
			body: JSON.stringify(recipe),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((response: Response) => {
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}

				console.log(response.statusText);
				alert('Recipe was saved succesfully!');
			})
			.catch((error) => {
				console.log(error);
				alert('ERROR: something went wrong.');
			})
			.finally(() => {
				isSaving = false;
				console.log('Promise resolved.');
			});
	};

	export let data;
</script>

<button class="delete-recipe" disabled={isSaving} type="button" on:click={deleteRecipe}>
	Delete
</button>

<!-- @TODO: page is working, but need to look more into this error. -->
<RecipeForm lockForm={isSaving} recipe={data.recipe} tags={data.tags} {saveRecipe} />

<style>
	.delete-recipe {
		font-size: large;
	}
</style>
