const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.6rem',
    textAlign: 'center',
    width: '10cm',
  },
  header: {
    padding: '3px',
    width: '100%',
    backgroundColor: '#5C6F85',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    th: {
      fontSize: '6px',
      backgroundColor: '#9AA5B3',
    },
    td: {
      textAlign: 'start',
      border: '0.1px solid grey',
    },
  },
};
const SectionType3 = ({ headerTitle, subHeaderTitles, content, styles }) => (
  <>
    <div style={{ ...sectionStyles.container, ...styles?.container }}>
      <div style={{ ...sectionStyles.header, ...styles?.header }}>
        <span>{headerTitle}</span>
      </div>
      <table style={{ borderCollapse: 'collapse', ...styles?.table }}>
        <tr style={{ ...styles?.table?.tr }}>
          {subHeaderTitles.map((t, i) => (
            <th
              style={{ ...sectionStyles.table.th, ...styles?.table?.th }}
              key={i}
            >
              {t}
            </th>
          ))}
        </tr>
        {content &&
          content.map((c, index) => (
            <tr key={index}>
              {c &&
                c.map((x, i) => (
                  <td
                    style={{ ...sectionStyles.table.td, ...styles?.table?.td }}
                    key={i}
                  >
                    <span style={{ padding: '5px' }}>
                      {i == 0 && `${index + 1}. `}
                      {x}
                    </span>
                  </td>
                ))}
            </tr>
          ))}
      </table>
    </div>
  </>
);

export default SectionType3;
