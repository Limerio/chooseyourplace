import { Loader } from "@/components/ui/loader"
import { ReactChildren } from "@/utils/types"
import { FC } from "react"

type LoadingProps = {
	isLoading: boolean
}

export const Loading: FC<ReactChildren<LoadingProps>> = ({
	isLoading,
	children,
}) => {
	if (isLoading) {
		return (
			<div className="container w-full h-screen flex items-center justify-center">
				<Loader />
			</div>
		)
	}

	return children
}

Loading.messages = [...Loader.messages]
