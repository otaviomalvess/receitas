import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding');

	const user = await prisma.user.create({
		data: {
			id: randomUUID(),
			name: 'Otaviao',
			email: 'otavioalves@email.com'
		}
	});

	const recipe = await prisma.recipe.create({
		data: {
			id: randomUUID(),
			name: 'Sushizao',
			ingredients: ['Arroz', 'Sushi'],
			method: 'Enrola o arroz no sushi',
			pictures: ['http://mypicture.com'],
			slug: 'sushizao-the-first'
		}
	});

	await prisma.tag.create({
		data: {
			id: randomUUID(),
			tags: ['frutos-do-mar', 'laticinios', 'doces']
		}
	});

	console.log(`Created user with id ${user.id}`);
	console.log(`Created recipe with id ${recipe.id}`);
	console.log('Created tags');

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
