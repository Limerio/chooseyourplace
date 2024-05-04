import { decrypt } from "@/lib/jwt"
import { loginRequiredPaths } from "@/utils/constants"
import { NextResponse } from "next/server"

/**
 *
 * @param {import("next/server").NextRequest} req
 * @returns
 */
export const middleware = async req => {
	if (
		loginRequiredPaths.find(path => path === req.nextUrl.pathname) ||
		(req.nextUrl.pathname.startsWith("/places") &&
			req.nextUrl.pathname.endsWith("/update"))
	) {
		const sessionToken = req.cookies.get("session")?.value

		if (!sessionToken) {
			return NextResponse.rewrite(new URL("/login", req.url))
		}

		const { user } = await decrypt(sessionToken)

		if (!user?.username) {
			return NextResponse.rewrite(new URL("/login", req.url))
		}

		return NextResponse.next()
	}

	return NextResponse.next()
}
