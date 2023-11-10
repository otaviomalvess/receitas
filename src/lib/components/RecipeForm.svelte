<script lang="ts">
	import type { Recipe } from '$lib/Recipe';

	let fileInput: HTMLInputElement;
	let selectedImage: number = 0;
	$: currentImage = recipe.pictures[selectedImage];
	let tagSearchValue: string;

	export let lockForm: boolean = false;
	export let recipe: Recipe;
	export let tags: string[] = [];
	export let saveRecipe: (recipe: Recipe) => void;

	const addTag = ({ key }: KeyboardEvent) => {
		if (key !== 'Enter') {
			return;
		}

		if (tags.find((value: string) => value === tagSearchValue)) {
			recipe.tags.push(tagSearchValue);
			recipe.tags = recipe.tags.toSorted();
			console.log('Tag added: ' + tagSearchValue);
			tagSearchValue = '';
		}
	};

	const onFileSelected = ({ target }: any) => {
		target = target as HTMLInputElement;
		if (!target) {
			alert('Target is not of type HTMLInputElement.');
			return;
		}

		if (target.files.length > 1) {
			alert("ERROR: doesn't have support for choosing multiple files yet.");
			return;
		}

		const file = target.files[0] as Blob;

		// For some reason, this function gets called if the user uploaded an image once and then
		// aborts the operation the following time.
		if (!file) {
			console.log('Image selection aborted.');
			return;
		}

		if (!file.type.includes('image/')) {
			alert('ERROR: unsupported image was chosen.');
			return;
		}

		const reader = new FileReader();
		reader.onerror = () => {
			alert('Invalid image.');
		};
		reader.onload = ({ target }) => {
			recipe.pictures[selectedImage] = target?.result as string;
			selectedImage = selectedImage;

			console.log('Image uploaded in button: ' + selectedImage);
		};

		reader.readAsDataURL(file);
	};

	const removeCurrentSelectedImage = () => {
		recipe.pictures[selectedImage] = '';
		currentImage = '';

		console.log('Image removed from button: ' + selectedImage);
	};

	const removeTag = (selectedTag: number) => {
		if (selectedTag < 0 && selectedTag > recipe.tags.length) {
			alert('ERROR: given inde is outside of array bounderies.');
			return;
		}

		console.log('Tag removed: ' + recipe.tags[selectedTag]);

		recipe.tags = recipe.tags.toSpliced(selectedTag, 1);
	};
</script>

