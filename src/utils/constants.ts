import { LangsType } from "@/utils/types"
import type { DateTimeFormatOptions } from "next-intl"

export const defaultOptionsDate: DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
	minute: "2-digit",
	hour: "2-digit",
}

export const langs: Record<LangsType, string> = {
	en: "English",
	fr: "Français",
}
