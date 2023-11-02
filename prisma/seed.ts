import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = Array.from({ length: 10 }).map((_, i) => ({
	name: `Sushizao ${i}`,
	ingredients: ['Arroz', 'Sushi'],
	method: 'Enrola o arroz no sushi',
	pictures: ['http://mypicture.com'],
	slug: `sushizao-the-${i}`
}));

async function main() {
	console.log('Start seeding');
	console.log(data);

	const user = await prisma.user.create({
		data: {
			name: 'Otaviao',
			email: 'otavioalves@email.com'
		}
	});

	await prisma.recipe.createMany({
		data
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
