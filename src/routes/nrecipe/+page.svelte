<script lang="ts">
	type Recipe = {
		name: string;
		images: string[];
		ingredients: string[];
		method: string;
		tags: string[];
	};
	
	let recipe: Recipe = {
		name: "",
		images: ["","","","",""],
		ingredients: [],
		method: "",
		tags: []
	}

	let isSaving: boolean;
	let fileInput: HTMLInputElement;
	let selectedImage: number = 0;
	$: currentImage = recipe.images[selectedImage];
	let tagSearchValue: string;

	export let data;
	
	//
	function onFileSelected(target: any) {
		target = target as HTMLInputElement;
		if (!target) {
			console.log("Canceled action.");
			return;
		}

		if (target.files.length > 1) {
			alert("ERROR: doesn't have support for choosing multiple files yet.");
			return;
		}

		/*
		@BUG: the 'onFileSelected' function is being called even if the action was canceled.
		 			Even more, it only happens once per image added.
		@REPLICATION: add an image to the list. With the current one selected,
						click the button to add a new one and cancel the operation.
		*/
		if (!target.files[0]) {
			alert("ERROR: some error happened.");
			return;
		}

		if (!target.files[0].type.includes('image/')) {
			alert("ERROR: unsupported image was chosen.");
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(target.files[0]);
		reader.onload = (ev) => {
			recipe.images[selectedImage] = ev.target?.result as string;
			selectedImage = selectedImage;

			console.log("Image uploaded in button: " + selectedImage);
		}
		reader.onerror = () => {
			alert('Invalid image.');
		}
	}

	//
	function addTag(event: KeyboardEvent) {
		if (event.key !== "Enter") {
			return;
		}
		
		if (data.tags.find((value: string) => value === tagSearchValue)) {
			recipe.tags.push(tagSearchValue);
			recipe.tags = recipe.tags.toSorted();
			console.log("Tag added: " + tagSearchValue);
		}

		tagSearchValue = "";
	}

	//
	function removeCurrentSelectedImage() {
		recipe.images[selectedImage] = "";
		currentImage = "";

		console.log("Image removed from button: " + selectedImage);
	}

	//
	function removeTag(selectedTag: number) {
		if (selectedTag < 0 && selectedTag > recipe.tags.length) {
			alert("ERROR: value is outside bounderies.");
			return;
		}

		console.log("Tag removed: " + recipe.tags[selectedTag]);

		recipe.tags = recipe.tags.toSpliced(selectedTag, 1);
	}

	//
	async function saveRecipe() {
		isSaving = true;
		console.log("Save request sent!");

		await fetch('/api/nrecipe', {
			method: 'POST',
			body: JSON.stringify(recipe),
			headers: {
				'content-type': 'application/json'
			}
		}).then(
			(response: Response) => {
				console.log(response.statusText);
				alert("Recipe was saved succesfully!");
			}
		).catch(
			(error) => {
				console.log(error);
				alert("ERROR: something went wrong.");
			}
		).finally(
			() => {
				isSaving = false;
				console.log("Promise resolved.");
			}
		);
	}
</script>



<form class="page-content">
	<input bind:value={recipe.name}
			type="text"
			placeholder="Título da Receita..."
			spellcheck={false}
			class="recipe-name"
			disabled={isSaving}
			/>
	
	<section>
		<input bind:this={fileInput}
			style="display: none;"
			type="file"
			accept=".jpg, .jpeg, .png"
			disabled={isSaving}
			on:change={(e) => onFileSelected(e.target)}
			/>
		
		<div class="recipe-images-container">
			<div class="current-image-container">
				{#if currentImage}
					<img src={currentImage} alt="Recipe." class="current-image"/>
				{:else}
					<div class="current-image-empty" />
				{/if}
			</div>
			
			<div class="current-image-buttons-container">
				{#if recipe.images[selectedImage]}
					<button disabled={isSaving} type="button" on:click={removeCurrentSelectedImage} class="current-image-button">Remover Imagem</button>
					<button disabled={isSaving} type="button" on:click={() => fileInput.click()} class="current-image-button">Trocar Imagem</button>
				{/if}
			</div>
			
			<div class="images-list-container">
				<div class="images-list">
					{#each recipe.images as image, i}
						
						{#if image}
							<button disabled={isSaving} on:click={() => selectedImage = i} class="radio-button">
								{#if image}
									<img src={image} alt="Recipe." class="recipe-image"/>
								{:else}
									<div class="recipe-image" />
								{/if}
							</button>
						{:else}
							<button disabled={isSaving} class="recipe-image" type="button" on:click={() => {selectedImage = i; fileInput.click();}}>Add</button>
						{/if}
					
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section>
		<h2>Ingredientes</h2>
		<textarea bind:value={recipe.ingredients[0]}
				placeholder="Ingredientes..."
				spellcheck={false}
				class="recipe-ingredients"
				disabled={isSaving}
				/>
	</section>

	<section>
		<h2>Modo de Preparo</h2>
		<textarea bind:value={recipe.method}
				placeholder="Modo de Preparo..."
				spellcheck={false}
				class="recipe-method"
				disabled={isSaving}
				/>
	</section>

	<section>
		<h2>Tags</h2>

		<div class="tag-search-container">
			<input bind:value={tagSearchValue}
					type="text"
					placeholder="Procurar Tag..."
					spellcheck={false}
					class="tag-search"
					disabled={isSaving}
					on:keydown={addTag}
					/>
		</div>
	
		<div class="recipe-tags-container">
			{#each recipe.tags as tag, i}
			<button type="button" disabled={isSaving} on:click={() => {removeTag(i);}} class="recipe-tag">{tag}</button>
			{/each}
		</div>

		<div class="save-recipe-container">
			<button class="save-recipe" disabled={isSaving} type="button" on:click={saveRecipe}>Salvar Receita</button>
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
		opacity: 1.0;
	}

	.recipe-image {
		height: 40px;
		width: 60px;
		margin: 0 auto;
		opacity: .5;
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