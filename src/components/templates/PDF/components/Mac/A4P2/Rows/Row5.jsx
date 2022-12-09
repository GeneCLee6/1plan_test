import SectionType7 from '../SectionTypes/SectionType7';
import SectionType8 from '../SectionTypes/SectionType8';
// import sectionData from '../PDFSections()Config.json';
import sectionData from '../useSectionData.js';
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    //height: '142px',
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

const Row5 = () => (
  <>
    <div style={styles.container}>
      <div style={styles.header.subTitle}>
        <div style={styles.header.subTitle2}>
          SHORT TERM - How I will know owner achieved their quarterly goals?
        </div>
        <div style={styles.header.subTitle1}>OWNER GOALS</div>
      </div>

      <div style={{ display: 'flex' }}>
        <div>
          <SectionType7 {...sectionData().section13} />
        </div>
        <div>
          <SectionType8 {...sectionData().section14} />
        </div>
        <div>
          <SectionType7 {...sectionData().section15} />
        </div>
      </div>
    </div>
  </>
);

export default Row5;
