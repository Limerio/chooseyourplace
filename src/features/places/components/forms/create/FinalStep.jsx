import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { requestPostPlace } from "@/features/places/utils/api"
import { useMultiStepsForm } from "@/hooks/forms"
import { capitalize } from "@/utils/functions"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"

const finalStepCards = ["Information about the building", "Details"]

// eslint-disable-next-line max-lines-per-function
export const FinalStep = () => {
	const t = useTranslations("Utils")
	const { formsData, back } = useMultiStepsForm()
	const router = useRouter()
	const finishStepClick = () => async () => {
		const body = {
			info: formsData[0].data,
			details: formsData[1].data,
		}

		await requestPostPlace(body)
		router.push("/")
	}

	return (
		<>
			<div className="flex gap-2">
				{finalStepCards.map((title, i) => (
					<Card className="w-full" key={title}>
						<CardHeader>
							<CardTitle className="text-2xl">{title}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-20">
								{Object.keys(formsData[i].data).map(formDataKey => {
									const value = formsData[i].data[formDataKey]

									return (
										<DetailsForm
											title={formDataKey}
											key={formDataKey}
											value={
												typeof value === "string" ? capitalize(value) : value
											}
										/>
									)
								})}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="flex items-center gap-2">
				<Button className="w-full" onClick={() => back()}>
					{t("previous")}
				</Button>
				<Button className="w-full" onClick={finishStepClick()}>
					Finish
				</Button>
			</div>
		</>
	)
}
const DetailsForm = ({ title, value }) => (
	<div className="flex flex-col space-y-1.5">
		<h3 className="text-xl font-bold">{capitalize(title)}</h3>
		<p>{value}</p>
	</div>
)
