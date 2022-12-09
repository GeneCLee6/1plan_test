const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.6rem',
    textAlign: 'center',
    width: '5cm',
    minHeight: '80px',
    border: '0.1px solid black',
  },
  header: {
    padding: '2px',
    border: '0.1px solid grey',
    width: '100%',
    backgroundColor: '#7B61FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    th: {
      fontSize: '6px',
      border: '0.1px solid grey',
    },
    td: {
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
        <tr>
          {subHeaderTitles.map((t, i) => (
            <th
              style={{ ...sectionStyles.table.th, ...styles?.table?.th }}
              key={i}
            >
              {t}
            </th>
          ))}
        </tr>
        {content.map((c, index) => (
          <tr key={index}>
            {c.map((x, i) => (
              <td
                style={{ ...sectionStyles.table.td, ...styles?.table?.td }}
                key={i}
              >
                {x}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  </>
);

export default SectionType3;
