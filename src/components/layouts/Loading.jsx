import { Loader } from "@/components/ui/loader"

export const Loading = ({ isLoading, children }) => {
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
