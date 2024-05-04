import { jwtVerify, SignJWT } from "jose"

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
const alg = "HS256"

export const encrypt = async payload =>
	await new SignJWT(payload)
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime("24 hours")
		.sign(key)

export const decrypt = async token => {
	const { payload } = await jwtVerify(token, key, {
		algorithms: [alg],
	})

	return payload
}
