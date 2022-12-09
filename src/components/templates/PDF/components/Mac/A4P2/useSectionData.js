import useSectionContent from './useSectionContent';
export default function useSectionData() {
  const content = useSectionContent();
  return {
    section1: {
      headerTitle: 'QUARTERLY PRIORITIES',
      subHeaderTitle: 'Prioritized by 80/20 rule',
      content: content.getSection1Content(),
      // [
      // 	'Find best performing brands and remove poor performers',
      // 	'Commence and trial own home brand product',
      // 	'Expand home brand product and work on warehouse facilities',
      // 	'Commence and trial own home brand product',
      // 	'Commence and trial own home brand product',
      // ],
      styles: {
        header: {
          background: 'rgba(51, 75, 102,0.5)',
          height: '28px',
          border: 'none',
          borderRight: '0.5px solid grey',
        },
        subHeader: {
          backgroundColor: '#ECEDF0',
          fontSize: '12px',
          height: '40px',
        },
        container: {
          height: '180px',
          width: '7cm',
        },
        contentTrDiv: {
          height: '20px',
          padding: '3px 5px',
          fontSize: '7.5px',
        },
      },
    },
    section2: {
      headerTitle: 'Quartily Theme Name',
      subHeaderTitle: 'name',
      content: content.getSection2Content(),

      styles: {
        content: {
          height: '131px',
        },
        container: {
          width: '6cm',
        },
        subHeader: {
          backgroundColor: '#ECEDF0',
          fontSize: '12px',
          height: '27px',
        },
        header: {
          background: 'rgba(51, 75, 102,0.5)',
          height: '22px',
          border: 'none',
        },
      },
    },
    section3: {
      headerTitle: 'DEPARTMENT',
      subHeaderTitles: ['Deaprtments', 'Rank %', 'Improvement ideas'],
      content: content.getSection3Content(),
      // [
      // 	['Sales & Market', '32', 'Expand market into Souther'],
      // 	[
      // 		'Customer Service & Support',
      // 		'70',
      // 		'Introduce a head of department in organisation structure',
      // 	],
      // 	['Administration', '13', ' Add automation to the accounts'],
      // 	['Distribution', '30', 'Good Star'],
      // 	[
      // 		'Business Development & Management',
      // 		'84',
      // 		'Bring on a logistics Manager',
      // 	],
      // ],
      styles: {
        container: {
          width: '8.5m',
        },
        header: {
          background: 'rgba(51, 75, 102,0.5)',
          fontSize: '12px',
          height: '23px',
        },
        table: {
          tr: {
            height: '26px',
          },
          th: {
            backgroundColor: '#ECEDF0',
            maxHeight: '22px',
            minHeight: '22px',
            fontSize: '7px',
            border: '0.3px solid grey',
          },
          td: {
            height: '24.2px',
            padding: '0 0 5px 0',
          },
        },
      },
    },

    //TODO: dynamic content
    section4: {
      headerTitle: 'Key Financial Targets (90 Days)',
      content: content.getSection4Content(),
      // {
      // 	yearEnding: 2022,
      // 	noClient: 'N2',
      // 	numberOfOwners: 100,
      // 	avgOrder: 334,
      // 	revenue: '9.42k',
      // 	marketingSpend: ['9,036', 0.32],
      // 	costOfGoods: ['9.42k', 0.32],
      // 	directLabour: ['9.42k', 0.32],
      // 	grossProfitSales: ['9.42k', 0.32],
      // 	overheadOfSales: ['9.42k', 0.32],
      // 	ebit: '$78,343,680,000',
      // 	ownerProfit: [65,30],
      // 	numberOfStaff: 9,
      // 	custRetentionRate: 9,
      // 	newCustomers: 9,
      // 	revStaff: 104667,
      // 	ownerHourRate: 36,
      // 	custAcqtCost: 33,
      // },
    },
    section5: {
      subHeaderTitles: ['Quarterly Actions - You (CEO)', 'Who/When'],
      content: content.getSection5Content(),
      // [
      // 	['Place job ads on Seek/Indeed', 'HR/Office Assistant 11/03/2022'],
      // 	['Setup error tracking system', 'HR/Office Assistant 11/03/2022'],
      // 	[
      // 		'Setup appointments with potenial suppliers',
      // 		'Office Manager 11/03/2022',
      // 	],
      // 	['Layout territory list for new rep', 'Office Manager 11/03/2022'],
      // 	['Set Queensland budget for 2022', 'Office Manager 11/03/2022'],
      // 	['Set Queensland budget for 2022', 'Office Manager 11/03/2022'],
      // ],
      styles: {
        table: {
          tr: {
            height: '28px',
          },
          th: {
            height: '20px',
            fontSize: '9px',
          },
          td: {
            height: '48px',
            padding: '5px 10px 5px 3px',
          },
        },
      },
    },
    section6: {
      subHeaderTitles: ['Quarterly Actions - Others', 'Who/When'],
      content: content.getSection6Content(),
      //  [
      // 	['Place job ads on Seek/Indeed', 'HR/Office Assistant 11/03/2022'],
      // 	['Setup error tracking system', 'HR/Office Assistant 11/03/2022'],
      // 	[
      // 		'Setup appointments with potenial suppliers',
      // 		'Office Manager 11/03/2022',
      // 	],
      // 	['Layout territory list for new rep', 'Office Manager 11/03/2022'],
      // 	['Set Queensland budget for 2022', 'Office Manager 11/03/2022'],
      // 	['Set Queensland budget for 2022', 'Office Manager 11/03/2022'],
      // ],
      styles: {
        table: {
          tr: {
            height: '28px',
          },
          th: {
            height: '20px',
            fontSize: '9px',
          },
          td: {
            height: '48px',
            padding: '5px 10px 5px 3px',
          },
        },
      },
    },
    section7: {
      headerTitle: 'PEOPLE I NEED',
      subHeaderTitles: [
        'Outsourcing, Contractors, Freelancers... etc',
        'Cost Timing',
      ],
      content: content.getSection7Content(),
      // [
      // 	['Queensland rep', '$10,000', '11/03/2022'],
      // 	['HR to induct new rep', '$0', '11/03/2022'],
      // 	['IT to integrate supplier stock invoices', '$5,000', '11/03/2022'],
      // 	['Employment lawyer', '$2,000', '11/03/2022'],
      // 	['Fridge installer & train on use', '$0', '11/03/2022'],
      // ],
      styles: {
        table: {
          tr: {
            height: '16px',
          },
          th: {
            height: '17px',
            fontSize: '7px',
            border: '0.1px solid grey',
            backgroundColor: '#ECEDF0',
          },
          td: {
            height: '16px',
            paddingLeft: '3px',
            fontSize: '6px',
          },
        },
      },
    },
    section8: {
      headerTitle: 'RESOURCES I NEED',
      subHeaderTitles: ['Plant, Equipment, Tools Vehicles, etc', 'Cost Timing'],
      content: content.getSection8Content(),
      // [
      // 	['Truck (2Palette capacity)', '$10,000', '11/03/2022'],
      // 	['New premise', '$0', '11/03/2022'],
      // 	['HP of existing 40ft fridge', '$5,000', '11/03/2022'],
      // 	['10ft freezer', '$2,000', '11/03/2022'],
      // 	['Uniforms for new sales rep', '$0', '11/03/2022'],
      // ],
      styles: {
        table: {
          tr: {
            height: '16px',
          },
          th: {
            height: '17px',
            fontSize: '7px',
            border: '0.1px solid grey',
            backgroundColor: '#ECEDF0',
          },
          td: {
            height: '16px',
            paddingLeft: '3px',
            fontSize: '6px',
          },
        },
      },
    },
    section9: {
      headerTitle: 'PROCESSES I NEED',
      subHeaderTitles: [
        'Apps, Subscriptions, Policies, Proceduress etc',
        'Cost Timing',
      ],
      content: content.getSection9Content(),
      //  [
      // 	['Terms of trade for way better drinks', '$10,000', '11/03/2022'],
      // 	['How to automate overdue reminders (post terms)?', '$0', '11/03/2022'],
      // 	['Refresh', '$5,000', '11/03/2022'],
      // 	[
      // 		'J Curve consultant to setup online ordering and promos',
      // 		'$2,000',
      // 		'11/03/2022',
      // 	],
      // 	[
      // 		'Update job description for new Sales rep position',
      // 		'$0',
      // 		'11/03/2022',
      // 	],
      // ],
      styles: {
        table: {
          tr: {
            height: '16px',
          },
          th: {
            height: '17px',
            fontSize: '7px',
            border: '0.1px solid grey',
            backgroundColor: '#ECEDF0',
          },
          td: {
            height: '16px',
            paddingLeft: '3px',
            fontSize: '6px',
          },
        },
      },
    },
    section10: {
      subHeaderTitles: ["Quarter's Achievement #", 'Measure #', 'Result'],
      content: content.getSection10Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26.3px',
          },
          th: {
            height: '18px',
            fontSize: '7px',
          },
          td: {
            height: '21.3px',
          },
        },
      },
    },

    section11: {
      headerTitle: 'TEAM REWARD CELEBRATION',
      content: content.getSection11Content(),
      // 'assets/images/theme.jpeg',
    },
    section12: {
      subHeaderTitles: ["Quarter's Achievement #", 'Measure #', 'Result'],
      content: content.getSection12Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26.3px',
          },
          th: {
            height: '18px',
            fontSize: '7px',
          },
          td: {
            height: '21.3px',
          },
        },
      },
    },
    section13: {
      subHeaderTitles: ["Quarter's Achievement #", 'Measure #', 'Result'],
      content: content.getSection13Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26.3px',
          },
          th: {
            height: '18px',
            fontSize: '7px',
          },
          td: {
            height: '21.3px',
          },
        },
      },
    },

    section14: {
      headerTitle: 'OWNER REWARD CELEBRATION',
      content: content.getSection14Content(),
      // 'assets/images/theme.jpeg',
    },
    section15: {
      subHeaderTitles: ["Quarter's Achievement #", 'Measure #', 'Result'],
      content: content.getSection15Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26.3px',
          },
          th: {
            height: '18px',
            fontSize: '7px',
          },
          td: {
            height: '21.3px',
          },
        },
      },
    },
    section16: {
      subHeaderTitles: ['Annual Achievement #', 'Measure #', 'Result'],
      content: content.getSection16Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26px',
          },
          th: {
            height: '26px',
            fontSize: '7px',
          },
          td: {
            height: '21px',
            paddingBottom: '13px',
          },
        },
      },
    },
    section17: {
      headerTitle: 'ANNUAL OWNER REWARD CELEBRATION',
      content: content.getSection17Content(),
      //  'assets/images/theme.jpeg',
      styles: {
        content: {
          height: '107px',
        },
      },
    },
    section18: {
      subHeaderTitles: ['Annual Achievement #', 'Measure #', 'Result'],
      content: content.getSection18Content(),
      // [
      // 	[
      // 		'PICKPACKING [Measure first then reduce by 50% by end of September]',
      // 		'Reduce by 50%',
      // 		'assets/images/party.png',
      // 	],
      // 	['ADMIN/ INVOICING', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['DRIVER ERRORS', 'Reduce by 50%', 'assets/images/party.png'],
      // 	['SALES REPS ORDER TAKING', 'Reduce by 50%', 'assets/images/party.png'],
      // ],
      styles: {
        table: {
          tr: {
            height: '26px',
          },
          th: {
            height: '26px',
            fontSize: '7px',
          },
          td: {
            height: '21px',
            paddingBottom: '13px',
          },
        },
      },
    },
  };
}
