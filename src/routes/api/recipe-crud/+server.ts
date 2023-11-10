import type { Prisma } from '@prisma/client';
import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';
import type { Recipe } from '$lib/Recipe';

const debug_canPrismaOperate: boolean = true;

export async function DELETE({ request }: RequestEvent) {

	try {
		const id = await request.json();

		// @TODO: check if ID is valid.

		if (debug_canPrismaOperate) {
			await prisma.recipe.delete({
				where: {
					id: id
				},
			});
		}

		return new Response(
			new Blob(),
			{ status: 200, statusText: "OK" }
		);

	} catch (error) {
		// @TODO: cover more error cases.
		const options = { status: 500, statusText: error as string };
		return new Response(new Blob(), options);
	}
}

export async function POST({ request }: RequestEvent) {

	try {
		const requestData = await request.json();

		const recipeData: Recipe = clearRecipeRequestData(requestData);
		const recipeSlug: string = recipeData.name.toLowerCase().replaceAll(" ", "-");

		// @TODO: check if recipe is valid.

		const recipe: Prisma.RecipeCreateInput = {
			name: recipeData.name,
			ingredients: recipeData.ingredients,
			method: recipeData.method,
			tags: recipeData.tags,
			pictures: recipeData.pictures,
			slug: recipeSlug,
		};

		if (debug_canPrismaOperate) {
			await prisma.recipe.create({ data: recipe });
		}

		return new Response(
			new Blob(),
			{ status: 200, statusText: "OK" }
		);

	} catch (error) {
		// @TODO: cover more error cases.
		const options = { status: 500, statusText: error as string };
		return new Response(new Blob(), options);
	}
}

export async function PUT({ request }: RequestEvent) {

	try {
		const requestData = await request.json();

		const recipeData: Recipe = clearRecipeRequestData(requestData);
		const recipeSlug: string = recipeData.name.toLowerCase().replaceAll(" ", "-");

		// @TODO: check if recipe is valid.

		const recipe: Prisma.RecipeUpdateInput = {
			name: recipeData.name,
			ingredients: recipeData.ingredients,
			method: recipeData.method,
			tags: recipeData.tags,
			pictures: recipeData.pictures,
			slug: recipeSlug,
		};

		if (debug_canPrismaOperate) {
			await prisma.recipe.update({
				data: recipe,
				where: {
					id: recipeData.id
				}
			});
		}

		return new Response(
			new Blob(),
			{ status: 200, statusText: "OK" }
		);

	} catch (error) {
		// @TODO: cover more error cases.
		const options = { status: 500, statusText: error as string };
		return new Response(new Blob(), options);
	}
}

function clearRecipeRequestData(data: any): Recipe {

	let recipe = data as Recipe;

	recipe.name = recipe.name.trim();

	if (recipe.pictures.length > 5) {
		recipe.pictures.length = 5;
	}

	recipe.pictures = recipe.pictures.filter(
		(picture: string) => { return !!picture; }
	);

	return recipe;
}