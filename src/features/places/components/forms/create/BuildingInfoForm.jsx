import { buildingForms } from "@/features/places/utils/constants"
import { useMultiStepsForm } from "@/hooks/forms"

export const BuildingInfoForm = () => {
	const { formsData } = useMultiStepsForm()

	return buildingForms[formsData[0].data.building]
}
