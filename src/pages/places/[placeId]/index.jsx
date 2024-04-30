import { ErrorHandler, Head, Loading } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { DeleteDialogValidation } from "@/features/places/components/delete"
import { CardPlaceDetails } from "@/features/places/components/info"
import { usePlace } from "@/features/places/hooks"
import { requestServerGetPlace } from "@/features/places/utils/api"
import { useUser } from "@/features/users/hooks"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
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
	const { data: userData } = useUser()

	return (
		<Loading isLoading={isLoading}>
			<ErrorHandler isError={isError || Boolean(data?.error)}>
				<Head
					title={t("title", { name: data.name })}
					description={t("description", { name: data.name })}
				/>
				<div className="container flex flex-col gap-8 py-2">
					<CardPlaceDetails />
					{userData?.username && (
						<>
							<Button>
								<Link
									className="w-full h-full"
									href={`/places/${placeId}/update`}
								>
									{tUtils("update")}
								</Link>
							</Button>
							<DeleteDialogValidation placeId={placeId}>
								<Button variant="destructive">{tUtils("delete")}</Button>
							</DeleteDialogValidation>
						</>
					)}
				</div>
			</ErrorHandler>
		</Loading>
	)
}

PlaceDetailsPage.messages = [
	"PlaceDetailsPage",
	"Utils",
	...CardPlaceDetails.messages,
	...MainLayout.messages,
	...Loading.messages,
	...ErrorHandler.messages,
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
