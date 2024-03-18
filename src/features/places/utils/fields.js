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
import {
	artisticMovements,
	typesOfBuilding,
} from "@/features/places/utils/constants"

export const barFormFields = sub => [
	{
		name: `${sub && "bar."}typeOf`,
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
		name: `${sub && "bar."}averageCost`,
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

export const museumFormFields = sub => [
	{
		name: `${sub && "museum."}typeOf`,
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
		name: `${sub && "museum."}artisticMovements`,
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
		name: `${sub && "museum."}freeOrPay`,
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
		name: `${sub && "museum."}price`,
		label: "Price",
		placeholder: "Give the price of the museum",
		type: "number",
	}),
]

export const parkFormFields = sub => [
	{
		name: `${sub && "park."}typeOf`,
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
		name: `${sub && "park."}public`,
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
		name: `${sub && "park."}freeOrPay`,
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
		name: `${sub && "park."}price`,
		label: "Price",
		placeholder: "Give the price of the museum",
		type: "number",
	}),
]

export const restaurantFormFields = sub => [
	{
		name: `${sub && "restaurant."}typeOf`,
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
		name: `${sub && "restaurant."}stars`,
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
		name: `${sub && "restaurant."}averageCost`,
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
