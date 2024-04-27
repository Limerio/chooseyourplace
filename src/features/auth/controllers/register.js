import { registerSchema } from "@/features/auth/schemas/register"
import { UserModel } from "@/features/users/database/models"
import { UserService } from "@/features/users/services"
import { matchs, wrongs } from "@/utils/errors"

export class RegisterController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async POST(req, res, redisClient) {
		try {
			if (!req.body) {
				return res.status(400).json({
					created: false,
					error: "Request body empty",
				})
			}

			const { username, email } = await registerSchema.parseAsync(req.body)
			const usernameExists = await UserModel.exists({ username })

			if (usernameExists) {
				return res.status(400).json({
					created: false,
					error: "Account already exists with this username",
				})
			}

			const emailExists = await UserModel.exists({ email })

			if (emailExists) {
				return res.status(400).json({
					created: false,
					error: "Account already exists with this email",
				})
			}

			await UserService.create(redisClient, req.body)

			return res.status(201).json({ created: true })
		} catch (error) {
			if (JSON.parse(error.message)[0].message === matchs.passwords) {
				return res.status(400).json({
					created: false,
					error: matchs.passwords,
				})
			}

			return res.status(500).json({ created: false, error: wrongs.something })
		}
	}
}
