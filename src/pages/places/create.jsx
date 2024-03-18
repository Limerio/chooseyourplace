import { Head } from "@/components/layouts"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
import { serverTranslation } from "@/utils/functions"

const CreatePlacePage = () => (
	<>
		<Head
			title="Create a place - chooseyourplace"
			description="Creation page for places"
		/>
		<CreatePlacesForm />
	</>
)

CreatePlacePage.messages = ["CreatePlacePage", ...CreatePlacesForm.messages]

export default CreatePlacePage

export function getStaticProps({ locale }) {
	return {
		props: serverTranslation(locale, CreatePlacePage),
	}
}
