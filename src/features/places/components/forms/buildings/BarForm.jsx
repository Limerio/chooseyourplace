import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { Slider } from "@/components/ui/slider"
import { MenuForm } from "@/features/places/components/forms"
import { useMultiStepsForm } from "@/hooks/forms"
import { barSchema } from "@/schemas/Bar"
import { typesOfBuilding } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const barFormFields = [
	{
		name: "typeOf",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Bar"
				placeholder="Select a type of bar"
				list={typesOfBuilding.bar}
			/>
		),
	},
	{
		name: "averageCost",
		render: ({ field }) => (
			<FormItem>
				<FormLabel>Average Cost</FormLabel>
				<FormControl>
					<Slider
						onValueChange={field.onChange}
						defaultValue={[0]}
						max={5}
						step={1}
					/>
				</FormControl>
			</FormItem>
		),
	},
]

export const BarForm = () => {
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(barSchema),
		defaultValues: {
			typeOf: "",
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
				{barFormFields.map(formField => (
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
