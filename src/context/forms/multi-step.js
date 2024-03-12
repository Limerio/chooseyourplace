import { createContext, useCallback, useMemo, useState } from "react"

export const MultiStepContext = createContext({
	pageNumber: 0,
	step: null,
	steps: [],
	next: null,
	back: null,
	addDataForm: null,
	formsData: [],
})

// eslint-disable-next-line max-lines-per-function
export const MultiStepProvider = ({ steps, children }) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)
	const [formsData, setFormsData] = useState([])
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
			setFormsData([...formsData.filter(formData => formData.page !== i - 1)])

			if (i <= 0) {
				return i
			}

			return i - 1
		})
	}
	const addDataForm = useCallback(
		newData => {
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
