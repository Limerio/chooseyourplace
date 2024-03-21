import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const FormFieldInput = ({ placeholder, field, label }) => (
	<FormItem>
		<FormLabel>{label}</FormLabel>
		<FormControl>
			<Input placeholder={placeholder} {...field} />
		</FormControl>
		<FormMessage />
	</FormItem>
)
