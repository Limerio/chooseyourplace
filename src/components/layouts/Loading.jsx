import { Loader } from "@/components/ui/loader"

export const Loading = ({ isLoading, children }) => {
	if (isLoading) {
		return <Loader />
	}

	return children
}

Loading.messages = [Loader.messages]
