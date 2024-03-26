import type { ReactNode } from "react"

export type Constructors =
	| StringConstructor
	| BooleanConstructor
	| NumberConstructor
	| ArrayConstructor
	| ObjectConstructor

export type ReactChildren<Props = unknown> = Props & {
	children: ReactNode
}

export type LangsType = "en" | "fr"

export type Buildings = "bar" | "restaurant" | "museum" | "park"

export type ReadonlyStringArray = Readonly<[string, ...string[]]>
