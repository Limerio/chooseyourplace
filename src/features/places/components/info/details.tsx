import { defaultOptionsDate } from "@/utils/constants"
import { capitalize, cn } from "@/utils/functions"
import { useFormatter, useTranslations } from "next-intl"
import { useMemo } from "react"

const ignoredKeysPlace = ["_id", "__v", "building", "createdAt", "updatedAt"]
const ignoredKeysSubPlace = ["_id", "artisticMovement", "freeOrPay", "typeOf"]

// eslint-disable-next-line max-lines-per-function
export const PlaceDetails = ({ place }) => {
	const tUtils = useTranslations("Utils")
	const format = useFormatter()
	const keysPlace = useMemo(() => Object.keys(place), [place])

	return (
		<div className="border-t border-white flex flex-col">
			<dl className="divide-y divide-white">
				<PlaceFieldDetails>
					<PlaceTitleDetails>{tUtils("place.form.building")}</PlaceTitleDetails>
					<PlaceContentDetails>
						{tUtils(`buildings.${place.building}`)}
					</PlaceContentDetails>
				</PlaceFieldDetails>
				{keysPlace
					.filter(
						placeKey =>
							![place.building, ...ignoredKeysPlace].includes(placeKey),
					)
					.map(placeKey => (
						<PlaceFieldDetails key={placeKey}>
							<PlaceTitleDetails>
								{tUtils(`place.form.${placeKey}`)}
							</PlaceTitleDetails>
							<PlaceContentDetails>{place[placeKey]}</PlaceContentDetails>
						</PlaceFieldDetails>
					))}

				{keysPlace
					.filter(placeKey => ["createdAt", "updatedAt"].includes(placeKey))
					.map(placeKey => (
						<PlaceFieldDetails key={placeKey}>
							<PlaceTitleDetails>
								{tUtils(`place.form.${placeKey}`)}
							</PlaceTitleDetails>
							<PlaceContentDetails>
								{format.dateTime(new Date(place[placeKey]), defaultOptionsDate)}
							</PlaceContentDetails>
						</PlaceFieldDetails>
					))}

				<PlaceFieldDetails>
					<PlaceTitleDetails>
						{tUtils("place.form.typeOf")}{" "}
						{tUtils(`buildings.${place.building}`)}
					</PlaceTitleDetails>
					<PlaceContentDetails>
						{tUtils(
							`typeOfs.${place.building}.${place[place.building].typeOf}`,
						)}
					</PlaceContentDetails>
				</PlaceFieldDetails>

				{place.building === "museum" && (
					<PlaceFieldDetails>
						<PlaceTitleDetails>
							{tUtils("place.form.artisticMovements")}
						</PlaceTitleDetails>
						<PlaceContentDetails>
							{tUtils(
								`artisticMovements.${place[place.building]?.artisticMovement}`,
							)}
						</PlaceContentDetails>
					</PlaceFieldDetails>
				)}

				{Object.keys(place[place.building])
					.filter(placeSubKey => !ignoredKeysSubPlace.includes(placeSubKey))
					.map(placeSubKey => (
						<PlaceFieldDetails key={placeSubKey}>
							<PlaceTitleDetails>
								{tUtils(`place.form.${placeSubKey}`)}
							</PlaceTitleDetails>
							<PlaceContentDetails>
								{place[place.building][placeSubKey]}
							</PlaceContentDetails>
						</PlaceFieldDetails>
					))}
			</dl>
		</div>
	)
}
const PlaceTitleDetails = ({ className, ...props }) => (
	<dt
		className={cn(
			"text-sm font-medium leading-6 text-gray-900 dark:text-white",
			className,
		)}
		{...props}
	/>
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
