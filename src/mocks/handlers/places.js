import { http, HttpResponse } from "msw"

export const handlerPlaces = [
	http.get("/api/places", () => HttpResponse.json([])),
]
