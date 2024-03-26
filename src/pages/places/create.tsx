import { Head } from "@/components/layouts"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
import { useTranslations } from "next-intl"

const CreatePlacePage = () => {
	const t = useTranslations("CreatePlacePage")

	return (
		<>
			<Head title={t("title")} description={t("description")} />
			<CreatePlacesForm />
		</>
	)
}

CreatePlacePage.messages = [
	"CreatePlacePage",
	...MainLayout.messages,
	...CreatePlacesForm.messages,
]

export default CreatePlacePage

export const getStaticProps = async ({ locale }) => ({
	props: await serverTranslation(locale, CreatePlacePage),
})
