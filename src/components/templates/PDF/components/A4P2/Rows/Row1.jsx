import SectionType1 from '../SectionTypes/SectionType1';
import SectionType2 from '../SectionTypes/SectionType2';
import SectionType3 from '../SectionTypes/SectionType3';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
	container: {
		width: '22cm',
	},
	headerContainer: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: 'rgba(51, 75, 102,0.8)',
		fontWeight: 'bold',
		border: '1px solid grey',
		height: '30px',
	},
	header: {
		title1: {
			borderRight: '0.5px solid grey',
			textAlign: 'center',
			fontSize: '12px',
			flex: '400px',
		},
		title2: {
			borderLeft: '0.5px solid grey',
			fontSize: '14px',
			textAlign: 'center',
			flex: '100px',
		},
	},
	sectionContainer1: {
		flex: '200px',
		border: '0.3px solid grey',
		display: 'flex',
	},
	sectionContainer2: {
		flex: '200px',
		border: '0.3px solid grey',
	},
};

const Row1 = () => (
	<>
		<div style={styles.container}>
			<div style={styles.headerContainer}>
				<div style={styles.header.title1}>
					STEP 3: WHAT I NEED TO DO AND WHEN I AM GOING TO DO IT?
				</div>
				<div style={styles.header.title2}>Industry: Distribution</div>
			</div>
			<div style={{ display: 'flex' }}>
				<div style={styles.sectionContainer1}>
					<SectionType1 {...sectionData().section1} />
					<SectionType2 {...sectionData().section2} />
				</div>
				<div style={styles.sectionContainer2}>
					<SectionType3 {...sectionData().section3} />
				</div>
			</div>
		</div>
	</>
);

export default Row1;
