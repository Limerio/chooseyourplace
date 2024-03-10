import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { requestAPI } from "@/utils/functions"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import { ArrowUpDown } from "lucide-react"

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
const columns = [
	{
		accessorKey: "building",
		header: "Building",
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				className="text-md"
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "zipcode",
		header: "Zip Code",
	},
	{
		accessorKey: "country",
		header: "Country",
	},
]

export default function Home() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["locations"],
		queryFn: () => requestAPI(false, "/locations"),
	})

	if (isLoading) {
		return <div className="bg-slate-500">Loading...</div>
	}

	if (isError) {
		return <div className="bg-red-600">Error</div>
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-6xl text-center">List of places</h1>
			<DataTable filterInput={"name"} columns={columns} data={data} />
		</div>
	)
}
