/* eslint-disable max-lines */
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Link } from "@/components/ui/link"
import { DeleteDialogValidation } from "@/features/places/components/delete/dialogValidation"
import { PlaceDetails } from "@/features/places/components/info"
import { requestGetPlaces } from "@/features/places/utils/api"
import { capitalize } from "@/utils/functions"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon, EnterFullScreenIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { ArrowUpDown } from "lucide-react"
import Head from "next/head"

const columns = [
	{
		accessorKey: "building",
		header: "Building",
		cell: ({ row }) => capitalize(row.original.building),
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
		cell: ({ row }) => capitalize(row.original.name),
	},
	{
		accessorKey: "city",
		header: "City",
		cell: ({ row }) => capitalize(row.original.city),
	},
	{
		accessorKey: "zipcode",
		header: "Zip Code",
	},
	{
		accessorKey: "country",
		header: "Country",
		cell: ({ row }) => capitalize(row.original.country),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const place = row.original

			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Information about "{place.name}"</DialogTitle>
						</DialogHeader>
						<PlaceDetails place={place} />
						<DialogFooter>
							<Button>
								<DialogClose asChild>
									<Link
										href={`/places/${place._id}`}
										className="flex items-center gap-1.5 w-full h-full"
									>
										<EnterFullScreenIcon />
										Full screen mode
									</Link>
								</DialogClose>
							</Button>
							<DeleteDialogValidation reload placeId={place._id}>
								<Button variant="destructive">Delete</Button>
							</DeleteDialogValidation>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)
		},
	},
]

export default function Home() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["places"],
		queryFn: () => requestGetPlaces(),
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
				<title>List of places - chooseyourplace</title>
				<meta name="description" content="List of places page" />
			</Head>
			<div className="container mx-auto py-10 flex flex-col gap-2">
				<h1 className="text-6xl text-center">List of places</h1>
				<DataTable filterInput="name" columns={columns} data={data} />
			</div>
		</>
	)
}
