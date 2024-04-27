import { requestGetUser } from "@/features/users/utils/api"
import { useQuery } from "@tanstack/react-query"

export const useUser = () =>
	useQuery({
		queryKey: ["users", "me"],
		queryFn: () => requestGetUser(),
	})
