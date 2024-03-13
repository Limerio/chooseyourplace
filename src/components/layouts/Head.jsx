import HeadNext from "next/head"

export const Head = ({ title, description }) => (
	<HeadNext>
		<title>{title}</title>
		<meta name="description" content={description} />

		{/* Opengrah */}
		<meta property="og:locale" content="en" />
		<meta property="og:title" content={title} />
		<meta property="og:type" content="website" />
		<meta name="og:description" content={description} />
		<meta property="og:site_name" content="chooseyourplace.com" />
		<meta property="og:url" content="https://chooseyourplace.com" />

		{/* Twitter */}
		<meta name="twitter:card" content="website" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
	</HeadNext>
)