<form class="page-content">
	<input
		bind:value={recipe.name}
		class="recipe-name"
		disabled={lockForm}
		maxlength="64"
		placeholder="Título da Receita..."
		spellcheck={false}
		type="text"
	/>

	<section>
		<input
			bind:this={fileInput}
			accept=".jpg, .jpeg, .png"
			disabled={lockForm}
			style="display: none;"
			type="file"
			on:change={(e) => onFileSelected(e)}
		/>

		<div class="recipe-images-container">
			<div class="current-image-container">
				{#if currentImage}
					<img alt="Recipe." class="current-image" src={currentImage} />
				{:else}
					<div class="current-image-empty" />
				{/if}
			</div>

			<div class="current-image-buttons-container">
				{#if recipe.pictures[selectedImage]}
					<button
						class="current-image-button"
						disabled={lockForm}
						type="button"
						on:click={removeCurrentSelectedImage}>Remover Imagem</button
					>
					<button
						class="current-image-button"
						disabled={lockForm}
						type="button"
						on:click={() => fileInput.click()}>Trocar Imagem</button
					>
				{/if}
			</div>

			<div class="images-list-container">
				<div class="images-list">
					{#each { length: 5 } as _, i}
						{#if recipe.pictures[i]}
							<button class="radio-button" disabled={lockForm} on:click={() => (selectedImage = i)}>
								<img alt="Recipe." class="recipe-image" src={recipe.pictures[i]} />
							</button>
						{:else}
							<button
								class="recipe-image"
								disabled={lockForm}
								type="button"
								on:click={() => {
									selectedImage = i;
									fileInput.click();
								}}
							>
								Add
							</button>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section>
		<h2>Ingredientes</h2>
		<textarea
			bind:value={recipe.ingredients[0]}
			class="recipe-ingredients"
			disabled={lockForm}
			maxlength="1024"
			placeholder="Ingredientes..."
			spellcheck={false}
		/>
	</section>

	<section>
		<h2>Modo de Preparo</h2>
		<textarea
			bind:value={recipe.method}
			class="recipe-method"
			disabled={lockForm}
			maxlength="1024"
			placeholder="Modo de Preparo..."
			spellcheck={false}
		/>
	</section>

	<section>
		<h2>Tags</h2>

		<div class="tag-search-container">
			<input
				bind:value={tagSearchValue}
				class="tag-search"
				disabled={lockForm}
				maxlength="32"
				placeholder="Procurar Tag..."
				spellcheck={false}
				type="text"
				on:keydown={addTag}
			/>
		</div>

		<div class="recipe-tags-container">
			{#each recipe.tags as tag, i}
				<button
					class="recipe-tag"
					disabled={lockForm}
					type="button"
					on:click={() => {
						removeTag(i);
					}}
				>
					{tag}
				</button>
			{/each}
		</div>

		<div class="save-recipe-container">
			<button
				class="save-recipe"
				disabled={lockForm}
				type="button"
				on:click={() => saveRecipe(recipe)}
			>
				Salvar Receita
			</button>
		</div>
	</section>
</form>

<style>
	textarea {
		width: 100%;
	}

	.page-content {
		margin: auto 5px;
	}

	.recipe-name {
		/* Styling from h1 block. */
		display: block;
		margin-block-start: 0.67em;
		margin-block-end: 0.67em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;

		font-family: inherit;
		font-size: 2em;
		font-weight: bold;
		border: none;
	}

	.recipe-images-container {
		width: 100%;
	}

	.current-image-container {
		height: 163px;
		display: flex;
		justify-content: center;
	}

	.current-image {
		width: 80%;
		margin: 0 auto;
	}

	.current-image-empty {
		width: 80%;
		margin: 0 auto;

		border-style: solid;
		border-color: black;
		border-width: 1px;
	}

	.images-list-container {
		display: flex;
		justify-content: center;
	}

	.images-list {
		display: inline;
		margin: 10px auto 5px;
	}

	.current-image-buttons-container {
		display: flex;
		justify-content: center;
		gap: 15px;
	}

	.current-image-button {
		width: 35%;
		height: 40px;
	}

	.radio-button {
		max-width: 65px;
		margin: auto 5px;
		padding: 2px;
	}

	.radio-button:focus .recipe-image {
		opacity: 1;
	}

	.recipe-image {
		height: 40px;
		width: 60px;
		margin: 0 auto;
		opacity: 0.5;
	}

	.recipe-ingredients {
		height: 100px;
	}

	.recipe-method {
		height: 200px;
	}

	.tag-search-container {
		display: flex;
		justify-content: center;
	}

	.tag-search {
		width: 250px;
		height: 40px;
		border-radius: 50px;
		padding: 0 10px;
		font-size: medium;
	}

	.recipe-tags-container {
		margin: 25px 10px;
	}

	.recipe-tag {
		color: white;
		font-size: medium;

		background-color: green;
		border-color: transparent;
		border-radius: 4px;

		margin: 0 5px 5px 0;
	}

	/* .recipe-tag button {
		
	} */

	.save-recipe-container {
		margin-bottom: 10px;

		display: flex;
		justify-content: center;
	}

	.save-recipe {
		width: 80%;
		height: 50px;

		color: white;
		background-color: orange;
		border-radius: 50px;
		border-color: transparent;

		font-size: large;
		font-weight: bold;
	}

	.save-recipe:active {
		background-color: white;
	}
</style>
