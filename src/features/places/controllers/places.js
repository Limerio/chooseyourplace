import { PlaceModel } from "@/features/places/models"
import { filterQueryPlace } from "@/features/places/schemas"

export class PlacesController {
	static async GET(req, res) {
		const { q, limit, page, ...query } = req.query
		const places = q
			? PlaceModel.find({
					$text: {
						$search: q,
					},
					...(await filterQueryPlace.parseAsync(query)),
				})
			: PlaceModel.find(await filterQueryPlace.parseAsync(query))

		if (limit) {
			return res.json(await places.limit(limit))
		}

		if (page) {
			return res.json(await places.skip((limit - 1 || 9) * page))
		}

		return res.json(await places)
	}

	static async POST(req, res, redisClient) {
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
