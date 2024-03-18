import {
	BarForm,
	MuseumForm,
	ParkForm,
	RestaurantForm,
} from "@/features/places/components/forms/buildings"
import { useMultiStepsForm } from "@/hooks/forms"

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
