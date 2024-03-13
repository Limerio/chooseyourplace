import {
	addSpaceBetweenCapitalizeLetter,
	capitalize,
	cn,
} from "@/utils/functions"

export const PlaceDetails = ({ place }) => (
	<div className="border-t border-white flex flex-col">
		<dl className="divide-y divide-white">
			<PlaceFieldDetails>
				<PlaceTitleDetails>Type of building</PlaceTitleDetails>
				<PlaceContentDetails>{capitalize(place.building)}</PlaceContentDetails>
			</PlaceFieldDetails>
			{Object.keys(place)
				.filter(
					placeKey =>
						!["_id", "building", "__v", place.building].includes(placeKey),
				)
				.map(placeKey => (
					<PlaceFieldDetails key={placeKey}>
						<PlaceTitleDetails>
							{addSpaceBetweenCapitalizeLetter(capitalize(placeKey))}
						</PlaceTitleDetails>
						<PlaceContentDetails>
							{typeof value === "string"
								? capitalize(place[placeKey]).replace("_", " ")
								: place[placeKey]}
						</PlaceContentDetails>
					</PlaceFieldDetails>
				))}
			{Object.keys(place[place.building])
				.filter(placeSubKey => placeSubKey !== "_id")
				.map(placeSubKey => {
					const value = place[place.building][placeSubKey]

					return (
						<PlaceFieldDetails key={placeSubKey}>
							<PlaceTitleDetails>
								{addSpaceBetweenCapitalizeLetter(capitalize(placeSubKey))}
							</PlaceTitleDetails>
							<PlaceContentDetails>
								{typeof value === "string"
									? capitalize(value).replace("_", " ")
									: value}
							</PlaceContentDetails>
						</PlaceFieldDetails>
					)
				})}
		</dl>
	</div>
)
const PlaceTitleDetails = ({ className, ...props }) => (
	<dt
		className={cn(
			"text-sm font-medium leading-6 text-gray-900 dark:text-white",
			className,
		)}
		{...props}
	/>
)
const PlaceContentDetails = ({ className, ...props }) => (
	<dd
		className={cn(
			"mt-1 text-sm leading-6 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0",
			className,
		)}
		{...props}
	/>
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
