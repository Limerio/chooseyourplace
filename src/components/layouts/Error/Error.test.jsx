import { pick } from "@/utils/functions"
import { cleanup, render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach, describe, expect, it } from "vitest"
import { Error } from "./Error"

describe("Error component", () => {
	afterEach(() => {
		cleanup()
	})

	it("Error english version", async () => {
		const lang = "en"
		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"Error",
				])}
			>
				<Error isError={true} />
			</NextIntlClientProvider>,
		)

		const message = screen.queryByText(/Internal server error/u)
		expect(message).toBeDefined()
	})

	it("Error french version", async () => {
		const lang = "fr"
		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"Error",
				])}
			>
				<Error isError={true} />
			</NextIntlClientProvider>,
		)

		const message = screen.queryByText("Erreur du serveur")
		expect(message).toBeDefined()
	})
})
