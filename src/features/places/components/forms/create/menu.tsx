import { Button } from "@/components/ui/button"
import { useMultiStepsForm } from "@/hooks/forms"
import { useTranslations } from "next-intl"

export const MenuForm = () => {
	const t = useTranslations("Utils")
	const { back } = useMultiStepsForm()

	return (
		<div className="flex items-center gap-2">
			<Button className="w-full" onClick={() => back()}>
				{t("previous")}
			</Button>
			<Button className="w-full" type="submit">
				{t("next")}
			</Button>
		</div>
	)
}
