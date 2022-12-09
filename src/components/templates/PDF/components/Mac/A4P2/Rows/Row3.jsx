import SectionType6 from '../SectionTypes/SectionType6';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';
const styles = {
  container: {
    display: 'flex',
    //height: '176px',
    width: '22cm',
  },
  header: {
    title: {
      background: 'rgba(74, 105, 189, 0.8)',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '12px',
    },
  },
};

const Row3 = () => (
  <>
    <div style={styles.container}>
      <SectionType6 {...sectionData().section7} />
      <SectionType6 {...sectionData().section8} />
      <SectionType6 {...sectionData().section9} />
    </div>
  </>
);

export default Row3;
