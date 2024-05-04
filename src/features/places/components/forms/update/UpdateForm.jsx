import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { ToastAction } from "@/components/ui/toast"
import { usePlace } from "@/features/places/hooks"
import { updatePlaceSchema, updateSubSchemas } from "@/features/places/schemas"
import { requestPutPlace } from "@/features/places/utils/api"
import {
	barFormFields,
	defaultFormFields,
	museumFormFields,
	parkFormFields,
	restaurantFormFields,
} from "@/features/places/utils/fields"
import { useToast } from "@/hooks/ui"
import { useQueryClient } from "@tanstack/react-query"
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

// eslint-disable-next-line max-lines-per-function
export const UpdateForm = () => {
	const tForms = useTranslations("Forms")
	const tUtils = useTranslations("Utils")
	const router = useRouter()
	const queryClient = useQueryClient()
	const placeId = useMemo(() => router.query.placeId, [router.query.placeId])
	const { data: defaultValues } = usePlace(placeId)
	const form = useForm({ defaultValues })
	const { toast } = useToast()
	const onSubmit = async values => {
		try {
			await updatePlaceSchema
				.merge(updateSubSchemas[values.building])
				.parseAsync(values)
			await requestPutPlace(placeId, values)
			toast({ title: "Place updated" })
			await queryClient.refetchQueries({
				queryKey: ["places"],
				exact: true,
			})
			router.push("/")
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: "There was a problem with your request.",
				action: <ToastAction altText="Try again">Try again</ToastAction>,
			})
		}
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
