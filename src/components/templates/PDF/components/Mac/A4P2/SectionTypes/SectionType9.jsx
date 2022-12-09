import React from 'react';

const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.6rem',
    textAlign: 'center',
    width: '5cm',
    minHeight: '80px',
  },
  header: {
    padding: '3px',
    border: '0.1px solid grey',
    width: '100%',
    backgroundColor: '#7B61FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subHeader: {
    border: '0.1px solid grey',
    width: '100%',
    backgroundColor: '#B2B2B2',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '7px',
  },
  content: {
    padding: '10px 0px',
    fontSize: '8.5px',
    border: '0.1px solid grey',
    height: '100%',
    textAlign: 'left',
  },
};
const SectionType2 = ({
  headerTitle,
  subHeaderTitle,
  content,
  styles,
  hasRowLines,
}) => {
  return (
    <>
      <div
        style={{
          ...sectionStyles.container,
          ...styles?.container,
        }}
      >
        <div style={{ ...sectionStyles.header, ...styles?.header }}>
          <span>{headerTitle}</span>
        </div>
        {subHeaderTitle !== undefined && (
          <div style={{ ...sectionStyles.subHeader, ...styles?.subHeader }}>
            <span>{subHeaderTitle}</span>
          </div>
        )}
        <div style={{ ...sectionStyles.content, ...styles?.content }}>
          {content &&
            content.map((c, i) => (
              <React.Fragment key={i}>
                <tr>
                  <div style={{ padding: '0 8px', ...styles?.contentTrDiv }}>
                    <td>{`${i + 1}. `}</td>
                    <td>{c}</td>
                  </div>
                </tr>
                {hasRowLines && i < content.length - 1 && (
                  <hr style={{ borderBottom: '0.1px solid grey' }} />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

export default SectionType2;
