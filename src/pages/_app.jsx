import { Providers } from "@/components/layouts"
import { Toaster } from "@/components/ui/toaster"
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"

const App = ({ Component, pageProps }) => (
	<Providers {...pageProps}>
		<MainLayout>
			<Component {...pageProps} />
		</MainLayout>
		<Toaster />
	</Providers>
)

export default App
