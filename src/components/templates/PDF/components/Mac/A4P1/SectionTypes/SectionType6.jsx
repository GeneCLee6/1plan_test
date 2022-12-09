const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '8.5px',
    textAlign: 'center',
    width: '5.3cm',
  },
  header: {
    padding: '2px',
    border: '0.1px solid grey',
    background: 'rgba(74, 105, 189, 0.5)',
    display: 'flex',
    fontSize: '9.6px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  table: {
    td: {
      border: '0.1px solid grey',
      padding: '1.2px 0',
      height: '20px',
      fontSize: '8px',
    },
    tr: {
      border: '0.1px solid grey',
    },
  },
};
const SectionType6 = ({ headerTitle, content, styles }) => (
  <>
    <div style={{ ...sectionStyles.container, ...styles?.container }}>
      <div style={{ ...sectionStyles.header, ...styles?.header }}>
        <span>{headerTitle}</span>
      </div>
      <table style={{ borderCollapse: 'collapse', ...styles?.table }}>
        {console.log('1', content)}
        {content &&
          content.map((c, i) => (
            <tr style={{ ...sectionStyles.table.tr }} key={i}>
              <td
                style={{
                  ...sectionStyles.table.td,
                  textAlign: 'left',
                  paddingLeft: '7px',
                  width: '110px',
                }}
              >
                {c[0]}
              </td>
              <td
                style={{
                  ...sectionStyles.table.td,
                  textAlign: 'center',
                  width: 'auto',
                }}
              >
                {c[1]}
              </td>
            </tr>
          ))}
      </table>
    </div>
  </>
);

export default SectionType6;
