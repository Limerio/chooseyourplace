export const Error = ({ isError, children }) => {
	if (isError) {
		return <div className="bg-red-600">{data.error}</div>
	}

	return children
}
