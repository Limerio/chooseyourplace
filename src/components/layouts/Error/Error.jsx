import { useTranslations } from "next-intl"

export const ErrorHandler = ({ isError, children }) => {
	const t = useTranslations("ErrorHandler")

	if (isError) {
		return <div className="bg-red-600 rounded p-4">{t("text")}</div>
	}

	return children
}

ErrorHandler.messages = ["ErrorHandler"]
