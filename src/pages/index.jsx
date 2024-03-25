/* eslint-disable max-lines */
import { ErrorHandler, Head, Loading } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { DialogActionColumn } from "@/features/places/components/info"

import { usePlaces } from "@/features/places/hooks"
import { MainLayout } from "@/layouts/Main"
import { capitalize, formatTitle } from "@/utils/functions"
import { serverTranslation } from "@/utils/functions.server"
import { ArrowUpDown } from "lucide-react"
import { useTranslations } from "next-intl"

const columns = t => [
	{
		accessorKey: "building",
		header: t("place.form.building"),
		cell: ({ row }) => capitalize(t(`buildings.${row.original.building}`)),
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<Button
				className="text-md"
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			>
				{t("place.form.name")}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => capitalize(row.original.name),
	},
	{
		accessorKey: "city",
		header: t("place.form.city"),
		cell: ({ row }) => capitalize(row.original.city),
	},
	{
		accessorKey: "zipcode",
		header: t("place.form.zipcode"),
	},
	{
		accessorKey: "country",
		header: t("place.form.country"),
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
const HomePage = () => {
	const { data, isLoading, isError } = usePlaces()
	const t = useTranslations("HomePage")
	const tUtils = useTranslations("Utils")

	return (
		<Loading isLoading={isLoading}>
			<ErrorHandler isError={isError || Boolean(data?.error)}>
				<Head title={t("title")} description={t("description")} />
				<div className="container mx-auto py-10 flex flex-col gap-2">
					<h1 className="text-6xl text-center">{formatTitle(t("title"))}</h1>
					<DataTable filterInput="name" columns={columns(tUtils)} data={data} />
				</div>
			</ErrorHandler>
		</Loading>
	)
}

HomePage.messages = [
	"HomePage",
	...Loading.messages,
	...ErrorHandler.messages,
	...MainLayout.messages,
	...DataTable.messages,
]

export default HomePage

export const getServerSideProps = async ({ locale }) => ({
	props: await serverTranslation(locale, HomePage),
})
