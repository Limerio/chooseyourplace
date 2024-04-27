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
