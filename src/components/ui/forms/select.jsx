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
import { capitalize } from "@/utils/functions"
import { useTranslations } from "next-intl"

export const FormFieldSelect = ({
	keyBase,
	label,
	field,
	list,
	placeholder,
}) => {
	const tUtils = useTranslations("Utils")

	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<Select onValueChange={field.onChange} defaultValue={field.value}>
				<FormControl>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					{list.map(item => (
						<SelectItem value={item} key={item}>
							{capitalize(tUtils(`${keyBase}.${item}`)).replace("_", " ")}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormMessage />
		</FormItem>
	)
}
