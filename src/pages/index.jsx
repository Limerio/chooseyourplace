/* eslint-disable max-lines */
import { Error, Head, Loading } from "@/components/layouts"
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
import { usePlaces } from "@/features/places/hooks"
import { MainLayout } from "@/layouts/Main"
import { capitalize, serverTranslation } from "@/utils/functions"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon, EnterFullScreenIcon } from "@radix-ui/react-icons"
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
		cell: ({ row }) => {
			const place = row.original

			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">{t("table.columns.actions.open")}</span>
							<DotsHorizontalIcon className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{t("table.columns.actions.title", { name: place.name })}
							</DialogTitle>
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
										{t("table.columns.actions.close")}
									</Link>
								</DialogClose>
							</Button>
							<DeleteDialogValidation reload placeId={place._id}>
								<Button variant="destructive">
									{t("table.columns.actions.delete")}
								</Button>
							</DeleteDialogValidation>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)
		},
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
					description={t("descriptionx")}
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

export function getServerSideProps({ locale }) {
	return {
		props: serverTranslation(locale, Home),
	}
}
