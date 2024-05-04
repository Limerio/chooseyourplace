import { defaultOptions } from "@/utils/constants"
import { requestAPI } from "@/utils/functions"

export const requestGetUser = async () =>
	await requestAPI(false, "/users/me", defaultOptions)
