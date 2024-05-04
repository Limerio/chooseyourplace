import { verifyQuerySchema } from "@/features/auth/schemas/verify"
import { UserService } from "@/features/users/services"

export class VerifyController {
	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async GET(req, res) {
		const { token } = await verifyQuerySchema.parseAsync(req.query)

		if (!(await UserService.exists({ "verified.token": token }))) {
			return res.status(404).json({ exists: false, error: "Not found" })
		}

		return res.json({ exists: true })
	}

	/**
	 *
	 * @param {import("next").NextApiRequest} req
	 * @param {import("next").NextApiResponse} res
	 * @param {import("ioredis").Redis} redisClient
	 * @returns {void}
	 */

	static async PATCH(req, res) {
		const { token } = await verifyQuerySchema.parseAsync(req.query)
		const user = await UserService.findOne({ "verified.token": token })

		user.verified.token = ""
		user.verified.state = true
		await user.save()

		res.json({ verified: true })
	}
}
