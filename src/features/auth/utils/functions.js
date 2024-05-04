import { randomBytes } from "crypto"

/**
 *
 * @returns {string}
 */
export const generateEmailVerificationToken = () =>
	randomBytes(32).toString("hex")
