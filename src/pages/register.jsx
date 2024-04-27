import { Head } from "@/components/layouts"
import { RegisterForm } from "@/features/auth/components/register"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
import { useTranslations } from "next-intl"

export const RegisterPage = () => {
	const tPage = useTranslations("RegisterPage")

	return (
		<>
			<Head title={tPage("title")} description={tPage("description")} />
			<RegisterForm />
		</>
	)
}

RegisterPage.messages = ["RegisterPage", ...MainLayout.messages]

export default RegisterPage

export const getServerSideProps = async ({ locale }) => ({
	props: await serverTranslation(locale, RegisterPage),
})
