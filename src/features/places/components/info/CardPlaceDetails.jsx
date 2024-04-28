import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlaceDetails } from "@/features/places/components/info/details"
import { usePlace } from "@/features/places/hooks"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const CardPlaceDetails = () => {
	const t = useTranslations("PlaceDetailsPage")
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data } = usePlace(placeId)

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<span className="text-3xl text-center">
						{t.rich("content.title", {
							name: data.name,
							nameComponent: chunks => (
								<span className="font-bold">{chunks}</span>
							),
						})}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[600px] w-full p-5">
					<PlaceDetails place={data} />
				</ScrollArea>
			</CardContent>
		</Card>
	)
}

CardPlaceDetails.messages = ["PlaceDetailsPage", ...PlaceDetails.messages]
