import { error, type Load } from '@sveltejs/kit';
import prisma from '$lib/prisma.js';

export const load: Load = async ({ params }) => {
	// query no banco
	const recipe = await prisma.recipe.findFirst({ where: { slug: params.slug } });

	if (!recipe) {
		return error(420);
	}

	return recipe;
};
