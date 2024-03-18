import { PlaceModel } from "@/models"
import { filterQueryPlace } from "@/schemas"
import { handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	if (req.method === "GET") {
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

	if (req.method === "POST") {
		const { info, details } = req.body
		const newPlace = new PlaceModel({
			...info,
			[info.building]: details,
		})

		await newPlace.save()

		return res.json(newPlace)
	}

	return res.status(405).send("Method not allowed")
})

export default handler
