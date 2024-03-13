import { CreatePlacesForm } from "@/features/places/components/forms"
import Head from "next/head"

const CreatePlacePage = () => (
	<>
		<Head>
			<title>Create a place - chooseyourplace</title>
			<meta name="description" content="Creation page for places" />
		</Head>
		<CreatePlacesForm />
	</>
)

export default CreatePlacePage
