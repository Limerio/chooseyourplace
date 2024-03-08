import { PrismaClient } from "@prisma/client"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const handlerApi = handle => (req, res) => {
	const prisma = new PrismaClient()

	req.prisma = prisma

	return handle(req, res)
}

export const requiredArgSchema = type => ({
	required: true,
	type,
})
