import { defaultOptions } from "@/utils/constants"
import { requestAPI } from "@/utils/functions"

export const requestPostAuthLogin = async body =>
	await requestAPI(false, "/auth/login", {
		method: "POST",
		body: JSON.stringify(body),
		...defaultOptions,
	})

export const requestPostAuthRegister = async body =>
	await requestAPI(false, "/auth/register", {
		method: "POST",
		body: JSON.stringify(body),
		...defaultOptions,
	})

export const requestDeleteAuthLogout = async () =>
	await requestAPI(false, "/auth/logout", {
		method: "DELETE",
		...defaultOptions,
	})

/**
 *
 * @param {string} token
 * @returns
 */
export const requestGetVerifyToken = async token =>
	await requestAPI(true, `/auth/verify?token=${token}`, defaultOptions)

/**
 *
 * @param {string} token
 * @returns
 */
export const requestPatchVerifyToken = async token =>
	await requestAPI(false, `/auth/verify?token=${token}`, {
		method: "PATCH",
		...defaultOptions,
	})
