import { Providers } from "@/components/layouts"
import { Toaster } from "@/components/ui/toaster"
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks")
}

const App = ({ Component, pageProps }: AppProps) => (
	<Providers {...pageProps}>
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
		<Toaster />
	</Providers>
)

export default App
