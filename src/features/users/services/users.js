import { UserModel } from "@/features/users/database/models"
import { unknowns } from "@/utils/errors"
import * as bcrypt from "bcrypt"

export class UserService {
	/**
	 *
	 * @param {import("ioredis").Redis} redisClient
	 * @param {string} id
	 */

	static async get(redisClient, id) {
		if (!(await redisClient.get(`users:${id}`))) {
			const user = await UserModel.findById(id)

			if (!user) {
				throw new Error(unknowns.user)
			}

			await this.redisClient.set(
				`users:${user._id}`,
				JSON.stringify(user.toJSON()),
			)
		}

		return JSON.parse(await this.redisClient.get(`users:${id}`))
	}

	/**
	 *
	 * @param {object} filter
	 * @returns {Promise}
	 */

	static async findOne(filter) {
		const user = await UserModel.findOne(filter)

		if (!user) {
			throw new Error(unknowns.user)
		}

		return user
	}

	/**
	 *
	 * @param {import("ioredis").Redis} redisClient
	 * @param {{ username: string, password: string, email: string }} body
	 * @returns {Promise<void>}
	 */
	static async create(redisClient, { password, username, email, token }) {
		const hashPassword = await bcrypt.hash(
			password,
			parseInt(process.env.PASSWORD_SALT, 10),
		)
		const newUser = new UserModel({
			username,
			email,
			password: hashPassword,
			verified: {
				state: false,
				token,
			},
		})

		await newUser.save()

		await redisClient.set(
			`users:${newUser._id}`,
			JSON.stringify(newUser.toJSON()),
		)
	}

	/**
	 *
	 * @param {object} filter
	 * @returns {Promise<boolean>}
	 */

	static async exists(filter) {
		return Boolean(await UserModel.exists(filter))
	}
}
