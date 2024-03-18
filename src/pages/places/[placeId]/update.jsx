import { Error, Head, Loading } from "@/components/layouts"
import { UpdateForm } from "@/features/places/components/forms/update"
import { usePlace } from "@/features/places/hooks"
import { requestServerGetPlace } from "@/features/places/utils/api"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo } from "react"

export async function getServerSideProps({ params }) {
	const { placeId } = params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestServerGetPlace(placeId),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
const UpdatePlace = () => {
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data, isLoading, isError } = usePlace(placeId)

	if (isError || data.error) {
		return <div className="bg-red-600">{data.error}</div>
	}

	return (
		<Loading isLoading={isLoading}>
			<Error isError={isError || Boolean(data?.error)}>
				<Head
					title={`${data.name} place - chooseyourplace`}
					description={`${data.name} place`}
				/>
				<div className="container">
					<UpdateForm />
				</div>
			</Error>
		</Loading>
	)
}

export default UpdatePlace
