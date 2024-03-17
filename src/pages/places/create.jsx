import { Head } from "@/components/layouts"
import { CreatePlacesForm } from "@/features/places/components/forms/create"

const CreatePlacePage = () => (
	<>
		<Head
			title="Create a place - chooseyourplace"
			description="Creation page for places"
		/>
		<CreatePlacesForm />
	</>
)

export default CreatePlacePage
