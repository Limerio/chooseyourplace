import { generateFormFieldInput } from "@/components/functions"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { Switch } from "@/components/ui/switch"
import { MenuForm } from "@/features/places/components/forms/create"
import { useMultiStepsForm } from "@/hooks/forms"
import { parkSchema } from "@/schemas/Park"
import { typesOfBuilding } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const museumFormFields = [
	{
		name: "typeOf",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Park"
				placeholder="Select a type of park"
				list={typesOfBuilding.park}
			/>
		),
	},
	{
		name: "public",
		render: ({ field }) => (
			<FormItem>
				<FormLabel>Public ?</FormLabel>
				<FormControl>
					<Switch onChangeValue={field.onChange} />
				</FormControl>
				<FormMessage />
			</FormItem>
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

export const ParkForm = () => {
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(parkSchema),
		defaultValues: {
			typeOf: "",
			public: false,
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
