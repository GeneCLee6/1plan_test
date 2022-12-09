import SectionType2 from '../SectionTypes/SectionType2';
import SectionType5 from '../SectionTypes/SectionType5';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '136x',
		width: '21.99cm',
	},
	header: {
		title: {
			background: 'rgba(123, 205, 190, 0.5)',
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '10px',
			padding: '3px 0',
			border: '0.1px solid grey',
		},
	},
};

const Row5 = () => (
	<>
		<div style={styles.container}>
			<div style={styles.header.title}>BUSINESS DRIVERS & PROCESSES</div>
			<div style={{ display: 'flex' }}>
				<SectionType5 {...sectionData().section23} />
				<SectionType5 {...sectionData().section24} />
				<SectionType2 hasRowLines {...sectionData().section25} />
				<SectionType2 hasRowLines {...sectionData().section26} />
				<SectionType5 {...sectionData().section27} />
			</div>
		</div>
	</>
);

export default Row5;
