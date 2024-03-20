import { Error, Head, Loading } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/components/ui/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DeleteDialogValidation } from "@/features/places/components/delete"
import { PlaceDetails } from "@/features/places/components/info"
import { usePlace } from "@/features/places/hooks"
import { requestServerGetPlace } from "@/features/places/utils/api"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"

const PlaceDetailsPage = () => {
	const t = useTranslations("PlaceDetailsPage")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data, isLoading, isError } = usePlace(placeId)

	return (
		<Loading isLoading={isLoading}>
			<Error isError={isError || Boolean(data?.error)}>
				<Head
					title={`${t("title", { name: data.name })} - chooseyourplace`}
					description={t("description", { name: data.name })}
				/>
				<div className="container flex flex-col gap-8 py-2">
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
					<Button>
						<Link className="w-full h-full" href={`/places/${placeId}/update`}>
							{tUtils("update")}
						</Link>
					</Button>
					<DeleteDialogValidation placeId={placeId}>
						<Button variant="destructive">{tUtils("delete")}</Button>
					</DeleteDialogValidation>
				</div>
			</Error>
		</Loading>
	)
}

PlaceDetailsPage.messages = [
	"PlaceDetailsPage",
	"Utils",
	"PlaceDetails",
	...MainLayout.messages,
	...Loading.messages,
	...Error.messages,
]

export default PlaceDetailsPage

export async function getServerSideProps({ locale, params: { placeId } }) {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestServerGetPlace(placeId),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverTranslation(locale, PlaceDetailsPage)),
		},
	}
}
