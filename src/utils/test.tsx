import { pick } from "@/utils/functions"
import type { LangsType } from "@/utils/types"
import { cleanup, render, RenderOptions } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import { afterEach } from "vitest"

afterEach(() => {
	cleanup()
})

type CustomRenderOptions = RenderOptions & { keys?: string[]; locale?: LangsType }

const customRender = async (
	ui: ReactNode,
	{ locale, keys, ...options }: CustomRenderOptions = { locale: "en" },
) => {
	const messages = await import(`@/languages/${locale}.json`)

	return render(ui, {
		wrapper: ({ children }) => (
			<NextIntlClientProvider
				locale={locale || "en"}
				messages={pick(messages, keys || [])}
			>
				{children}
			</NextIntlClientProvider>
		),
		...options,
	})
}

export * from "@testing-library/react"
export { customRender as render }

