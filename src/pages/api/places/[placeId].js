import { PlaceModel } from "@/models"
import { handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	const { placeId } = req.query

	if (req.method === "GET") {
		const date = new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "long",
			weekday: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})
		const place = await PlaceModel.findById(placeId)
		const { createdAt, updatedAt, ...data } = place.toJSON()

		return res.json({
			...data,
			createdAt: date.format(createdAt),
			updatedAt: date.format(updatedAt),
		})
	}

	return res.status(405).send("Method not allowed")
})

export default handler
