import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding');

	const user = await prisma.user.create({
		data: {
			id: 23242,
			name: 'Otaviao',
			email: 'otavioalves@email.com',
			recipes: {
				create: {
					id: 2020,
					name: 'Sushizao',
					ingredients: ['Arroz', 'Sushi'],
					method: 'Enrola o arroz no sushi',
					pictures: {
						create: {
							id: 202020,
							url: 'http://mypicture.com'
						}
					}
				}
			}
		}
	});

	console.log(`Created user with id ${user.id}`);

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
