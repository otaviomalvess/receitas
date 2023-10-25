import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding');

	const user = await prisma.user.create({
		data: {
			id: 1029850981,
			name: 'Otaviao',
			email: 'otavioalves@email.com'
		}
	});

	const recipe = await prisma.recipe.create({
		data: {
			id: 1029284908,
			name: 'Sushizao',
			ingredients: ['Arroz', 'Sushi'],
			method: 'Enrola o arroz no sushi',
			pictures: ['http://mypicture.com'],
			slug: 'sushizao-the-first',
			tags: {
				createMany: {
					data: [
						{ id: 1240918, name: 'frutos do mar' },
						{ id: 59305389, name: 'saudavel' }
					]
				}
			}
		}
	});

	console.log(`Created user with id ${user.id}`);
	console.log(`Created recipe with id ${recipe.id}`);

	console.log('Seeding finished.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
