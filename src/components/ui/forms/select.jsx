import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export const FormFieldSelect = ({ label, field, list, placeholder }) => (
	<FormItem>
		<FormLabel>{label}</FormLabel>
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<FormControl>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</FormControl>
			<SelectContent>
				{list.map(building => (
					<SelectItem value={building} key={building}>
						{building}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
		<FormMessage />
	</FormItem>
)
