import { generateFormFieldInput } from "@/components/functions"
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { artisticMovements, typesOfBuilding } from "@/utils/constants"

export const barFormFields = [
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

export const museumFormFields = [
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

export const parkFormFields = [
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

export const restaurantFormFields = [
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
		// eslint-disable-next-line max-lines
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
