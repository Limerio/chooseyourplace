import { FormFieldInput } from "@/components/ui/forms"
import { InputProps } from "@/components/ui/input"

type GenerateFormFieldInputOptions = InputProps & {
	name: string
	label: string
}

export const generateFormFieldInput = ({
	name,
	...fieldInputProps
}: GenerateFormFieldInputOptions) => ({
	name,
	render: ({ field }) => <FormFieldInput field={field} {...fieldInputProps} />,
})
