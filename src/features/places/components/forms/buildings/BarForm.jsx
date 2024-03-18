import { Form, FormField } from "@/components/ui/form"
import { MenuForm } from "@/features/places/components/forms/create"
import { barSchema } from "@/features/places/schemas/Bar"
import { barFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const defaultValues = {
	typeOf: "",
	averageCost: 0,
}

export const BarForm = ({ data }) => {
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(barSchema),
		defaultValues: data ?? defaultValues,
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
				{barFormFields().map(formField => (
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
