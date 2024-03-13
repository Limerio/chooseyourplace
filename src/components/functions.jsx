import { FormFieldInput } from "@/components/ui/forms"

export const generateFormFieldInput = ({ name, ...fieldInputProps }) => ({
	name,
	render: ({ field }) => <FormFieldInput field={field} {...fieldInputProps} />,
})
