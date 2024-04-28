import { Head } from "@/components/layouts"
import { ContentVerify } from "@/features/auth/components/verify"
import { verifyQuerySchema } from "@/features/auth/schemas/verify"
import { requestGetVerifyToken } from "@/features/auth/utils/api"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
import { useTranslations } from "next-intl"

export const VerifyPage = ({ exists }) => {
	const tPage = useTranslations("VerifyPage")

	return (
		<>
			<Head title={tPage("title")} description={tPage("description")} />
			{exists ? <ContentVerify /> : <>Unknown token</>}
		</>
	)
}

VerifyPage.messages = ["VerifyPage", ...MainLayout.messages]

export default VerifyPage

export const getServerSideProps = async ({ query, locale }) => {
	try {
		const { token } = await verifyQuerySchema.parseAsync(query)
		const { exists } = await requestGetVerifyToken(token)

		return {
			props: {
				exists,
				...(await serverTranslation(locale, VerifyPage)),
			},
		}
	} catch (error) {
		return {
			props: {
				exists: false,
				...(await serverTranslation(locale, VerifyPage)),
			},
		}
	}
}
