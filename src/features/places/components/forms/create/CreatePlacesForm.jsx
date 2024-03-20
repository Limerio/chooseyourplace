import { MultiStepProvider } from "@/context/forms"
import {
	BuildingInfoForm,
	DefaultForm,
	FinalStep,
} from "@/features/places/components/forms/create"

export const CreatePlacesForm = () => (
	<MultiStepProvider
		steps={[
			<DefaultForm key="defaultForm" />,
			<BuildingInfoForm key="buildingInfoForm" />,
			<FinalStep key="finalStep" />,
		]}
	>
		{(pageNumber, steps, actualStep) => (
			<div className="flex flex-col w-full container mx-auto gap-2">
				<span className="text-right">
					{pageNumber} / {steps.length}
				</span>
				{actualStep}
			</div>
		)}
	</MultiStepProvider>
)

CreatePlacesForm.messages = ["CreatePlace", "Forms", "Utils"]
