import { generateFormFieldInput } from "@/components/functions"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { ToastAction } from "@/components/ui/toast"
import { registerSchema } from "@/features/auth/schemas/register"
import { requestPostAuthRegister } from "@/features/auth/utils/api"
import { useToast } from "@/hooks/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

const fields = t => [
	generateFormFieldInput({
		name: "username",
		placeholder: t("form.username.placeholder"),
		label: t("form.username.label"),
	}),
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
	generateFormFieldInput({
		name: "confirmPassword",
		placeholder: t("form.confirmPassword.placeholder"),
		label: t("form.confirmPassword.label"),
		type: "password",
	}),
]

export const RegisterForm = () => {
	const tPage = useTranslations("RegisterPage")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const { toast } = useToast()
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})
	const onSubmit = async values => {
		try {
			await requestPostAuthRegister(values)
			router.push("/")
			toast({
				title: "Check your email",
				description: "An email was send to verify your account",
			})
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
				<Button type="submit">{tUtils("register")}</Button>
			</form>
		</Form>
	)
}
