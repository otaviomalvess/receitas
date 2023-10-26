import { error } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { PageServerLoad } from './recipe/$types';

export const load = (async () => {
	const response = await prisma.recipe.findMany();

	try {
		return { feed: response };
	} catch (_error) {
		throw error(420, 'DB Error');
	}
}) satisfies PageServerLoad;
