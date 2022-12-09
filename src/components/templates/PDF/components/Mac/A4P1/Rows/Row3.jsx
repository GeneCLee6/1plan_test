import SectionType2 from '../SectionTypes/SectionType2';
// import sectionData from '../PDFSectionsConfig.json';
import sectionData from '../useSectionData.js';

const styles = {
  container: {
    display: 'flex',
    height: '150px',
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
      <SectionType2 hasRowLines {...sectionData().section11} />
      <SectionType2 hasRowLines {...sectionData().section12} />
      <SectionType2 hasRowLines {...sectionData().section13} />
      <SectionType2 hasRowLines {...sectionData().section14} />
    </div>
  </>
);

export default Row3;
