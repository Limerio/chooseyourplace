import { Logo } from "@/components/Logo"
import { CreatePlacesForm } from "@/components/forms/places"
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
import { EnterFullScreenIcon } from "@radix-ui/react-icons"

export const Header = () => (
	<header className="w-full p-4 flex items-center justify-evenly">
		<Link href="/">
			<Logo />
		</Link>
		<div className="flex items-center gap-3">
			<Dialog>
				<DialogTrigger asChild>
					<Button>Add</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create a place</DialogTitle>
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
									Full screen mode
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
