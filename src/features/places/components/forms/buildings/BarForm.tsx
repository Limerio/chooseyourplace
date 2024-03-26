import { Form, FormField } from "@/components/ui/form"
import { MenuForm } from "@/features/places/components/forms/create"
import { barSchema } from "@/features/places/schemas/Bar"
import { barFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

const defaultValues = {
	typeOf: "",
	averageCost: "",
}

export const BarForm = ({ data }) => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(barSchema),
		defaultValues: data || defaultValues,
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
				{barFormFields({ t: tForms, tUtils }).map(field => (
					<FormField key={field.name} control={form.control} {...field} />
				))}
				<MenuForm />
			</form>
		</Form>
	)
}
