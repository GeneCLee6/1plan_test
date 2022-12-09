import SectionType7 from '../SectionTypes/SectionType7';
import SectionType8 from '../SectionTypes/SectionType8';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';
const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '193px',
		width: '21.99cm',
	},
	header: {
		title: {
			background: '#E17EAD',
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '10px',
			padding: '3px 0',
			border: '0.1px solid grey',
		},
		subTitle: {
			background: '#EDAFCB',
			fontSize: '0.6rem',
			border: '0.1px solid grey',
			display: 'flex',
			height: '17px',
			justifyContent: 'center',
		},
		subTitle1: {
			background: '#EDAFCB',
			fontSize: '0.5rem',
			textAlign: 'center',
			width: '340px',
		},
		subTitle2: {
			background: '#EDAFCB',
			fontSize: '0.5rem',
			width: '600px',
			borderRight: '0.1px solid grey',
			textAlign: 'center',
			paddingBottom: '10px',
		},
	},
};

const Row6 = () => (
	<>
		<div style={styles.container}>
			<div style={styles.header.subTitle}>
				<div style={styles.header.subTitle2}>
					LONG TERM - How I will know owner achieved their quarterly goals?
				</div>
				<div style={styles.header.subTitle1}>OWNER ANNUAL GOALS</div>
			</div>

			<div style={{ display: 'flex' }}>
				<div>
					<SectionType7 {...sectionData().section16} />
				</div>
				<div>
					<SectionType8 {...sectionData().section17} />
				</div>
				<div>
					<SectionType7 {...sectionData().section18} />
				</div>
			</div>
		</div>
	</>
);

export default Row6;
