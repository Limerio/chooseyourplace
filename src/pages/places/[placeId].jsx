import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DeleteDialogValidation } from "@/features/places/components/delete"
import { PlaceDetails } from "@/features/places/components/info"
import {
	requestGetPlace,
	requestServerGetPlace,
} from "@/features/places/utils/api"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"

export async function getServerSideProps({ placeId }) {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["posts", placeId],
		queryFn: () => requestServerGetPlace(placeId),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}
const PlaceDetailsPage = () => {
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data, isLoading, isError } = useQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestGetPlace(placeId),
	})

	if (isLoading) {
		return <div className="bg-slate-500">Loading...</div>
	}

	if (isError || data.error) {
		return <div className="bg-red-600">{data.error}</div>
	}

	return (
		<>
			<Head>
				<title>Create a place - chooseyourplace</title>
				<meta name="description" content="Creation page for places" />
			</Head>
			<div className="container flex flex-col gap-8 py-2">
				<Card>
					<CardHeader>
						<CardTitle>
							<h1 className="text-3xl text-center">
								Information about <span className="font-bold">{data.name}</span>
							</h1>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[600px] w-full p-5">
							<PlaceDetails place={data} />
						</ScrollArea>
					</CardContent>
				</Card>
				<DeleteDialogValidation placeId={placeId}>
					<Button variant="destructive">Delete</Button>
				</DeleteDialogValidation>
			</div>
		</>
	)
}

export default PlaceDetailsPage
