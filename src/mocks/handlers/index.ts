import { handlerPlaces } from "./places"

export const handlers = (server: boolean) => [...handlerPlaces(server)]
