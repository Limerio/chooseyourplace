import { cn } from "@/utils/functions"
import NextLink from "next/link"

export const Link = ({ className, ...props }) => (
	<NextLink className={cn(className)} {...props} />
)
