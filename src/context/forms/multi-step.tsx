/* eslint-disable no-empty-function */
import { placeSchema } from "@/features/places/schemas"
import { barSchema } from "@/features/places/schemas/Bar"
import { museumSchema } from "@/features/places/schemas/Museum"
import { parkSchema } from "@/features/places/schemas/Park"
import { restaurantSchema } from "@/features/places/schemas/Restaurant"
import React, { createContext, FC, useCallback, useMemo, useState } from "react"
import { z } from "zod"

type FormDataOptions = {
	page: number
	data: DataForm
}

type MultiStepContextValues = {
	pageNumber: number
	step: React.JSX.Element | null
	steps: React.JSX.Element[]
	next: () => void
	back: () => void
	addDataForm: (newData: DataForm) => void
	formsData: FormDataOptions[]
}

type MultiStepProviderProps = {
	steps: React.JSX.Element[]
	children: (pageNumber: number, steps: React.JSX.Element[], actualStep: React.JSX.Element | null) => React.JSX.Element
}

type DataForm = z.infer<
	| typeof placeSchema
	| typeof parkSchema
	| typeof restaurantSchema
	| typeof museumSchema
	| typeof barSchema
	>

	export const MultiStepContext = createContext<MultiStepContextValues>({
	pageNumber: 0,
	step: null,
	steps: [],
	next: () => {},
	back: () => {},
	addDataForm: () => {},
	formsData: [],
})

// eslint-disable-next-line max-lines-per-function
export const MultiStepProvider: FC<MultiStepProviderProps> = ({
	steps,
	children,
}) => {
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
