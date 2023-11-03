import { Prisma, PrismaClient } from '@prisma/client';

const debug_canPrismaOperate: boolean = true;

//
export async function POST({ request }) {
	const r = await request.json();

	try {
		// @TODO: due to be removed.
		let tags = [];
		for (let i = 0; i < r.tags.length; i++) {
			tags.push({name: r.tags[i]});
		}

		// Cleaning images array.
		if (r.images.length > 5) {
			r.images.length = 5;
		}
		r.images = r.images.filter(
			(image: string) => { return image !== ""; }
		);

		// Creating recipe slug
		const slug = "/" + r.name.toLowerCase().replaceAll(" ", "-");

		const recipe: Prisma.RecipeCreateInput = {
			name: r.name,
			ingredients: r.ingredients,
			method: r.method,
			tags: {
				createMany: {
					data: tags
				}
			},
			pictures: r.images,
			slug: slug,
		};
		
		const prisma = new PrismaClient();
		await prisma.recipe.create({ data: recipe });

		return new Response(
			new Blob(),
			{ status: 200, statusText: "OK" }
		);
	
	} catch (error) {
		// @TODO: cover more error cases.
		const options = { status: 500, statusText: error as string };
		return new Response(new Blob(), options );
	}
}