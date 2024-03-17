import { Form, FormField } from "@/components/ui/form"
import { MenuForm } from "@/features/places/components/forms/create"
import { restaurantFormFields } from "@/features/places/utils/fields"
import { useMultiStepsForm } from "@/hooks/forms"
import { restaurantSchema } from "@/schemas/Restaurant"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const RestaurantForm = () => {
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(restaurantSchema),
		defaultValues: {
			typeOf: "",
			stars: 0,
			averageCost: 0,
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
				{restaurantFormFields().map(formField => (
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
