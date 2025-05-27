export default function SearchBar({ onChange }) {
	return (
		<div style={{ marginBottom: "20px" }}>
			<input
				type="text"
				placeholder="Search..."
				onChange={onChange}
				style={{
					padding: "10px",
					width: "100%",
					maxWidth: "400px",
					border: "1px solid #ccc",
					borderRadius: "5px",
				}}
			/>
		</div>
	);
}
