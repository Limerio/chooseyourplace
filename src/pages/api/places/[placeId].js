import { PlaceModel } from "@/models"
import { updatePlaceSchema, updateSubSchemas } from "@/schemas"
import { formatDate, handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	const { placeId } = req.query
	const place = await PlaceModel.findById(placeId)
	const { createdAt, updatedAt, ...data } = place.toJSON()
	const result = {
		...data,
		createdAt: formatDate(createdAt),
		updatedAt: formatDate(updatedAt),
	}

	if (req.method === "GET") {
		return res.json(result)
	}

	if (req.method === "PUT") {
		const { name, building, city, zipcode, country, ...buildings } = req.body
		const newPlace = {}

		try {
			if (!Object.keys(buildings).includes(building)) {
				return res.json({ error: "This is not the same building" })
			}

			Object.assign(
				newPlace,
				await updatePlaceSchema.parseAsync({
					name: name || place.name,
					building: building || place.building,
					city: city || place.city,
					zipcode: zipcode || place.zipcode,
					country: country || place.country,
				}),
			)

			if (place.building !== building) {
				newPlace[building] = {}
			}

			Object.assign(
				newPlace[building],
				await updateSubSchemas[building].parseAsync(buildings[building]),
			)

			await place.replaceOne(newPlace)
		} catch (error) {
			return res.json({ error })
		}

		return res.json(newPlace)
	}

	if (req.method === "DELETE") {
		await PlaceModel.findByIdAndDelete(placeId)

		return res.json(result)
	}

	return res.status(405).send("Method not allowed")
})

export default handler
