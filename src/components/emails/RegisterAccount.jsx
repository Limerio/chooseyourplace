import {
	Body,
	Container,
	Head,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components"

export const RegisterAccountEmail = ({ generatedLink, username = "Test" }) => (
	<Html>
		<Head />
		<Preview>Verified your account</Preview>
		<Tailwind>
			<Body className="bg-white text-black">
				<Container>
					<Section className="bg-white border-black my-10 px-10 py-4 rounded-md">
						<Text className="leading-tight">
							Hello {username}, please click to the button in the button to
							verify your email
						</Text>
						<Link
							href={generatedLink}
							className="bg-[#3b82f6] text-white p-3 rounded-lg"
						>
							Verify my email
						</Link>
					</Section>
				</Container>
			</Body>
		</Tailwind>
	</Html>
)

export default RegisterAccountEmail
