import { PlaceModel } from "@/models"
import { handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	if (req.method === "GET") {
		return res.json(await PlaceModel.find({}))
	}

	if (req.method === "POST") {
		const { info, details } = req.body
		const newPlace = new PlaceModel({
			...info,
			[info.building]: details,
		})

		await newPlace.save()

		return res.json(newPlace)
	}

	return res.send("Method not allowed")
})

export default handler
