import { PlaceModel } from "@/features/places/database/models"
import { updatePlaceSchema, updateSubSchemas } from "@/features/places/schemas"

export class PlaceController {
	/**
	 *
	 * @param {string} placeId
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns
	 */

	static async checkId(placeId, res, redisClient) {
		if (!(await redisClient.get(`places:${placeId}`))) {
			const place = await PlaceModel.findById(placeId)

			if (!place) {
				return res.status(404).send("Place not found")
			}

			await redisClient.set(
				`places:${place._id}`,
				JSON.stringify(place.toJSON()),
			)
		}

		return JSON.parse(await redisClient.get(`places:${placeId}`))
	}

	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */
	static async GET(req, res, redisClient) {
		const { placeId } = req.query
		const place = await PlaceController.checkId(placeId, res, redisClient)

		return res.json(place)
	}

	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async PUT(req, res, redisClient) {
		const { placeId } = req.query
		const place = await PlaceController.checkId(placeId, res, redisClient)
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

			if (await redisClient.get(`places:${placeId}`)) {
				await redisClient.del(`places:${placeId}`)
			}

			await redisClient.set(`places:${placeId}`, JSON.stringify(newPlace))
		} catch (error) {
			return res.json({ error })
		}

		return res.json(newPlace)
	}

	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async DELETE(req, res, redisClient) {
		const { placeId } = req.query
		const place = await PlaceModel.findById(placeId)

		if (!place) {
			return res.status(404).send("Place not found")
		}

		if (await redisClient.get(`places:${placeId}`)) {
			await redisClient.del(`places:${placeId}`)
		}

		await PlaceModel.findByIdAndDelete(placeId)

		return res.json(place)
	}
}
