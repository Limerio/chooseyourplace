import { Button } from "@/components/ui/button"
import { requestPatchVerifyToken } from "@/features/auth/utils/api"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useState } from "react"

export const ContentVerify = () => {
	const tPage = useTranslations("VerifyPage")
	const router = useRouter()
	const [visible, setVisible] = useState(false)
	const verifyHandle = () => async () => {
		await requestPatchVerifyToken(router.query.token)
		setVisible(true)
		setTimeout(() => {
			router.push("/login")
		}, 5000)
	}

	return (
		<div className="flex flex-col gap-2 items-center">
			<h1 className="text-3xl font-bold">{tPage("content.title")}</h1>
			{visible ? (
				tPage("content.redirection")
			) : (
				<Button onClick={verifyHandle()}>{tPage("content.button")}</Button>
			)}
		</div>
	)
}
