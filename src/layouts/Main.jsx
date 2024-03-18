import { Header } from "@/components/layouts"

export const MainLayout = ({ children }) => (
	<div className="h-screen flex flex-col">
		<Header />
		<main className="flex flex-col items-center">{children}</main>
	</div>
)

MainLayout.messages = [...Header.messages]
