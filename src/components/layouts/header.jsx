import { Logo } from "@/components/Logo"
import { MenuTheme } from "@/components/layouts/MenuTheme"
import { Button } from "@/components/ui/button"

export const Header = () => (
	<header className="w-full p-4 flex items-center justify-evenly">
		<div className="flex items-center gap-2">
			<Logo />
			<span className="font-bold select-none">Chooseyourplace</span>
		</div>
		<div className="flex items-center gap-3">
			<Button>Add</Button>
			<MenuTheme />
		</div>
	</header>
)
