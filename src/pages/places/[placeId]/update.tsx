import { ErrorHandler, Head, Loading } from "@/components/layouts"
import { UpdateForm } from "@/features/places/components/forms/update"
import { usePlace } from "@/features/places/hooks"
import { placeQuery } from "@/features/places/schemas/querys"
import { requestServerGetPlace } from "@/features/places/utils/api"
import { MainLayout } from "@/layouts/Main"
import { serverTranslation } from "@/utils/functions.server"
import { LangsType } from "@/utils/types"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { GetServerSideProps } from "next"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { z } from "zod"

export const getServerSideProps = (async ({ locale, params }) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["places", params?.placeId],
		queryFn: () => requestServerGetPlace(params?.placeId as string),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverTranslation(locale as LangsType, UpdatePlacePage)),
		},
	}
}) satisfies GetServerSideProps<object, z.infer<typeof placeQuery>>
const UpdatePlacePage = () => {
	const t = useTranslations("UpdatePlacePage")
	const router = useRouter()
	const placeId = useMemo<string>(
		() => placeQuery.parse(router.query).placeId,
		[router.query],
	)
	const { data, isLoading, isError } = usePlace(placeId)

	return (
		<Loading isLoading={isLoading}>
			<ErrorHandler isError={isError || Boolean(data?.error)}>
				<Head
					title={t("title", { name: data.name })}
					description={t("description", { name: data.name })}
				/>
				<div className="container">
					<UpdateForm />
				</div>
			</ErrorHandler>
		</Loading>
	)
}

UpdatePlacePage.messages = [
	"UpdatePlacePage",
	"Utils",
	"Forms",
	...MainLayout.messages,
	...Loading.messages,
	...ErrorHandler.messages,
]

export default UpdatePlacePage
