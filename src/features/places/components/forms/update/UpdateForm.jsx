import { generateFormFieldInput } from "@/components/functions"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { usePlace } from "@/features/places/hooks"
import { requestPutPlace } from "@/features/places/utils/api"
import {
	barFormFields,
	museumFormFields,
	parkFormFields,
	restaurantFormFields,
} from "@/features/places/utils/fields"
import { updatePlaceSchema, updateSubSchemas } from "@/schemas"
import { listOfBuildings } from "@/utils/constants"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

const defaultFormFields = [
	{
		name: "building",
		render: ({ field }) => (
			<FormFieldSelect
				field={field}
				label="Building"
				placeholder="Select a type of building"
				list={listOfBuildings}
			/>
		),
	},
	generateFormFieldInput({
		name: "name",
		placeholder: "Name of the building....",
		label: "Name",
	}),
	generateFormFieldInput({
		name: "city",
		placeholder: "Which city are the building ?",
		label: "City",
	}),
	generateFormFieldInput({
		name: "zipcode",
		placeholder: "What is the zipcode ?",
		label: "Zipcode",
	}),
	generateFormFieldInput({
		name: "country",
		placeholder: "Which country are the building ?",
		label: "Country",
	}),
]
const subForms = {
	bar: barFormFields,
	museum: museumFormFields,
	restaurant: restaurantFormFields,
	park: parkFormFields,
}

export const UpdateForm = () => {
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data } = usePlace(placeId)
	const form = useForm({
		defaultValues: data,
	})
	const onSubmit = async values => {
		switch (values.building) {
			case "bar":
				values.bar.averageCost = values.bar.averageCost[0]

				break

			case "restaurant":
				values.restaurant.averageCost = values.restaurant.averageCost[0]
				values.restaurant.stars = values.restaurant.stars[0]

				break
		}

		await updatePlaceSchema
			.merge(updateSubSchemas[values.building])
			.parseAsync(values)
		const datad = await requestPutPlace(placeId, values)
		console.log(datad)
		router.push("/")
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				{defaultFormFields.map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				{subForms[form.watch("building")](true).map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				<Button type="submit">Update</Button>
			</form>
		</Form>
	)
}
