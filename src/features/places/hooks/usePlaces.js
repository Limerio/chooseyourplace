import { requestGetPlaces } from "@/features/places/utils/api"
import { useQuery } from "@tanstack/react-query"

export const usePlaces = () =>
	useQuery({
		queryKey: ["places"],
		queryFn: () => requestGetPlaces(),
	})
