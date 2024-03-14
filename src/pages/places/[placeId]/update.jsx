import { Head } from "@/components/layouts"
import { UpdateForm } from "@/features/places/components/forms/update"
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

	return (
		<>
			<Head
				title="Update a place - chooseyourplace"
				description="Update page for places"
			/>
			<div className="container">
				<UpdateForm id={placeId} />
			</div>
		</>
	)
}

export default UpdatePlace
