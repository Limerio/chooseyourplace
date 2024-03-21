import { Error, Head, Loading } from "@/components/layouts"
import { UpdateForm } from "@/features/places/components/forms/update"
import { usePlace } from "@/features/places/hooks"
import { requestServerGetPlace } from "@/features/places/utils/api"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"

export async function getServerSideProps({ locale, params: { placeId } }) {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestServerGetPlace(placeId),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverTranslation(locale, UpdatePlacePage)),
		},
	}
}
const UpdatePlacePage = () => {
	const t = useTranslations("UpdatePlacePage")
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data, isLoading, isError } = usePlace(placeId)

	return (
		<Loading isLoading={isLoading}>
			<Error isError={isError || Boolean(data?.error)}>
				<Head
					title={t("title", { name: data.name })}
					description={t("description", { name: data.name })}
				/>
				<div className="container">
					<UpdateForm />
				</div>
			</Error>
		</Loading>
	)
}

UpdatePlacePage.messages = [
	"UpdatePlacePage",
	"Utils",
	"Forms",
	...MainLayout.messages,
	...Loading.messages,
	...Error.messages,
]

export default UpdatePlacePage
