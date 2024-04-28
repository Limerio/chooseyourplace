import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import {
	updatePlaceSchema,
	updateSubSchemas,
} from "@/features/places/database/schemas"
import { usePlace } from "@/features/places/hooks"
import { requestPutPlace } from "@/features/places/utils/api"
import {
	barFormFields,
	defaultFormFields,
	museumFormFields,
	parkFormFields,
	restaurantFormFields,
} from "@/features/places/utils/fields"
import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

const subForms = {
	bar: barFormFields,
	museum: museumFormFields,
	restaurant: restaurantFormFields,
	park: parkFormFields,
}

export const UpdateForm = () => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data } = usePlace(placeId)
	const form = useForm({
		defaultValues: data,
	})
	const onSubmit = async values => {
		await updatePlaceSchema
			.merge(updateSubSchemas[values.building])
			.parseAsync(values)
		await requestPutPlace(placeId, values)
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
