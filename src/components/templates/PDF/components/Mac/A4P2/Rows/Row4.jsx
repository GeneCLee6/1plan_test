import SectionType7 from '../SectionTypes/SectionType7';
import SectionType8 from '../SectionTypes/SectionType8';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    //height: '165px',
    width: '21.99cm',
  },
  header: {
    title: {
      background: '#E17EAD',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '8px',
      padding: '5px 0',
      border: '0.1px solid grey',
      height: '25px',
    },
    subTitle: {
      background: '#EDAFCB',
      fontSize: '0.5rem',
      border: '0.1px solid grey',
      display: 'flex',
      justifyContent: 'center',
      height: '22px',
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
      paddingBottom: '3px',
    },
  },
};

const Row4 = () => (
  <>
    <div style={styles.container}>
      <div style={styles.header.title}>
        STEP 4: MEASUREMENT, RESULTS & CELEBRATIONS
      </div>
      <div style={styles.header.subTitle}>
        <div style={styles.header.subTitle2}>
          SHORT TERM - How I will know my team achieved their quarterly goals?
        </div>
        <div style={styles.header.subTitle1}>TEAM GOALS</div>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <SectionType7 {...sectionData().section10} />
        </div>
        <div>
          <SectionType8 {...sectionData().section11} />
        </div>
        <div>
          <SectionType7 {...sectionData().section12} />
        </div>
      </div>
    </div>
  </>
);

export default Row4;
