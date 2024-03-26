import { PlaceModel } from "@/features/places/models"
import { filterQueryPlaces } from "@/features/places/schemas"
import { Redis } from "ioredis"
import { NextApiRequest, NextApiResponse } from "next"

export class PlacesController {
	static async GET(req: NextApiRequest, res: NextApiResponse) {
		const { q, limit, page, ...query } = await filterQueryPlaces.parseAsync(
			req.query,
		)
		const places = q
			? PlaceModel.find({
					$text: {
						$search: q,
					},
					...query,
				})
			: PlaceModel.find(query)

		if (limit) {
			return res.json(await places.limit(limit))
		}

		if (page) {
			return res.json(await places.skip((limit ? limit - 1 : 9) * page))
		}

		return res.json(await places)
	}

	static async POST(
		req: NextApiRequest,
		res: NextApiResponse,
		redisClient: Redis,
	) {
		const { info, details } = req.body
		const newPlace = new PlaceModel({
			...info,
			[info.building]: details,
		})

		await newPlace.save()
		redisClient.set(`places:${newPlace._id}`, JSON.stringify(newPlace.toJSON()))

		return res.json(newPlace)
	}
}
