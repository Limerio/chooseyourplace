import { ReactChildren } from "@/utils/types"
import {
	DehydratedState,
	HydrationBoundary,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { useState, type FC } from "react"

type ProvidersProps = {
	messages: AbstractIntlMessages
	dehydratedState: DehydratedState
}

export const Providers: FC<ReactChildren<ProvidersProps>> = ({
	children,
	dehydratedState,
	messages,
}) => {
	const [queryClient] = useState(() => new QueryClient())
	const router = useRouter()

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NextIntlClientProvider
						locale={router.locale}
						timeZone="Europe/Paris"
						messages={messages}
					>
						{children}
					</NextIntlClientProvider>
				</ThemeProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	)
}
