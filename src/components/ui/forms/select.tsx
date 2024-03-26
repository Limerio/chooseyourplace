import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { InputProps } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { capitalize } from "@/utils/functions"
import { ReadonlyStringArray } from "@/utils/types"
import { useTranslations } from "next-intl"
import { FC } from "react"

type FormFieldSelectType = {
	keyBase: string
	placeholder: string
	field: InputProps
	label: string
	list: ReadonlyStringArray
}

export const FormFieldSelect: FC<FormFieldSelectType> = ({
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
							{capitalize(tUtils(`${keyBase}.${item}`))}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormMessage />
		</FormItem>
	)
}
