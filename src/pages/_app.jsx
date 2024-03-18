import { ThemeProvider } from "@/components/providers/theme"
import { Toaster } from '@/components/ui/toaster'
import { MainLayout } from "@/layouts/Main"
import "@/styles/globals.css"
import {
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { useState } from "react"

export default function App({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={pageProps.dehydratedState}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
					<Toaster />
				</ThemeProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	)
}
