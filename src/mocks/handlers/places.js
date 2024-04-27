import {
	updatePlaceSchema,
	updateSubSchemas,
} from "@/features/places/database/schemas"
import { http, HttpResponse } from "msw"

if (typeof window !== "undefined" && !localStorage.getItem("places")) {
	localStorage.setItem("places", "[]")
}

const routes = {
	all: "/api/places",
	create: "/api/places",
	read: "/api/places/:id",
	update: "/api/places/:id",
	delete: "/api/places/:id",
}

/**
 *
 * @param {boolean} server
 * @returns
 */
// eslint-disable-next-line max-lines-per-function
export const handlerPlaces = server => [
	http.get(server ? `http://localhost:3000${routes.all}` : routes.all, () =>
		HttpResponse.json(JSON.parse(localStorage.getItem("places"))),
	),
	http.post(
		server ? `http://localhost:3000${routes.create}` : routes.create,
		async ({ request }) => {
			const places = JSON.parse(localStorage.getItem("places"))
			const { info, details } = await request.json()
			const newPlace = {
				_id: crypto.randomUUID(),
				...info,
				[info.building]: details,
			}
			places.push(newPlace)
			localStorage.setItem("places", JSON.stringify(places))

			return HttpResponse.json(newPlace)
		},
	),
	http.get(
		server ? `http://localhost:3000${routes.read}` : routes.read,
		({ params }) => {
			const places = JSON.parse(localStorage.getItem("places"))
			const place = places.find(placeData => placeData._id === params.id)

			if (!place) {
				return new HttpResponse(null, {
					status: 404,
				})
			}

			return HttpResponse.json(place)
		},
	),
	http.put(
		server ? `http://localhost:3000${routes.update}` : routes.update,
		async ({ params, request }) => {
			const places = JSON.parse(localStorage.getItem("places"))
			const place = places.find(placeData => placeData._id === params.id)

			if (!place) {
				return new HttpResponse(null, {
					status: 404,
				})
			}

			const { name, building, city, zipcode, country, ...buildings } =
				await request.json()

			try {
				if (!Object.keys(buildings).includes(building)) {
					return HttpResponse.json({ error: "This is not the same building" })
				}

				Object.assign(
					place,
					await updatePlaceSchema.parseAsync({
						name: name || place.name,
						building: building || place.building,
						city: city || place.city,
						zipcode: zipcode || place.zipcode,
						country: country || place.country,
					}),
				)

				if (place.building !== building) {
					place[building] = {}
				}

				Object.assign(
					place[building],
					await updateSubSchemas[building].parseAsync(buildings[building]),
				)

				localStorage.setItem("places", JSON.stringify(places))

				return HttpResponse.json(place)
			} catch (error) {
				return HttpResponse.json({ error })
			}
		},
	),
	http.delete(
		server ? `http://localhost:3000${routes.delete}` : routes.delete,
		({ params }) => {
			const places = JSON.parse(localStorage.getItem("places"))
			const placeIndex = places.findIndex(
				placeData => placeData._id === params.id,
			)

			if (placeIndex === null) {
				return new HttpResponse(null, {
					status: 404,
				})
			}

			const oldData = { ...places[placeIndex] }

			places.splice(placeIndex, 1)
			localStorage.setItem("places", JSON.stringify(places))

			return HttpResponse.json(oldData)
		},
	),
]
