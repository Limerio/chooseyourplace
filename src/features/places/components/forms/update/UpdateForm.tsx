import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { usePlace } from "@/features/places/hooks"
import { updatePlaceSchema, updateSubSchemas } from "@/features/places/schemas"
import { placeQuery } from "@/features/places/schemas/querys"
import { requestPutPlace } from "@/features/places/utils/api"
import {
	barFormFields,
	defaultFormFields,
	museumFormFields,
	parkFormFields,
	restaurantFormFields,
} from "@/features/places/utils/fields"
import { Buildings } from "@/utils/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const subForms: Record<Buildings, unknown> = {
	bar: barFormFields,
	museum: museumFormFields,
	restaurant: restaurantFormFields,
	park: parkFormFields,
}

export const UpdateForm = () => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const placeId = useMemo<string>(
		() => placeQuery.parse(router.query).placeId,
		[router.query],
	)
	const { data } = usePlace(placeId)
	const form = useForm({
		defaultValues: data,
	})
	const onSubmit = async (values: z.infer<typeof updatePlaceSchema>) => {
		await updatePlaceSchema
			.merge(updateSubSchemas[values.building])
			.parseAsync(values)
		await requestPutPlace(placeId as string, values)
		router.push("/")
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				{defaultFormFields(tForms, tUtils).map(formField => (
					<FormField
						key={formField.name}
						control={form.control}
						{...formField}
					/>
				))}
				{subForms[form.watch("building")]({ t: tForms, tUtils }, true).map(
					formField => (
						<FormField
							key={formField.name}
							control={form.control}
							{...formField}
						/>
					),
				)}
				<Button type="submit">{tUtils("update")}</Button>
			</form>
		</Form>
	)
}
