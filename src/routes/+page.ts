import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './recipe/$types';

export const load = (async () => {
	const response = await prisma.recipe.findMany();

	return { feed: response };
}) satisfies PageServerLoad;
