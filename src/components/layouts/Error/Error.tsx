import type { ReactChildren } from "@/utils/types"
import { useTranslations } from "next-intl"
import type { FC } from "react"

type ErrorHandlerProps = {
	isError: boolean
}

export const ErrorHandler: FC<ReactChildren<ErrorHandlerProps>> = ({
	isError,
	children,
}) => {
	const t = useTranslations("ErrorHandler")

	if (isError) {
		return <div className="bg-red-600 rounded p-4">{t("text")}</div>
	}

	return children
}

ErrorHandler.messages = ["ErrorHandler"]
