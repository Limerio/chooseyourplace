import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { requestPostPlace } from "@/features/places/utils/api"
import { useMultiStepsForm } from "@/hooks/forms"
import { capitalize } from "@/utils/functions"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const finalStepCards = ["info", "details"]

// eslint-disable-next-line max-lines-per-function
export const FinalStep = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const t = useTranslations("CreatePlace")
	const tUtils = useTranslations("Utils")
	const { back, formsData } = useMultiStepsForm()
	const finishStepClick = () => async () => {
		const body = {
			info: formsData[0].data,
			details: formsData[1].data,
		}

		await requestPostPlace(body)
		await queryClient.refetchQueries({
			queryKey: ["places"],
			exact: true,
		})
		router.push("/")
	}

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<ScrollArea className="max-h-[600px] w-full p-5">
					{finalStepCards.map((title, i) => (
						<Card className="w-full" key={title}>
							<CardHeader>
								<CardTitle className="text-2xl">
									{t(`finalStepCards.${title}`)}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-5">
									{Object.keys(formsData[i].data).map(formDataKey => {
										const value = formsData[i].data[formDataKey]

										return (
											<DetailsForm
												title={formDataKey}
												building={formsData[0].data.building}
												key={formDataKey}
												value={value}
											/>
										)
									})}
								</div>
							</CardContent>
						</Card>
					))}
				</ScrollArea>
			</div>

			<div className="flex items-center gap-2">
				<Button className="w-full" onClick={() => back()}>
					{tUtils("previous")}
				</Button>
				<Button className="w-full" onClick={finishStepClick()}>
					{tUtils("finish")}
				</Button>
			</div>
		</>
	)
}
const DetailsForm = ({ title, value, building }) => {
	const tUtils = useTranslations("Utils")
	const [translateValue, setTranslateValue] = useState(value)

	useEffect(() => {
		switch (title) {
			case "typeOf":
				setTranslateValue(tUtils(`typeOfs.${building}.${value}`))

				break

			case "freeOrPay":
				setTranslateValue(tUtils(`freeOrPay.${value}`))

				break

			case "artisticMovements":
				setTranslateValue(tUtils(`artisticMovements.${value}`))

				break

			case "building":
				setTranslateValue(tUtils(`buildings.${value}`))

				break
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="flex flex-col space-y-1.5">
			<h3 className="text-xl font-bold">{tUtils(`place.form.${title}`)}</h3>
			<p>
				{typeof translateValue === "string"
					? capitalize(translateValue)
					: translateValue}
			</p>
		</div>
	)
}
