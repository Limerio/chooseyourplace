import { placeSchema } from "@/features/places/schemas"
import { barSchema } from "@/features/places/schemas/Bar"
import { museumSchema } from "@/features/places/schemas/Museum"
import { parkSchema } from "@/features/places/schemas/Park"
import { restaurantSchema } from "@/features/places/schemas/Restaurant"
import { ReactChildren } from "@/utils/types"
import { createContext, FC, useCallback, useMemo, useState } from "react"
import { z } from "zod"

type FormDataOptions = {
	page: number
	data: DataForm
}

type MultiStepContextValues = {
	pageNumber: number
	step: number | null
	steps: []
	next: () => void | null
	back: () => void | null
	// eslint-disable-next-line no-unused-vars
	addDataForm: (newData: DataForm) => void | null
	formsData: FormDataOptions[]
}

export const MultiStepContext = createContext<MultiStepContextValues>({
	pageNumber: 0,
	step: null,
	steps: [],
	next: null,
	back: null,
	addDataForm: null,
	formsData: [],
})

type MultiStepProviderProps = {
	steps: []
}

type DataForm = z.infer<typeof placeSchema | typeof parkSchema | typeof restaurantSchema | typeof museumSchema | typeof barSchema>

// eslint-disable-next-line max-lines-per-function
export const MultiStepProvider: FC<ReactChildren<MultiStepProviderProps>> = ({ steps, children }) => {
	const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
	const [formsData, setFormsData] = useState<FormDataOptions[]>([])
	const pageNumber = useMemo(() => currentStepIndex + 1, [currentStepIndex])
	const next = () => {
		setCurrentStepIndex(i => {
			if (i >= steps.length - 1) {
				return i
			}

			return i + 1
		})
	}
	const back = () => {
		setCurrentStepIndex(i => {
			if (i === 1) {
				setFormsData(prevFormsData => [
					...prevFormsData.filter(formData => formData.page !== i - 1),
				])
			}

			if (i <= 0) {
				return i
			}

			return i - 1
		})
	}
	const addDataForm = useCallback(
		(newData: DataForm) => {
			setFormsData(prevFormsData => [
				...prevFormsData.filter(formData => formData.page !== pageNumber),
				{ page: pageNumber, data: newData },
			])
		},
		[pageNumber],
	)

	return (
		<MultiStepContext.Provider
			value={{
				pageNumber,
				step: steps[currentStepIndex],
				steps,
				next,
				back,
				addDataForm,
				formsData,
			}}
		>
			{children(pageNumber, steps, steps[currentStepIndex])}
		</MultiStepContext.Provider>
	)
}
