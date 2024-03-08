const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { faker } = require("@faker-js/faker")

async function main() {
	const data = []

	for (let i = 0; i < 10; i += 1) {
		data.push({
			type: faker.helpers.arrayElement([
				"bar",
				"museum_pay",
				"museum_free",
				"restaurant",
				"monument",
			]),
			name: faker.company.name(),
			zipcode: parseInt(faker.location.zipCode(), 10),
			country: faker.location.country(),
			city: faker.location.city(),
		})
	}

	await prisma.place.createMany({
		data,
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		// eslint-disable-next-line no-console
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
