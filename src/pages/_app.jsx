import { Providers } from "@/components/layouts"
import { Toaster } from "@/components/ui/toaster"
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"

if (process.env.NODE_ENV === "test") {
	import("./mocks").then(({ setupMocks }) => {
		setupMocks()
	})
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
