import { pick } from "@/utils/functions"
import { cleanup, render } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach, describe, it } from "vitest"
import { Loading } from "./Loading"

describe("Loading component", () => {
	afterEach(() => {
		cleanup()
	})

	it("Loading english version", async () => {
		const lang = "en"

		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"Loader",
				])}
			>
				<Loading />
			</NextIntlClientProvider>,
		)
	})

	it("Loading french version", async () => {
		const lang = "en"

		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"Loader",
				])}
			>
				<Loading />
			</NextIntlClientProvider>,
		)
	})
})
