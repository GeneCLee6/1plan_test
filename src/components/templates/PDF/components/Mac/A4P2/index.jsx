import React, { lazy, useContext } from 'react';
import { ChakraImage } from 'utils/images';
import { UserContext } from 'contexts/UserProvider';
const Row1 = lazy(() => import('./Rows/Row1'));
const Row2 = lazy(() => import('./Rows/Row2'));
const Row3 = lazy(() => import('./Rows/Row3'));
const Row4 = lazy(() => import('./Rows/Row4'));
const Row5 = lazy(() => import('./Rows/Row5'));
const Row6 = lazy(() => import('./Rows/Row6'));

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '22cm',
  },
  header: {
    width: '22cm',
    padding: '0 0 2px 3px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#0088CC',
    fontWeight: '35px',
    paddingBottom: '3px',
  },
};
export default function A4P2() {
  const {
    contextValue: { user },
  } = useContext(UserContext);
  const getQuarterEnding = () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const quarterMonth = Math.ceil(currentMonth / 3);
    const quarters = ['Mar', 'Jun', 'Sep', 'Dec'];
    return `${quarters[quarterMonth - 1]} ${date.getFullYear()}`;
  };
  return (
    <>
      <div style={styles.page}>
        <div style={styles.header}>
          <div
            style={{
              ...styles.headerTitle,
              marginLeft: '20px',
            }}
          >
            Prepared by: {`${user?.firstName} ${user?.lastName}`}
          </div>
          <div style={{ ...styles.headerTitle }}>
            Print Date: {new Date().toLocaleDateString()}
          </div>
          <div style={{ ...styles.headerTitle }}>
            Quarter Ending: {getQuarterEnding()}
          </div>
          <div style={{ padding: '2px 0 0 5px' }}>
            <ChakraImage
              src={require('assets/images/logo.png')}
              alt="logo.png"
              width="100px"
              height="20px"
              objectFit="contain"
            />
          </div>
        </div>
        <Row1 />
        <Row2 />
        <Row3 />
        <Row4 />
        <Row5 />
        <Row6 />
      </div>
    </>
  );
}
