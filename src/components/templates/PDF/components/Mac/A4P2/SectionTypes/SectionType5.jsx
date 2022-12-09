const sectionStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '0.6rem',
		textAlign: 'center',
		width: '308.5px',
	},

	table: {
		th: {
			fontSize: '6px',
			border: '0.1px solid grey',
			backgroundColor: '#ECEDF0',
		},
		td: {
			border: '0.1px solid grey',
			textAlign: 'start',
			paddingLeft: '3px',
		},
	},
};
const SectionType5 = ({ subHeaderTitles, content, styles }) => (
	<>
		<div style={{ ...sectionStyles.container, ...styles?.container }}>
			<table style={{ borderCollapse: 'collapse', ...styles?.table }}>
				<tr style={{ ...styles?.table?.tr }}>
					{subHeaderTitles.map((t, i) => (
						<th
							style={{ ...sectionStyles.table.th, ...styles?.table?.th }}
							key={i}
						>
							{t}
						</th>
					))}
				</tr>
				{content.map((c, index) => (
					<tr key={index}>
						{c.map((x, i) => (
							<td
								style={{ ...sectionStyles.table.td, ...styles?.table?.td }}
								key={i}
							>
								{i == 0 && `${index + 1}. `}
								{x}
							</td>
						))}
					</tr>
				))}
			</table>
		</div>
	</>
);

export default SectionType5;
