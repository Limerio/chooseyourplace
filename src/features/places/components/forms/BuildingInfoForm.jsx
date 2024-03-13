import { useMultiStepsForm } from "@/hooks/forms"
import { BarForm, MuseumForm, ParkForm, RestaurantForm } from "./buildings"

const buildingForms = {
	bar: <BarForm />,
	museum: <MuseumForm />,
	restaurant: <RestaurantForm />,
	park: <ParkForm />,
}

export const BuildingInfoForm = () => {
	const { formsData } = useMultiStepsForm()

	return buildingForms[formsData[0].data.building]
}
