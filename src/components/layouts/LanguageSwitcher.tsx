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
import { LangsType } from "@/utils/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import type { FC } from "react"

export const LanguageSwitcher: FC = () => {
	const { push, pathname, query, locale, locales, asPath } = useRouter()
	const t = useTranslations("Utils")

	function onSelectChange(nextLocale: LangsType) {
		push({ pathname, query }, asPath, { locale: nextLocale })
	}

	return (
		<label className="relative text-gray-400">
			<p className="sr-only">{langs[locale as LangsType]}</p>
			<Select defaultValue={locale} onValueChange={onSelectChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder={langs[locale as LangsType]} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>{t("languages")}</SelectLabel>
						{(locales as LangsType[]).map(local => (
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
