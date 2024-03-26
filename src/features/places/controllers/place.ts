import { PlaceModel } from "@/features/places/models"
import { updatePlaceSchema, updateSubSchemas } from "@/features/places/schemas"
import { placeQuery } from "@/features/places/schemas/querys"
import { Redis } from "ioredis"
import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"

export class PlaceController {
	static async checkId(
		placeId: string,
		res: NextApiResponse,
		redisClient: Redis,
	) {
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

		return JSON.parse((await redisClient.get(`places:${placeId}`)) as string)
	}

	static async GET(
		req: NextApiRequest,
		res: NextApiResponse,
		redisClient: Redis,
	) {
		const { placeId } = await placeQuery.parseAsync(req.query)
		const place = await PlaceController.checkId(placeId, res, redisClient)

		return res.json(place)
	}

	static async PUT(
		req: NextApiRequest,
		res: NextApiResponse,
		redisClient: Redis,
	) {
		const { placeId } = await placeQuery.parseAsync(req.query)
		const place = await PlaceController.checkId(placeId, res, redisClient)
		const { name, building, city, zipcode, country, ...buildings } =
			await updatePlaceSchema
				.merge(z.object(updateSubSchemas))
				.parseAsync(req.body)

		try {
			if (!Object.keys(buildings).includes(building || place.building)) {
				return res.json({ error: "This is not the same building" })
			}

			Object.assign(
				place,
				await updatePlaceSchema.parseAsync({
					name: name || place.name,
					building: building || place.building,
					city: city || place.city,
					zipcode: zipcode || place.zipcode,
					country: country || place.country,
				}),
			)

			if (place.building !== building) {
				place[building as string] = {}
			}

			Object.assign(
				place[building ?? place.building],
				await updateSubSchemas[building || place.building].parseAsync(
					buildings[building ?? place.building],
				),
			)

			await place.replaceOne(place)

			if (await redisClient.get(`places:${placeId}`)) {
				await redisClient.del(`places:${placeId}`)
			}

			await redisClient.set(`places:${placeId}`, JSON.stringify(place))
		} catch (error) {
			return res.json({ error })
		}

		return res.json(place)
	}

	static async DELETE(
		req: NextApiRequest,
		res: NextApiResponse,
		redisClient: Redis,
	) {
		const { placeId } = await placeQuery.parseAsync(req.query)
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
