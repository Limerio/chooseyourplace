/* eslint-disable max-lines */
import { Error, Head, Loading } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogActionColumn } from "@/features/places/components/info"

import { usePlaces } from "@/features/places/hooks"
import { MainLayout } from "@/layouts/Main"
import { capitalize, serverTranslation } from "@/utils/functions"
import { ArrowUpDown } from "lucide-react"
import { useTranslations } from "next-intl"

const columns = t => [
	{
		accessorKey: "building",
		header: t("table.columns.building"),
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
				{t("table.columns.name")}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => capitalize(row.original.name),
	},
	{
		accessorKey: "city",
		header: t("table.columns.city"),
		cell: ({ row }) => capitalize(row.original.city),
	},
	{
		accessorKey: "zipcode",
		header: t("table.columns.zipcode"),
	},
	{
		accessorKey: "country",
		header: t("table.columns.country"),
		cell: ({ row }) => capitalize(row.original.country),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row: { original: place } }) => (
			<DialogActionColumn place={place} />
		),
	},
]

export default function Home() {
	const { data, isLoading, isError } = usePlaces()
	const t = useTranslations("Home")

	return (
		<Loading isLoading={isLoading}>
			<Error isError={isError || Boolean(data?.error)}>
				<Head
					title={`${t("title")} - chooseyourplace`}
					description={t("description")}
				/>
				<div className="container mx-auto py-10 flex flex-col gap-2">
					<h1 className="text-6xl text-center">{t("title")}</h1>
					<DataTable filterInput="name" columns={columns(t)} data={data} />
				</div>
			</Error>
		</Loading>
	)
}

Home.messages = [
	"Home",
	...Loading.messages,
	...Error.messages,
	...MainLayout.messages,
	...DataTable.messages,
]

export async function getServerSideProps({ locale }) {
	return {
		props: await serverTranslation(locale, Home),
	}
}
