import { Logo } from "@/components/Logo"
import { Link } from "@/components/ui/link"

const LINKS = []

export const Header = () => (
	<header>
		<Logo />
		<nav>
			<div className="flex items-center gap-3">
				{LINKS.map(link => (
					<Link key={link.href} {...link} />
				))}
			</div>
		</nav>
	</header>
)
