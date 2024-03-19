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
	listOfBuildings,
	typesOfBuilding,
} from "@/features/places/utils/constants"

export const barFormFields = (t, sub) => [
	{
		name: `${sub && "bar."}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.bar.typeOf.label")}
				placeholder={t("place.global.typeOf", { building: "bar" })}
				list={typesOfBuilding.bar}
			/>
		),
	},
	{
		name: `${sub && "bar."}averageCost`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{t("place.global.averageCost")}</FormLabel>
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

export const museumFormFields = (t, sub) => [
	{
		name: `${sub && "museum."}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.museum.typeOf.label")}
				placeholder={t("place.global.typeOf", { building: "museum" })}
				list={typesOfBuilding.museum}
			/>
		),
	},
	{
		name: `${sub && "museum."}artisticMovements`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.museum.artisticMovements.label")}
				placeholder={t("place.museum.artisticMovements.placeholder")}
				list={artisticMovements}
			/>
		),
	},
	{
		name: `${sub && "museum."}freeOrPay`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.global.freeOrPay.label")}
				placeholder={t("place.global.freeOrPay.placholder")}
				list={t("place.global.freeOrPay.list")}
			/>
		),
	},
	generateFormFieldInput({
		name: `${sub && "museum."}price`,
		label: t("place.global.price.label"),
		placeholder: t("place.global.price.placeholder", { building: "museum" }),
		type: "number",
	}),
]

export const parkFormFields = (t, sub) => [
	{
		name: `${sub && "park."}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Park"
				placeholder={t("place.global.typeOf", { building: "park" })}
				list={typesOfBuilding.park}
			/>
		),
	},
	{
		name: `${sub && "park."}public`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{t("place.park.public.label")}</FormLabel>
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
				label={t("place.global.freeOrPay.label")}
				placeholder={t("place.global.freeOrPay.placholder")}
				list={t("place.global.freeOrPay.list")}
			/>
		),
	},
	generateFormFieldInput({
		name: `${sub && "park."}price`,
		label: t("place.global.price.label"),
		placeholder: t("place.global.price.placeholder", { building: "park" }),
		type: "number",
	}),
]

export const restaurantFormFields = (t, sub) => [
	{
		name: `${sub && "restaurant."}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Restaurant"
				placeholder={t("place.global.typeOf", { building: "restaurant" })}
				list={typesOfBuilding.restaurant}
			/>
		),
	},
	{
		name: `${sub && "restaurant."}stars`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{t("place.restaurant.stars.label")}</FormLabel>
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
				<FormLabel>{t("place.global.averageCost")}</FormLabel>
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

export const defaultFormFields = t => [
	{
		name: "building",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.defaultForm.building.label")}
				placeholder={t("place.global.typeOf", { building: "building" })}
				list={listOfBuildings}
			/>
		),
	},
	generateFormFieldInput({
		name: "name",
		placeholder: t("place.defaultForm.name.placeholder"),
		label: t("place.defaultForm.name.label"),
	}),
	generateFormFieldInput({
		name: "city",
		placeholder: t("place.defaultForm.city.placeholder"),
		label: t("place.defaultForm.city.label"),
	}),
	generateFormFieldInput({
		name: "zipcode",
		placeholder: t("place.defaultForm.zipcode.placeholder"),
		label: t("place.defaultForm.zipcode.label"),
	}),
	generateFormFieldInput({
		name: "country",
		placeholder: t("place.defaultForm.country.placeholder"),
		label: t("place.defaultForm.country.label"),
	}),
]
