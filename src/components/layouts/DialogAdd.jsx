import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
import { EnterFullScreenIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const DialogAdd = () => {
	const t = useTranslations("DialogAdd")
	const tUtils = useTranslations("Utils")

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("add_button")}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{t("dialog.title")}</DialogTitle>
				</DialogHeader>
				<CreatePlacesForm />
				<DialogFooter>
					<Button variant="destructive">
						<DialogClose asChild>
							<Link href="/places/create" className="flex items-center gap-1.5">
								<EnterFullScreenIcon />
								{tUtils("fullScreenMode")}
							</Link>
						</DialogClose>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

DialogAdd.messages = ["DialogAdd", "Utils", ...CreatePlacesForm.messages]
