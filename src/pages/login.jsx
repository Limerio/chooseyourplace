import { Head } from "@/components/layouts"
import { LoginForm } from "@/features/auth/components/login"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
import { useTranslations } from "next-intl"

export const LoginPage = () => {
	const tPage = useTranslations("LoginPage")

	return (
		<>
			<Head title={tPage("title")} description={tPage("description")} />
			<LoginForm />
		</>
	)
}

LoginPage.messages = ["LoginPage", ...MainLayout.messages]

export default LoginPage

export const getServerSideProps = async ({ locale }) => ({
	props: await serverTranslation(locale, LoginPage),
})
