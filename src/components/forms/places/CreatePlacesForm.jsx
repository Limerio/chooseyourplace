import {
	BuildingInfoForm,
	DefaultForm,
	FinalStep,
} from "@/components/forms/places"
import { MultiStepProvider } from "@/context/forms"

export const CreatePlacesForm = () => (
	<MultiStepProvider
		steps={[
			<DefaultForm key="default-form" />,
			<BuildingInfoForm key="buildinginfoform" />,
			<FinalStep key="final-step" />,
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
