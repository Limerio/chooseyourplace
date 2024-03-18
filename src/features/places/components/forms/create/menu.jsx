import { Button } from "@/components/ui/button"
import { useMultiStepsForm } from "@/hooks/forms"

export const MenuForm = () => {
	const { back } = useMultiStepsForm()

	return (
		<div className="flex items-center gap-2">
			<Button className="w-full" onClick={() => back()}>
				Previous
			</Button>
			<Button className="w-full" type="submit">
				Finish
			</Button>
		</div>
	)
}
