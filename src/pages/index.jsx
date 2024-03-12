/* eslint-disable max-lines */
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import {
	addSpaceBetweenCapitalizeLetter,
	capitalize,
	requestAPI,
} from "@/utils/functions"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
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
		// eslint-disable-next-line max-lines-per-function
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
						<div className="border-t border-white flex flex-col">
							<dl className="divide-y divide-white">
								<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
										Type of building
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
										{capitalize(place.building)}
									</dd>
								</div>
								<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
										Name
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
										{capitalize(place.name)}
									</dd>
								</div>
								<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
										Country
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
										{capitalize(place.country)}
									</dd>
								</div>
								<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
										City
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
										{capitalize(place.city)}
									</dd>
								</div>
								<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
									<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
										Zipcode
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
										{place.zipcode}
									</dd>
								</div>
								{Object.keys(place[place.building])
									.filter(placeKey => placeKey !== "_id")
									.map(placeKey => {
										const value = place[place.building][placeKey]

										return (
											<div
												className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
												key={placeKey}
											>
												<dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
													{addSpaceBetweenCapitalizeLetter(
														capitalize(placeKey),
													)}
												</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
													{typeof value === "string"
														? capitalize(value).replace("_", " ")
														: value}
												</dd>
											</div>
										)
									})}
							</dl>
						</div>
						<DialogFooter>
							<Button variant="destructive">Delete</Button>
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
		queryFn: () => requestAPI(false, "/places"),
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
