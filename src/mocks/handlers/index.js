import { handlerPlaces } from "./places"

/**
 *
 * @param {boolean} server
 * @returns
 */
export const handlers = server => [...handlerPlaces(server)]
