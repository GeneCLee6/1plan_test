import SectionType2 from '../SectionTypes/SectionType2';
import SectionType3 from '../SectionTypes/SectionType3';
import SectionType4 from '../SectionTypes/SectionType4';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';
const styles = {
  container: {
    display: 'flex',
    height: '299.5px',
  },
  header: {
    title: {
      background: 'rgba(74, 105, 189, 0.8)',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '12px',
      height: '30px',
    },
  },
};

const Row2 = () => (
  <>
    <div style={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <SectionType2 {...sectionData().section6} />
        <SectionType3 {...sectionData().section7} />
      </div>
      <div>
        <div style={styles.header.title}>STEP 5: THE NUMBERS</div>
        <div style={{ display: 'flex' }}>
          <SectionType4 {...sectionData().section8} />
          <SectionType4 {...sectionData().section9} />
          <SectionType4 {...sectionData().section10} />
        </div>
      </div>
    </div>
  </>
);

export default Row2;
