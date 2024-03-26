import { Header } from "@/components/layouts"
import { ReactChildren } from "@/utils/types"
import type { FC } from "react"

export const MainLayout: FC<ReactChildren> = ({ children }) => (
	<div className="h-screen flex flex-col">
		<Header />
		<main className="flex flex-col items-center">{children}</main>
	</div>
)

MainLayout.messages = [...Header.messages]
