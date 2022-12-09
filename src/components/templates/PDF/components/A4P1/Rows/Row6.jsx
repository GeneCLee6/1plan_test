import SectionType2 from '../SectionTypes/SectionType2';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: '120px',
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

const Row6 = () => (
	<>
		<div style={styles.container}>
			<SectionType2 {...sectionData().section28} />
			<SectionType2 {...sectionData().section29} />
			<SectionType2 {...sectionData().section30} />
			<SectionType2 {...sectionData().section31} />
			<SectionType2 {...sectionData().section32} />
		</div>
	</>
);

export default Row6;
