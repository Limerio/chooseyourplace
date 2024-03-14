import { generateFormFieldInput } from "@/components/functions"
import { Form, FormField } from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { requestGetPlace, requestPutPlace } from "@/features/places/utils/api"
import { buildingForms } from "@/features/places/utils/constants"
import { listOfBuildings } from "@/utils/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
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

export const UpdateForm = ({ id }) => {
	const router = useRouter()
	const { data, isLoading, isError } = useQuery({
		queryKey: ["places", id],
		queryFn: () => requestGetPlace(id),
	})
	const form = useForm({
		resolver: zodResolver(),
		defaultValues: data,
	})

	if (isLoading) {
		return <div className="bg-slate-500">Loading...</div>
	}

	if (isError || data.error) {
		return <div className="bg-red-600">{data.error}</div>
	}

	const onSubmit = async values => {
		await requestPutPlace(id, values)
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
