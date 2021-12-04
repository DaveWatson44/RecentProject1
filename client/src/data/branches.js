const branches = [
  {
    name: "IT",
    color: "#4DC3FF",
    routeName: "it",
    roles: [1, 2],
    links: [{ route: 'it', name: 'Home' },
     { route: 'accounts_payable/reports', name: 'Reports' },
     { route: 'enter_ticket', name: 'Enter Ticket'}
    ]
  },
  {
    name: "Accounts Payable",
    color: "#4DC3FF",
    routeName: "accounts_payable",
    roles: [1, 3],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },
  {
    name: "Accounts Receivable",
    color: "#8BC94C",
    routeName: "accounts_receivable",
    roles: [1, 4],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },
  {
    name: "Customer Service",
    color: "#A170FF",
    routeName: "customer_service",
    roles: [1, 5],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },
  {
    name: "Purchasing",
    color: "#FFC44E",
    routeName: "purchasing",
    roles: [1, 6],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },
  {
    name: "Business Analytics",
    color: "#8B99A6",
    routeName: "business_analytics",
    roles: [1, 7],
    links: [
      { route: 'business_analytics', name: 'Home' },
      { route: 'business_analytics/reports', name: 'Reports' },
      { route: 'business_analytics/sales_analysis', name: 'Sales Analysis' }
    ]
  },
  {
    name: "Marketing",
    color: "#ED4D4D",
    routeName: "marketing",
    roles: [1, 8],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },
  {
    name: "Logistics",
    color: "#695356",
    routeName: "logistics",
    roles: [1, 9],
    links: [{ route: 'accounts_payable/reports', name: 'Reports' }]
  },

]

export default branches