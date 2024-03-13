import { PlaceModel } from "@/models"
import { formatDate, handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	const { placeId } = req.query
	const place = await PlaceModel.findById(placeId)
	const { createdAt, updatedAt, ...data } = place.toJSON()
	const result = {
		...data,
		createdAt: formatDate(createdAt),
		updatedAt: formatDate(updatedAt),
	}

	if (req.method === "GET") {
		return res.json(result)
	}

	if (req.method === "DELETE") {
		await PlaceModel.findByIdAndDelete(placeId)

		return res.json(result)
	}

	return res.status(405).send("Method not allowed")
})

export default handler
