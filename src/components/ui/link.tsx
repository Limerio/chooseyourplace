import NextLink from "next/link"
import { ComponentProps } from "react"

export const Link = (props: ComponentProps<typeof NextLink>) => <NextLink {...props} />
