import { Logo } from "@/components/layouts"
import { MenuTheme } from "@/components/layouts/MenuTheme"
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
import { Link } from "@/components/ui/link"
import { CreatePlacesForm } from "@/features/places/components/forms/create"
import { EnterFullScreenIcon } from "@radix-ui/react-icons"
import { useTranslations } from "next-intl"

export const Header = () => {
	const t = useTranslations("Header")

	return (
		<header className="w-full p-4 flex items-center justify-evenly">
			<Link href="/">
				<Logo />
			</Link>
			<div className="flex items-center gap-3">
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
									<Link
										href="/places/create"
										className="flex items-center gap-1.5"
									>
										<EnterFullScreenIcon />
										{t("dialog.close")}
									</Link>
								</DialogClose>
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<MenuTheme />
			</div>
		</header>
	)
}

Header.messages = ["Header", ...MenuTheme.messages]
