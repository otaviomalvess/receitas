import prisma from '$lib/prisma';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {

	const tags = (await prisma.tag.findFirst({
		where: {
			id: "8a36e3d8-eb1d-46d7-ae44-45beed126dd1"
		},
		select: {
			tags: true
		}
	}))?.tags;

	return { tags };
};