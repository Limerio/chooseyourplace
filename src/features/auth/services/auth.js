import { UserService } from "@/features/users/services"
import { unknowns, wrongs } from "@/utils/errors"
import * as bcrypt from "bcrypt"

export class AuthService {
	static async check({ email, password }) {
		try {
			const {
				password: userPassword,
				// eslint-disable-next-line no-unused-vars
				__v,
				...user
			} = await UserService.findOne({
				email,
			})
			const checkPassword = await bcrypt.compare(password, userPassword)

			if (!checkPassword) {
				return Promise.reject(new Error(wrongs.password))
			}

			return user
		} catch (error) {
			if (error.message === unknowns.user) {
				throw new Error(unknowns.account)
			}

			throw new Error(wrongs.something)
		}
	}
}
