import { createPlaceSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { FormFieldSelect } from "@/components/ui/forms"
import { useMultiStepsForm } from "@/hooks/forms"
import { listOfBuildings } from "@/utils/constants"
import { generateFormFieldInput } from "@/utils/functions"
import { faker } from "@faker-js/faker"

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

export const DefaultForm = () => {
	const { next, addDataForm } = useMultiStepsForm()
	const form = useForm({
		resolver: zodResolver(createPlaceSchema),
		defaultValues: {
			building: "",
			name: faker.company.name(),
			zipcode: faker.location.zipCode(),
			country: faker.location.country(),
			city: faker.location.city(),
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
				{defaultFormFields.map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				<Button type="submit">Next</Button>
			</form>
		</Form>
	)
}
