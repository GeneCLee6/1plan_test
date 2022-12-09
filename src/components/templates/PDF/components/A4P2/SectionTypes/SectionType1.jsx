const sectionStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '0.6rem',
		textAlign: 'center',
		width: '7cm',
	},
	header: {
		padding: '3px',
		border: '0.1px solid grey',
		width: '100%',
		backgroundColor: '#5C6F85',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	subHeader: {
		border: '0.1px solid grey',
		width: '100%',
		backgroundColor: '#9AA5B3',
		height: '35px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '7px',
	},
	content: {
		padding: '10px 8px',
		fontSize: '8.5px',
		height: '100%',
		textAlign: 'left',
	},
};
const SectionType1 = ({ headerTitle, subHeaderTitle, content, styles }) => {
	return (
		<>
			<div
				style={{
					...sectionStyles.container,
					...styles?.container,
				}}
			>
				<div style={{ ...sectionStyles.header, ...styles?.header }}>
					<span>{headerTitle}</span>
				</div>
				{subHeaderTitle !== undefined && (
					<div style={{ ...sectionStyles.subHeader, ...styles?.subHeader }}>
						<span>{subHeaderTitle}</span>
					</div>
				)}
				<tbody style={{ ...sectionStyles.content, ...styles?.content }}>
					{content.map((c, i) => (
						<tr key={i}>
							<td>{`${i + 1}. `}</td>
							<td>{c}</td>
						</tr>
					))}
				</tbody>
			</div>
		</>
	);
};

export default SectionType1;
