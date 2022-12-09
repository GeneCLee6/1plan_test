import { ChakraImage } from 'utils/images';
const img1 = require('assets/images/party.png');
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
			textAlign: 'center',
			fontSize: '7px',
			borderLeft: '0.1px solid grey',
			borderRight: '0.1px solid grey',
			height: '30px',
			paddingBottom: '8px',
		},
		th: {
			borderLeft: '0.1px solid grey',
			borderRight: '0.1px solid grey',
		},
		tr: {
			border: '0.1px solid grey',
		},
	},
};
const SectionType7 = ({ subHeaderTitles, content, styles }) => (
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
				{content.map((c, i) => (
					<tr
						style={{ ...sectionStyles.table.tr, ...styles?.table?.tr }}
						key={i}
					>
						<td
							style={{
								...sectionStyles.table.td,
								...styles?.table?.td,
								width: '200px',
							}}
						>
							{c[0]}
						</td>
						<td
							style={{
								...sectionStyles.table.td,
								...styles?.table?.td,
							}}
						>
							{c[1]}
						</td>
						<td
							style={{
								...sectionStyles.table.td,
								...styles?.table?.td,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<ChakraImage
								src={img1}
								objectFit="contain"
								width="15px"
								height="15px"
							/>
						</td>
					</tr>
				))}
			</table>
		</div>
	</>
);

export default SectionType7;
