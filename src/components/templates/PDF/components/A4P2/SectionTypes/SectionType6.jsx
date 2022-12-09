const sectionStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		fontSize: '9px',
		textAlign: 'center',
		width: '8cm',
	},
	header: {
		padding: '1.5px',
		border: '0.1px solid grey',
		background: '#9AA5B3',
		display: 'flex',
		fontSize: '12px',
		alignItems: 'center',
		justifyContent: 'center',
	},

	table: {
		td: {
			border: '0.1px solid grey',
		},
		tr: {
			border: '0.1px solid grey',
		},
	},
};
const SectionType6 = ({ headerTitle, subHeaderTitles, content, styles }) => (
	<>
		<div style={{ ...sectionStyles.container, ...styles?.container }}>
			<div style={{ ...sectionStyles.header, ...styles?.header }}>
				<span>{headerTitle}</span>
			</div>
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
				{content.map((c, i) => (
					<tr
						style={{ ...sectionStyles.table.tr, ...styles?.table?.tr }}
						key={i}
					>
						<td
							style={{
								...sectionStyles.table.td,
								textAlign: 'left',
								paddingLeft: '7px',
								...styles?.table?.td,
							}}
						>
							{`${i + 1}. `}
							{c[0]}
						</td>
						<td
							style={{
								...sectionStyles.table.td,
								textAlign: 'center',
								paddingBottom: '5px',
								...styles?.table?.td,
							}}
						>
							<div>{c[1]}</div>
							<div>{c[2]}</div>
						</td>
					</tr>
				))}
			</table>
		</div>
	</>
);

export default SectionType6;
