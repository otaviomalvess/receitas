import { DATABASE_ALL_TAGS_ID } from '$env/static/private';
import type { Recipe } from '$lib/Recipe';
import prisma from '$lib/prisma';
import type { Load } from '@sveltejs/kit';

//
export const load: Load = async ({ params }) => {

	let recipe = await prisma.recipe.findFirst({
		where: {
			slug: params.slug
		},
		select: {
			id: true,
			ingredients: true,
			method: true,
			name: true,
			pictures: true,
			slug: false,
			tags: true,
		}
	}) as Recipe;

	const tags = (await prisma.tag.findFirst({
		where: {
			id: DATABASE_ALL_TAGS_ID
		},
		select: {
			tags: true
		}
	}))?.tags;

	return {
		recipe,
		tags,
	};
};