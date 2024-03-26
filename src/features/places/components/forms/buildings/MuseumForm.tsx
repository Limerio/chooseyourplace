import { Form, FormField } from "@/components/ui/form"
import { MenuForm } from "@/features/places/components/forms/create"
import { museumSchema } from "@/features/places/schemas/Museum"
import { museumFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

export const MuseumForm = () => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(museumSchema),
		defaultValues: {
			typeOf: "",
			artisticMovements: "",
			freeOrPay: "",
			price: 0,
		},
	})
	const onSubmit = values => {
		addDataForm(values)
		next()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				{museumFormFields({ t: tForms, tUtils }).map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				<MenuForm />
			</form>
		</Form>
	)
}
