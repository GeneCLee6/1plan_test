import SectionType5 from '../SectionTypes/SectionType5';
import SectionType4 from '../SectionTypes/SectionType4';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
	container: {
		display: 'flex',
		height: '297px',
	},
	header: {
		title1: {
			textAlign: 'center',
			fontWeight: 'bold',
			backgroundColor: 'rgba(74, 105, 189, 0.8)',
			fontSize: '12px',
			height: '30px',
		},
		title2: {
			backgroundColor: '#9AA5B3',
			fontSize: '9px',
			height: '29px',
			textAlign: 'center',
			paddingTop: '5px',
		},
	},
};

const Row2 = () => (
	<>
		<div style={styles.container}>
			<div>
				<div style={styles.header.title1}></div>
				<div style={{ display: 'flex' }}>
					<SectionType4 {...sectionData().section4} />
				</div>
			</div>
			<div>
				<div style={styles.header.title2}>QUARTERLY PRIORITIES</div>
				<div style={{ display: 'flex' }}>
					<SectionType5 {...sectionData().section5} />
					<SectionType5 {...sectionData().section6} />
				</div>
			</div>
		</div>
	</>
);

export default Row2;
