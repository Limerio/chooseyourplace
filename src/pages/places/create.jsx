import { Head } from "@/components/layouts"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
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

CreatePlacePage.messages = ["CreatePlacePage", ...CreatePlacesForm.messages]

export default CreatePlacePage

export function getStaticProps({ locale }) {
	return {
		props: serverTranslation(locale, CreatePlacePage),
	}
}
