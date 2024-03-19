import { Head } from "@/components/layouts"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions"
import { useTranslations } from "next-intl"

const CreatePlacePage = () => {
	const t = useTranslations("CreatePlace")

	return (
		<>
			<Head
				title={`${t("title")} - chooseyourplace`}
				description={t("description")}
			/>
			<CreatePlacesForm />
		</>
	)
}

CreatePlacePage.messages = [
	"CreatePlace",
	...MainLayout.messages,
	...CreatePlacesForm.messages,
]

export default CreatePlacePage

export async function getStaticProps({ locale }) {
	return {
		props: await serverTranslation(locale, CreatePlacePage),
	}
}
