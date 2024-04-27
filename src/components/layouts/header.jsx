import { Logo } from "@/components/layouts"
import { DialogAdd } from "@/components/layouts/DialogAdd"
import { LanguageSwitcher } from "@/components/layouts/LanguageSwitcher"
import { MenuTheme } from "@/components/layouts/MenuTheme"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { requestDeleteAuthLogout } from "@/features/auth/utils/api"
import { useUser } from "@/features/users/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

const navRightItems = tUtils => [
	{
		href: "/login",
		children: tUtils("login"),
	},
	{
		href: "/register",
		children: tUtils("register"),
	},
]

export const Header = () => {
	const queryClient = useQueryClient()
	const tUtils = useTranslations("Utils")
	const { data } = useUser()
	const logout = () => async () => {
		await requestDeleteAuthLogout()
		await queryClient.refetchQueries({
			queryKey: ["users", "me"],
			exact: true,
		})
	}

	return (
		<header className="w-full p-4 flex items-center justify-evenly">
			<Link href="/">
				<Logo />
			</Link>
			<div className="flex items-center gap-3">
				<LanguageSwitcher />
				{!data?.username ? (
					navRightItems(tUtils).map(navRightItem => (
						<Link key={navRightItem.href} href={navRightItem.href}>
							<Button className="flex items-center w-full h-full gap-1.5">
								{navRightItem.children}
							</Button>
						</Link>
					))
				) : (
					<>
						<DialogAdd />
						<Button onClick={logout()} variant="destructive">
							{tUtils("logout")}
						</Button>
					</>
				)}
				<MenuTheme />
			</div>
		</header>
	)
}

Header.messages = [...MenuTheme.messages, ...DialogAdd.messages]
