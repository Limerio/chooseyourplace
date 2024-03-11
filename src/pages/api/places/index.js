import { PlaceModel } from "@/models"
import { handlerApi } from "@/utils/functions"

const handler = handlerApi(async (req, res) => {
	res.json(await PlaceModel.find({}))
})

export default handler
