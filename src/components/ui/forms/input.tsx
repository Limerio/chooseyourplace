import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import type { FC } from "react"

type FormFieldInputType = {
	placeholder: string
	field: InputProps
	label: string
}

export const FormFieldInput: FC<FormFieldInputType> = ({
	placeholder,
	field,
	label,
}) => (
	<FormItem>
		<FormLabel>{label}</FormLabel>
		<FormControl>
			<Input placeholder={placeholder} {...field} />
		</FormControl>
		<FormMessage />
	</FormItem>
)
