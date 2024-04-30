import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FormFieldInput = ({
	placeholder,
	field,
	label,
	type = "text",
}) => (
	<FormItem>
		<FormLabel>{label}</FormLabel>
		<FormControl>
			<Input placeholder={placeholder} type={type} {...field} />
		</FormControl>
		<FormMessage />
	</FormItem>
)
