import { Resend } from "resend"

/**
 *
 * @param {string} to
 * @param {string} subject
 * @param {import("react").ReactElement} react
 */

export const sendEmail = (to, subject, react) => {
	const resend = new Resend(process.env.RESEND_KEY)

	resend.emails.send({
		from: "onboarding@resend.dev",
		to,
		subject,
		react,
	})
}
