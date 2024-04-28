import { PlaceModel } from "@/features/places/database/models"
import { filterQueryPlace } from "@/features/places/schemas"
import { UserService } from "@/features/users/services"
import { decrypt } from "@/lib/jwt"

export class PlacesController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

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

	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async POST(req, res, redisClient) {
		if (!req.cookies.session) {
			return res.status(403).send("Unauthorized")
		}

		const { user } = await decrypt(req.cookies.session)

		if (!(await UserService.exists({ username: user.username }))) {
			return res.status(403).send("Unauthorized")
		}

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
