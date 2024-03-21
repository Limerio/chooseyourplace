import { generateFormFieldInput } from "@/components/functions"
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
	artisticMovements,
	freeOrPay,
	listOfBuildings,
	typesOfBuilding,
} from "@/features/places/utils/constants"
import { generateArray } from "@/utils/functions"

export const barFormFields = ({ t, tUtils }, sub) => [
	{
		name: `${sub ? "bar." : ""}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.bar.typeOf.label")}
				placeholder={t("place.global.typeOf", {
					building: tUtils("buildings.bar"),
				})}
				keyBase="typeOfs.bar"
				list={typesOfBuilding.bar}
			/>
		),
	},
	{
		name: `${sub ? "bar." : ""}averageCost`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{tUtils("place.form.averageCost")}</FormLabel>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder={tUtils("place.form.averageCost")} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{generateArray(5).map(item => (
							<SelectItem value={item} key={item}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		),
	},
]

export const museumFormFields = ({ t, tUtils }, sub) => [
	{
		name: `${sub ? "museum." : ""}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.museum.typeOf.label")}
				placeholder={t("place.global.typeOf", {
					building: tUtils("buildings.museum"),
				})}
				keyBase="typeOfs.museum"
				list={typesOfBuilding.museum}
			/>
		),
	},
	{
		name: `${sub ? "museum." : ""}artisticMovements`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.museum.artisticMovements.label")}
				placeholder={t("place.museum.artisticMovements.placeholder")}
				keyBase="artisticMovements"
				list={artisticMovements}
			/>
		),
	},
	{
		name: `${sub ? "museum." : ""}freeOrPay`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.global.freeOrPay.label")}
				placeholder={t("place.global.freeOrPay.placeholder")}
				keyBase="freeOrPay"
				list={freeOrPay}
			/>
		),
	},
	generateFormFieldInput({
		name: `${sub ? "museum." : ""}price`,
		label: t("place.global.price.label"),
		placeholder: t("place.global.price.placeholder", {
			building: tUtils("buildings.museum"),
		}),
		type: "number",
	}),
]

export const parkFormFields = ({ t, tUtils }, sub) => [
	{
		name: `${sub ? "park." : ""}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Park"
				placeholder={t("place.global.typeOf", {
					building: tUtils("buildings.park"),
				})}
				keyBase="typeOfs.park"
				list={typesOfBuilding.park}
			/>
		),
	},
	{
		name: `${sub ? "park." : ""}public`,
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
		name: `${sub ? "park." : ""}freeOrPay`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.global.freeOrPay.label")}
				placeholder={t("place.global.freeOrPay.placeholder")}
				keyBase="freeOrPay"
				list={freeOrPay}
			/>
		),
	},
	generateFormFieldInput({
		// eslint-disable-next-line max-lines
		name: `${sub ? "park." : ""}price`,
		label: t("place.global.price.label"),
		placeholder: t("place.global.price.placeholder", {
			building: tUtils("buildings.park"),
		}),
		type: "number",
	}),
]

// eslint-disable-next-line max-lines-per-function
export const restaurantFormFields = ({ t, tUtils }, sub) => [
	{
		name: `${sub ? "restaurant." : ""}typeOf`,
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Restaurant"
				placeholder={t("place.global.typeOf", {
					building: tUtils("buildings.restaurant"),
				})}
				keyBase="typeOfs.restaurant"
				list={typesOfBuilding.restaurant}
			/>
		),
	},
	{
		name: `${sub ? "restaurant." : ""}stars`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{tUtils("place.form.stars")}</FormLabel>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder={tUtils("place.form.stars")} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{generateArray(3).map(item => (
							<SelectItem value={item} key={item}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		),
	},
	{
		name: `${sub ? "restaurant." : ""}averageCost`,
		render: ({ field }) => (
			<FormItem>
				<FormLabel>{tUtils("place.form.averageCost")}</FormLabel>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<FormControl>
						<SelectTrigger>
							<SelectValue placeholder={tUtils("place.form.averageCost")} />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{generateArray(5).map(item => (
							<SelectItem value={item} key={item}>
								{item}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		),
	},
]

export const defaultFormFields = (t, tUtils) => [
	{
		name: "building",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label={t("place.defaultForm.building.label")}
				placeholder={t("place.global.typeOf", {
					building: tUtils("buildings.building"),
				})}
				keyBase="buildings"
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
