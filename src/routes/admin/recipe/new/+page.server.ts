import { DATABASE_ALL_TAGS_ID } from '$env/static/private';
import prisma from '$lib/prisma';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {

	const tags = (await prisma.tag.findFirst({
		where: {
			id: DATABASE_ALL_TAGS_ID
		},
		select: {
			tags: true
		}
	}))?.tags;

	return { tags };
};