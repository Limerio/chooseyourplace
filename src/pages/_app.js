import { ThemeProvider } from "@/components/providers/theme"
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</ThemeProvider>
	)
}
