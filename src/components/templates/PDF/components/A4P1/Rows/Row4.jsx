import SectionType2 from '../SectionTypes/SectionType2';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '202px',
		width: '21.99cm',
	},
	header: {
		title: {
			background: '#7BCDBE',
			textAlign: 'center',
			fontWeight: 'bold',
			fontSize: '10px',
			padding: '3px 0',
			border: '0.1px solid grey',
		},
		subTitle: {
			background: 'rgba(123, 205, 190, 0.5)',
			padding: '5px 0',
			border: '0.1px solid grey',
		},
	},
};

const Row4 = () => (
	<>
		<div style={styles.container}>
			<div style={styles.header.title}>
				STEP 2: WHAT HAVE I GOT TO WORK WITH AND WHAT ARE THE VALUATION DRIVERS
				OF MY BUSINESS?
			</div>
			<div style={styles.header.subTitle}></div>
			<div style={{ display: 'flex' }}>
				<div>
					<div style={{ display: 'flex' }}>
						<SectionType2 {...sectionData().section15} />
						<SectionType2 {...sectionData().section16} />
					</div>
					<div style={{ display: 'flex' }}>
						<SectionType2 {...sectionData().section17} />
						<SectionType2 {...sectionData().section18} />
					</div>
				</div>
				<div>
					<div style={{ display: 'flex' }}>
						<SectionType2 {...sectionData().section19} />
						<SectionType2 {...sectionData().section20} />
					</div>
					<div style={{ display: 'flex' }}>
						<SectionType2 {...sectionData().section21} />
						<SectionType2 {...sectionData().section22} />
					</div>
				</div>
			</div>
		</div>
	</>
);

export default Row4;
