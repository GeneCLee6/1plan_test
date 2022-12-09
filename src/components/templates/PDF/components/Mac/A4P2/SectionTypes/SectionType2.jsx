import { ChakraImage } from 'utils/images';
import { useEffect, useRef } from 'react';

const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.6rem',
    textAlign: 'center',
    width: '5.1cm',
  },
  header: {
    padding: '3px',
    border: '0.1px solid grey',
    width: '100%',
    backgroundColor: '#5C6F85',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    padding: '2px',
    border: '0.1px solid grey',
    width: '100%',
    backgroundColor: '#9AA5B3',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: '8.5px',
    borderLeft: '0.1px solid grey',
    borderRight: '0.1px solid grey',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};
const SectionType2 = ({ headerTitle, subHeaderTitle, content, styles }) => {
  const isMounted = useRef(false);
  const imgRef = useRef(null);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      loadImage(content);
    }
  }, []);
  const loadImage = async (imageLink) => {
    if (imageLink != '') {
      const response = await fetch(imageLink);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob.slice(0, 4000));
      imgRef.current.src = url;
    } else {
      const nullImage = require('assets/images/null.jpg');
      imgRef.current.src = nullImage;
    }
  };
  return (
    <>
      <div style={{ ...sectionStyles.container, ...styles?.container }}>
        <div style={{ ...sectionStyles.header, ...styles?.header }}>
          <span>{headerTitle}</span>
        </div>
        <div style={{ ...sectionStyles.subHeader, ...styles?.subHeader }}>
          <span>{subHeaderTitle}</span>
        </div>
        <div style={{ ...sectionStyles.content, ...styles?.content }}>
          <ChakraImage ref={imgRef} objectFit="cover" height="100%" />
        </div>
      </div>
    </>
  );
};

export default SectionType2;
