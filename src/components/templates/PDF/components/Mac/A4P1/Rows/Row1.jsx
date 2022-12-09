import SectionType1 from '../SectionTypes/SectionType1';
import SectionType2 from '../SectionTypes/SectionType2';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';
const styles = {
  container: {
    display: 'flex',
  },
  header: {
    title1: {
      textAlign: 'center',
      fontWeight: 'bold',
      backgroundColor: 'rgba(123, 97, 255,0.8)',
      border: '0.1px solid grey',
      fontSize: '12px',
      height: '30px',
    },
    title2: {
      backgroundColor: 'rgba(123, 97, 255,0.8)',
      fontSize: '8px',
      border: '0.1px solid grey',
      height: '30px',
      textAlign: 'center',
      paddingTop: '2px',
    },
  },
};

const Row1 = () => (
  <>
    <div style={styles.container}>
      <div>
        <div style={styles.header.title1}>STEP 1: WHAT DO I WANT TO DO?</div>
        <div style={{ display: 'flex' }}>
          <SectionType1 {...sectionData().section1} />
          <SectionType1 {...sectionData().section2} />
          <SectionType1 {...sectionData().section3} />
          <SectionType2 hasRowLines {...sectionData().section4} />
        </div>
      </div>
      <div>
        <div style={styles.header.title2}>
          10 bussiness plan to year - Last 11/03/2022
        </div>
        <div style={{ display: 'flex', height: '145px' }}>
          <SectionType2 hasRowLines {...sectionData().section5} />
        </div>
      </div>
    </div>
  </>
);

export default Row1;
