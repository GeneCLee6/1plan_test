const sectionStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '0.6rem',
		textAlign: 'center',
		width: '4cm',
		minHeight: '80px',
	},
	header: {
		padding: '3px',
		border: '0.1px solid grey',
		width: '100%',
		backgroundColor: '#7B61FF',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	subHeader: {
		padding: '2px',
		border: '0.1px solid grey',
		width: '100%',
		backgroundColor: 'rgba(123, 97, 255, 0.5)',
		height: '60px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		padding: '10px 8px',
		fontSize: '8.5px',
		border: '0.1px solid grey',
		height: '100%',
	},
};
const SectionType1 = ({ headerTitle, subHeaderTitle, content, styles }) => (
	<>
		<div style={sectionStyles.container}>
			<div style={{ ...sectionStyles.header, ...styles?.header }}>
				<span>{headerTitle}</span>
			</div>
			<div style={{ ...sectionStyles.subHeader, ...styles?.subheader }}>
				<span>{subHeaderTitle}</span>
			</div>
			<div style={{ ...sectionStyles.content, ...styles?.content }}>
				<span>{content}</span>
			</div>
		</div>
	</>
);

export default SectionType1;
