import { MultiStepContext } from "@/context/forms"
import { useContext } from "react"

export const useMultiStepsForm = () => useContext(MultiStepContext)
