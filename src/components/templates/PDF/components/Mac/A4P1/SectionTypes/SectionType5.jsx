const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '9px',
    textAlign: 'center',
    width: '5.3cm',
  },
  header: {
    padding: '4px',
    border: '0.1px solid grey',
    background: 'rgba(74, 105, 189, 0.5)',
    display: 'flex',
    fontSize: '12px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  table: {
    td: {
      border: '0.1px solid grey',
      padding: '1.2px 0',
      minWidth: '15px',
    },
    tr: {
      border: '0.1px solid grey',
    },
  },
};
const SectionType5 = ({ headerTitle, content, styles }) => (
  <>
    <div style={{ ...sectionStyles.container, ...styles?.container }}>
      <div style={{ ...sectionStyles.header, ...styles?.header }}>
        <span>{headerTitle}</span>
      </div>
      <table style={{ borderCollapse: 'collapse', ...styles?.table }}>
        {content &&
          content.map((c, i) => (
            <tr
              style={{ ...sectionStyles.table.tr, ...styles?.table?.tr }}
              key={i}
            >
              <td
                style={{
                  ...sectionStyles.table.td,
                  textAlign: 'left',
                  paddingLeft: '7px',
                  ...styles?.table?.td,
                }}
              >
                {c[0]}
              </td>
              <td
                style={{
                  ...sectionStyles.table.td,
                  textAlign: 'center',
                  ...styles?.table?.td,
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

export default SectionType5;
