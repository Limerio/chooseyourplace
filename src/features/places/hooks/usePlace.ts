import { requestGetPlace } from "@/features/places/utils/api"
import { useQuery } from "@tanstack/react-query"

export const usePlace = (placeId: string) =>
	useQuery({
		queryKey: ["places", placeId],
		queryFn: () => requestGetPlace(placeId),
	})
