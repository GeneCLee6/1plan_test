const sectionStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '8px',
    textAlign: 'center',
    width: '5.67cm',
    height: '310px',
    // minHeight: '80px',
  },
  header: {
    padding: '4px 0',
    border: '0.1px solid grey',
    width: '100%',
    background: 'rgba(74, 105, 189, 0.5)',
    display: 'flex',
    fontSize: '12px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  table: {
    td: {
      border: '0.1px solid grey',
      padding: '0 0 3px 0',
      height: '18.5px',
      fontSize: '7px',
      minWidth: '10px',
    },
    mid: {
      tr: {
        borderBottom: '0.1px solid grey',
        borderRight: '0.1px solid grey',
      },
      val: {
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '5px',
        width: '100%',
      },
      end: {
        borderLeft: '0.1px solid grey',
      },
    },
  },
};
const SectionType4 = ({ headerTitle, content }) => (
  <>
    <div style={sectionStyles.container}>
      <div style={sectionStyles.header}>
        <span>{headerTitle}</span>
      </div>
      <table style={{ borderCollapse: 'collapse' }}>
        <tr>
          <td style={sectionStyles.table.td}>Yr. Ending</td>
          <td style={sectionStyles.table.td}>{content.yearEnding}</td>
          <td style={sectionStyles.table.td}># Of Owners</td>
          <td style={sectionStyles.table.td}>{content.numberOfOwners}</td>
        </tr>
        <tr>
          <td style={sectionStyles.table.td}>No. Client</td>
          <td style={sectionStyles.table.td}>{content.noClient}</td>
          <td style={sectionStyles.table.td}>Avg. Sales</td>
          <td style={sectionStyles.table.td}>{content.avgSales}</td>
        </tr>
        <tr>
          <td colSpan="2" style={sectionStyles.table.td}>
            Revenue
          </td>
          <td colSpan="2" style={sectionStyles.table.td}>
            ${content.revenue}
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            Marketing Spend
          </td>
          <td colSpan="2" style={sectionStyles.table.mid.val}>
            <span>${content.marketingSpend[0]}</span>
          </td>
          <td style={sectionStyles.table.mid.end}>
            <span>{content.marketingSpend[1]}%</span>
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            Cost of Goods
          </td>
          <td colSpan="2" style={sectionStyles.table.mid.val}>
            <span>${content.costOfGoods[0]}</span>
          </td>
          <td style={sectionStyles.table.mid.end}>
            <span>{content.costOfGoods[1]}%</span>
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            Direct Labour
          </td>
          <td colSpan="2" style={sectionStyles.table.mid.val}>
            <span>${content.directLabour[0]}</span>
          </td>
          <td style={sectionStyles.table.mid.end}>
            <span>{content.directLabour[1]}%</span>
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            Gross Profit Sales
          </td>
          <td colSpan="2" style={sectionStyles.table.mid.val}>
            <span>${content.grossProfitSales[0]}</span>
          </td>
          <td style={sectionStyles.table.mid.end}>
            <span>{content.grossProfitSales[1]}%</span>
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            Overhead of Sales
          </td>
          <td colSpan="2" style={sectionStyles.table.mid.val}>
            <span>${content.overheadOfSales[0]}</span>
          </td>
          <td style={sectionStyles.table.mid.end}>
            <span>{content.overheadOfSales[1]}%</span>
          </td>
        </tr>
        <tr style={sectionStyles.table.mid.tr}>
          <td colSpan="2" style={sectionStyles.table.td}>
            EBIT
          </td>
          <td
            colSpan="2"
            style={{ ...sectionStyles.table.mid.val, justifyContent: 'center' }}
          >
            <span>{content.ebit}</span>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={sectionStyles.table.td}>
            Owners&apos; Hrs p.w. / Profit
          </td>
          <td colSpan="1" style={sectionStyles.table.td}>
            <span>{content.ownerProfit[0]}</span>
          </td>
          <td colSpan="1" style={sectionStyles.table.td}>
            <span>{content.ownerProfit[1]}</span>
          </td>
        </tr>
        <tr>
          <td style={sectionStyles.table.td}>No. Staff</td>
          <td style={sectionStyles.table.td}>{content.numberOfStaff}</td>
          <td style={sectionStyles.table.td}>Rev/Staff</td>
          <td style={sectionStyles.table.td}>{content.revStaff}</td>
        </tr>
        <tr>
          <td style={sectionStyles.table.td}>Cust. Retention Rate %</td>
          <td style={sectionStyles.table.td}>{content.custRetentionRate}</td>
          <td style={sectionStyles.table.td}>Owner&apos;s $/Hr</td>
          <td style={sectionStyles.table.td}>${content.ownerHourRate}</td>
        </tr>
        <tr>
          <td style={sectionStyles.table.td}>New Customers</td>
          <td style={sectionStyles.table.td}>{content.newCustomers}</td>
          <td style={sectionStyles.table.td}>Cust Acqt Cost</td>
          <td style={sectionStyles.table.td}>{content.custAcqtCost}</td>
        </tr>
      </table>
    </div>
  </>
);

export default SectionType4;
