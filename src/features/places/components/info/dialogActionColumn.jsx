import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Link } from "@/components/ui/link"
import { DeleteDialogValidation } from "@/features/places/components/delete/dialogValidation"
import { PlaceDetails } from "@/features/places/components/info"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon, EnterFullScreenIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"

export const DialogActionColumn = ({ place }) => {
	const t = useTranslations("HomePage")
	const tUtils = useTranslations("Utils")

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">{t("table.columns.actions.open")}</span>
					<DotsHorizontalIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{t("table.columns.actions.title", { name: place.name })}
					</DialogTitle>
				</DialogHeader>
				<PlaceDetails place={place} />
				<DialogFooter>
					<Button>
						<DialogClose asChild>
							<Link
								href={`/places/${place._id}`}
								className="flex items-center gap-1.5 w-full h-full"
							>
								<EnterFullScreenIcon />
								{t("table.columns.actions.close")}
							</Link>
						</DialogClose>
					</Button>
					<DeleteDialogValidation reload placeId={place._id}>
						<Button variant="destructive">{tUtils("delete")}</Button>
					</DeleteDialogValidation>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
