import { Form, FormField } from "@/components/ui/form"
import { MenuForm } from "@/features/places/components/forms/create"
import { museumFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"
import { museumSchema } from "@/schemas/Museum"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const MuseumForm = () => {
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
				{museumFormFields().map(formField => (
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
