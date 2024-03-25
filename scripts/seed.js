import { faker } from "@faker-js/faker"
import { MongoClient } from "mongodb"
import {
	artisticMovements,
	typesOfBuilding,
} from "../src/features/places/utils/constants.js"
import { generateArray } from "../src/utils/functions.js"

const uri = process.env.DATABASE_URL
const client = new MongoClient(uri)

// eslint-disable-next-line max-lines-per-function
async function main() {
	try {
		await client.connect()

		const database = client.db(uri.split("/").at(-1))
		const places = database.collection("places")
		const data = []

		for (let i = 0; i < 50; i += 1) {
			const randomTypesOfBuilding = faker.helpers.arrayElement([
				"bar",
				"museum",
				"restaurant",
				"park",
			])
			const dataBuild = {
				typeOf: faker.helpers.arrayElement(
					typesOfBuilding[randomTypesOfBuilding],
				),
			}

			switch (randomTypesOfBuilding) {
				case "bar":
					dataBuild.averageCost = faker.helpers.arrayElement(generateArray(5))

					break

				case "museum": {
					const freeOrPay = faker.helpers.arrayElement(["free", "pay"])

					dataBuild.artisticMovement =
						faker.helpers.arrayElement(artisticMovements)
					dataBuild.freeOrPay = freeOrPay

					// eslint-disable-next-line max-depth
					if (freeOrPay === "pay") {
						dataBuild.price = faker.helpers.arrayElement([45, 20, 88, 56, 32])
					}

					break
				}

				case "restaurant":
					dataBuild.stars = faker.helpers.arrayElement(generateArray(5))
					dataBuild.averageCost = faker.helpers.arrayElement(generateArray(5))

					break

				case "park": {
					const freeOrPay = faker.helpers.arrayElement(["free", "pay"])

					dataBuild.public = faker.helpers.arrayElement([true, false])
					dataBuild.freeOrPay = freeOrPay

					// eslint-disable-next-line max-depth
					if (freeOrPay === "pay") {
						dataBuild.price = faker.helpers.arrayElement([45, 20, 88, 56, 32])
					}

					break
				}
			}

			const date = new Date()

			data.push({
				building: randomTypesOfBuilding,
				name: faker.company.name(),
				zipcode: parseInt(faker.location.zipCode(), 10),
				country: faker.location.country(),
				city: faker.location.city(),
				[randomTypesOfBuilding]: dataBuild,
				createdAt: date,
				updatedAt: date,
				__v: 0,
			})
		}

		await places.insertMany(data)
	} finally {
		await client.close()
	}
}

main()
