import { pick } from "@/utils/functions"
import Redis from "ioredis"
import mongoose from "mongoose"

/**
 *
 * @param {Function | Promise<Function>} controller
 * @returns {Function}
 */

export const handlerApi = controller => async (req, res) => {
	const redisClient = new Redis({
		maxRetriesPerRequest: 3,
	})

	try {
		await mongoose.connect(process.env.DATABASE_URL)

		if (!controller[req.method]) {
			return res.status(405).send("Method not allowed")
		}

		return await controller[req.method](req, res, redisClient)
	} catch (error) {
		if (
			error.message.includes("ECONNREFUSED") &&
			error.message.includes("27017")
		) {
			return res.status(500).json({ error: "Database connection failed" })
		}

		return res.status(500).json({ error: "Unknown server error" })
	}
}

export const serverTranslation = async (locale, page) => ({
	messages: pick(
		(await import(`@/languages/${locale}.json`)).default,
		page.messages,
	),
	now: new Date().getTime(),
})
