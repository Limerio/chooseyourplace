import { requestAPI } from "@/utils/functions"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"

export const getServerSideProps = async () => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ["locations"],
		queryFn: () => requestAPI(true, "/locations"),
	})

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function Home() {
	const { data } = useQuery({
		queryKey: ["locations"],
		queryFn: () => requestAPI(false, "/locations"),
	})

	return (
		<div className="text-black dark:text-white">{JSON.stringify(data)}</div>
	)
}
