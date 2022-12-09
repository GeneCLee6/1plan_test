import SectionType6 from '../SectionTypes/SectionType6';
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
      <SectionType6 {...sectionData().section28} />
      <SectionType6 {...sectionData().section29} />
      <SectionType6 {...sectionData().section30} />
      <SectionType6 {...sectionData().section31} />
      <SectionType6 {...sectionData().section32} />
    </div>
  </>
);

export default Row6;
