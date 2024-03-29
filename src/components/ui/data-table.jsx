import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { useState } from "react"

// eslint-disable-next-line max-lines-per-function
export const DataTable = ({ columns, data, filterInput }) => {
	const t = useTranslations("DataTable")
	const tUtils = useTranslations("Utils")
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

	return (
		<>
			<div className="flex items-center py-4">
				<Input
					placeholder={t("search", { filterInput: t("filterInput.name") })}
					value={table.getColumn(filterInput)?.getFilterValue() ?? ""}
					onChange={event =>
						table.getColumn(filterInput)?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead className="text-md" key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{t("no_results")}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{tUtils("previous")}
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{tUtils("next")}
				</Button>
				<Select onValueChange={value => table.setPageSize(value)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder={t("pages.placeholder")} />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>{t("pages.title")}</SelectLabel>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<SelectItem key={pageSize} value={pageSize}>
									{pageSize}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</>
	)
}

DataTable.messages = ["DataTable"]
