import { generateFormFieldInput } from "@/components/functions"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { ToastAction } from "@/components/ui/toast"
import { loginSchema } from "@/features/auth/schemas/login"
import { requestPostAuthLogin } from "@/features/auth/utils/api"
import { useToast } from "@/hooks/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

const fields = t => [
	generateFormFieldInput({
		name: "email",
		placeholder: t("form.email.placeholder"),
		label: t("form.email.label"),
		type: "email",
	}),
	generateFormFieldInput({
		name: "password",
		placeholder: t("form.password.placeholder"),
		label: t("form.password.label"),
		type: "password",
	}),
]

export const LoginForm = () => {
	const queryClient = useQueryClient()
	const tPage = useTranslations("LoginPage")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})
	const onSubmit = async values => {
		try {
			await requestPostAuthLogin(values)
			await queryClient.refetchQueries({
				queryKey: ["users", "me"],
				exact: true,
			})
			router.push("/")
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: "There was a problem with your request.",
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			})
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-1/2"
			>
				{fields(tPage).map(field => (
					<FormField key={field.name} control={form.control} {...field} />
				))}
				<Button type="submit">{tUtils("login")}</Button>
			</form>
		</Form>
	)
}
