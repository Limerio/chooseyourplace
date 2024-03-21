import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { langs } from "@/utils/constants"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"

export const LanguageSwitcher = () => {
	const { push, pathname, query, locale, locales, asPath } = useRouter()
	const t = useTranslations("Utils")

	function onSelectChange(nextLocale) {
		push({ pathname, query }, asPath, { locale: nextLocale })
	}

	return (
		<label className={"relative text-gray-400"}>
			<p className="sr-only">{langs[locale]}</p>
			<Select defaultValue={locale} onValueChange={onSelectChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={langs[locale]} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{t("languages")}</SelectLabel>
						{locales.map(local => (
							<SelectItem key={local} value={local}>
								{langs[local]}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</label>
	)
}
