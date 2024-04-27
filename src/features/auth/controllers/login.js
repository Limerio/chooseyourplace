import { loginSchema } from "@/features/auth/schemas/login"
import { AuthService } from "@/features/auth/services"
import { encrypt } from "@/features/auth/utils/jwt"
import { serialize } from "cookie"

export class LoginController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async POST(req, res, redisClient) {
		try {
			const time = 60 * 60 * 24
			const data = await loginSchema.parseAsync(req.body)
			const user = await AuthService.check(data)
			const expires = new Date(Date.now() + time * 1000)
			const session = await encrypt({ user, expires })

			await redisClient.set(`sessions:${user._id}`, session)

			res.setHeader(
				"Set-Cookie",
				serialize("session", session, {
					httpOnly: true,
					maxAge: time,
					secure: true,
					path: "/",
				}),
			)

			res.status(200).json({ login: true })
		} catch (error) {
			res.status(500).json({
				login: false,
				error: error.message,
			})
		}
	}
}
