import { wrongs } from "@/utils/errors"
import { serialize } from "cookie"

export class LogoutController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */
	static async DELETE(req, res, redisClient) {
		try {
			await redisClient.del(`sessions:${req.cookies.session}`)
			res.setHeader(
				"Set-Cookie",
				serialize("session", "", {
					httpOnly: true,
					maxAge: 0,
					secure: true,
					path: "/",
				}),
			)

			return res.status(200).json({ logout: true })
		} catch (error) {
			return res.status(500).json({ created: false, error: wrongs.something })
		}
	}
}
