import { requestAPI } from "@/utils/functions"

const defaultOptions = {
	headers: {
		"Content-Type": "application/json",
	},
}

export const requestServerGetPlace = async placeId =>
	await requestAPI(true, `/places/${placeId}`, defaultOptions)

export const requestGetPlaces = async () =>
	await requestAPI(false, "/places", defaultOptions)

export const requestGetPlace = async placeId =>
	await requestAPI(false, `/places/${placeId}`, defaultOptions)

export const requestDeletePlace = async placeId =>
	await requestAPI(false, `/places/${placeId}`, {
		method: "DELETE",
		...defaultOptions,
	})

export const requestPostPlace = async body =>
	await requestAPI(false, "/places", {
		method: "POST",
		body: JSON.stringify(body),
		...defaultOptions,
	})

export const requestPutPlace = async (placeId, body) =>
	await requestAPI(false, `/places/${placeId}`, {
		method: "PUT",
		body: JSON.stringify(body),
		...defaultOptions,
	})
