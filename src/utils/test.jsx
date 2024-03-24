import { pick } from "@/utils/functions"
import { cleanup, render } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach } from "vitest"

afterEach(() => {
	cleanup()
})

const customRender = async (ui, { locale, ...options } = { locale: "en" }) => {
	const messages = await import(`@/languages/${locale}.json`)

	return render(ui, {
		wrapper: ({ children }) => (
			<NextIntlClientProvider
				locale={locale}
				messages={pick(messages, children.type.messages || [])}
			>
				{children}
			</NextIntlClientProvider>
		),
		...options,
	})
}

export * from "@testing-library/react"
export { customRender as render }
