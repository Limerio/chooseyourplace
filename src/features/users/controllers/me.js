import { decrypt } from "@/lib/jwt"

export class UserMeController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async GET(req, res) {
		const cookie = req.cookies.session

		if (!cookie) {
			return res.status(403).json({ error: "Unauthorized" })
		}

		const { user } = await decrypt(cookie)

		return res.json(user)
	}
}
