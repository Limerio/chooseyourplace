import { requestAPI } from "@/utils/functions"
import useSWR from "swr"

const cacheKey = "/api/locations"

export const getServerSideProps = async () => {
	const { data: locations } = await requestAPI(true, "/locations")

	return {
		fallback: {
			[cacheKey]: locations,
		},
	}
}

export default function Home() {
	const { data } = useSWR(cacheKey)

	return JSON.stringify(data)
}
