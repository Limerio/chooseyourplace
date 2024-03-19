import { defaultOptionsDate } from "@/utils/constants"
import {
	addSpaceBetweenCapitalizeLetter,
	capitalize,
	cn,
} from "@/utils/functions"
import { useFormatter, useTranslations } from "next-intl"
import { useMemo } from "react"

const ignoredKeys = ["_id", "building", "__v", "createdAt", "updatedAt"]

export const PlaceDetails = ({ place }) => {
	const t = useTranslations("PlaceDetails")
	const format = useFormatter()
	const keysPlace = useMemo(() => Object.keys(place), [place])

	return (
		<div className="border-t border-white flex flex-col">
			<dl className="divide-y divide-white">
				<PlaceFieldDetails>
					<PlaceTitleDetails>{t("typeOf")}</PlaceTitleDetails>
					<PlaceContentDetails>{place.building}</PlaceContentDetails>
				</PlaceFieldDetails>
				{keysPlace
					.filter(
						placeKey => ![place.building, ...ignoredKeys].includes(placeKey),
					)
					.map(placeKey => (
						<PlaceFieldDetails key={placeKey}>
							<PlaceTitleDetails>{placeKey}</PlaceTitleDetails>
							<PlaceContentDetails>{place[placeKey]}</PlaceContentDetails>
						</PlaceFieldDetails>
					))}

				{keysPlace
					.filter(placeKey => ["createdAt", "updatedAt"].includes(placeKey))
					.map(placeKey => (
						<PlaceFieldDetails key={placeKey}>
							<PlaceTitleDetails>{placeKey}</PlaceTitleDetails>
							<PlaceContentDetails>
								{format.dateTime(new Date(place[placeKey]), defaultOptionsDate)}
							</PlaceContentDetails>
						</PlaceFieldDetails>
					))}

				{Object.keys(place[place.building])
					.filter(placeSubKey => placeSubKey !== "_id")
					.map(placeSubKey => (
						<PlaceFieldDetails key={placeSubKey}>
							<PlaceTitleDetails>{placeSubKey}</PlaceTitleDetails>
							<PlaceContentDetails>
								{place[place.building][placeSubKey]}
							</PlaceContentDetails>
						</PlaceFieldDetails>
					))}
			</dl>
		</div>
	)
}
const PlaceTitleDetails = ({ className, children, ...props }) => (
	<dt
		className={cn(
			"text-sm font-medium leading-6 text-gray-900 dark:text-white",
			className,
		)}
		{...props}
	>
		{addSpaceBetweenCapitalizeLetter(capitalize(children))}
	</dt>
)
const PlaceContentDetails = ({ className, children, ...props }) => (
	<dd
		className={cn(
			"mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0",
			className,
		)}
		{...props}
	>
		{typeof children === "string"
			? capitalize(children).replace("_", " ")
			: children}
	</dd>
)
const PlaceFieldDetails = ({ className, ...props }) => (
	<div
		className={cn(
			"px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0",
			className,
		)}
		{...props}
	/>
)
