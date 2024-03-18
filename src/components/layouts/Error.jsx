import { useTranslations } from "next-intl"

export const Error = ({ isError, children }) => {
	const t = useTranslations("Error")

	if (isError) {
		return <div className="bg-red-600">{t("text")}</div>
	}

	return children
}

Error.messages = ["Error"]
