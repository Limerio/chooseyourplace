import { placeSchema } from "@/features/places/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { defaultFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"
import { useTranslations } from "next-intl"
import { FC } from "react"
import { z } from "zod"

export const DefaultForm: FC = () => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm<z.infer<typeof placeSchema>>({
		resolver: zodResolver(placeSchema),
		defaultValues: {
			building: "",
			name: "",
			zipcode: "",
			country: "",
			city: "",
		},
	})
	const onSubmit = (values: z.infer<typeof placeSchema>) => {
		addDataForm(values)
		next()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				{defaultFormFields(tForms, tUtils).map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				<Button type="submit">{tUtils("next")}</Button>
			</form>
		</Form>
	)
}
