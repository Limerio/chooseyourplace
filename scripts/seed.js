require("dotenv").config()
const { faker } = require("@faker-js/faker")
const { MongoClient } = require("mongodb")

async function main() {
	const uri = process.env.DATABASE_URL
	const client = new MongoClient(uri)

	try {
		await client.connect()
		const database = client.db(uri.split("/").at(-1))
		const places = database.collection("places")
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
		await places.insertMany(data)
	} finally {
		await client.close()
	}
}

main()
