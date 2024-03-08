import { Header } from "@/components/layouts"

export const MainLayout = ({ children }) => (
	<div className="h-screen flex flex-col">
		<Header />
		<main>{children}</main>
	</div>
)
