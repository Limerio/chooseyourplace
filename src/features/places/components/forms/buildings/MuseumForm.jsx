import { generateFormFieldInput } from "@/components/functions"
import { Form, FormField } from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { MenuForm } from "@/features/places/components/forms"
import { useMultiStepsForm } from "@/hooks/forms"
import { museumSchema } from "@/schemas/Museum"
import { artisticMovements, typesOfBuilding } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const museumFormFields = [
	{
		name: "typeOf",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Museum"
				placeholder="Select a type of museum"
				list={typesOfBuilding.museum}
			/>
		),
	},
	{
		name: "artisticMovements",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Artistic movements"
				placeholder="Select an artistic movement"
				list={artisticMovements}
			/>
		),
	},
	{
		name: "freeOrPay",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Free or Pay ?"
				placeholder="Choose between free or pay"
				list={["free", "pay"]}
			/>
		),
	},
	generateFormFieldInput({
		name: "price",
		label: "Price",
		placeholder: "Give the price of the museum",
		type: "number",
	}),
]

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
				{museumFormFields.map(formField => (
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
