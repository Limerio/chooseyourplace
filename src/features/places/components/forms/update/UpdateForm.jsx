import { generateFormFieldInput } from "@/components/functions"
import { Form, FormField } from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { requestGetPlace, requestPutPlace } from "@/features/places/utils/api"
import { buildingForms } from "@/features/places/utils/constants"
import { subSchemas, updatePlaceSchema } from "@/schemas"
import { listOfBuildings } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
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

export const UpdateForm = () => {
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data } = useQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestGetPlace(placeId),
	})
	const form = useForm({
		resolver: zodResolver(
			updatePlaceSchema.extend(subSchemas[form.watch("building")]),
		),
		defaultValues: data,
	})
	const onSubmit = async values => {
		await requestPutPlace(placeId, values)
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
				{buildingForms[form.watch("building")]}
			</form>
		</Form>
	)
}
