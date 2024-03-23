import { Providers } from "@/components/layouts"
import { Toaster } from "@/components/ui/toaster"
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks")
}

const App = ({ Component, pageProps }) => (
	<Providers {...pageProps}>
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
		<Toaster />
	</Providers>
)

export default App
