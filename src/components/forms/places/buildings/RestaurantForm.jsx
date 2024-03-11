import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { Slider } from "@/components/ui/slider"
import { useMultiStepsForm } from "@/hooks/forms"
import { restaurantSchema } from "@/schemas/Restaurant"
import { typesOfBuilding } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const restaurantFormFields = [
	{
		name: "typeOf",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Restaurant"
				placeholder="Select a type of restaurant"
				list={typesOfBuilding.restaurant}
			/>
		),
	},
	{
		name: "stars",
		render: ({ field }) => (
			<FormItem>
				<FormLabel>Stars</FormLabel>
				<FormControl>
					<Slider
						onValueChange={field.onChange}
						defaultValue={[0]}
						max={3}
						step={1}
					/>
				</FormControl>
			</FormItem>
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

export const RestaurantForm = () => {
	const { next, addDataForm, back } = useMultiStepsForm()
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
				{restaurantFormFields.map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				<div className="flex items-center gap-2">
					<Button className="w-full" onClick={() => back()}>
						Previous
					</Button>
					<Button className="w-full" type="submit">
						Next
					</Button>
				</div>
			</form>
		</Form>
	)
}
