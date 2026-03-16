export const ROUTES = {
  DASHBOARD: '/',
  CARDS: '/cards',
  PAYMENTS: '/payments',
  CREDIT: '/credit',
  SETTINGS: '/settings',
}

export const DASHBOARD_TABS = [
  { id: 'myDebitCard', label: 'My Debit Cards',disabled: false },
  { id: 'companyCards', label: 'All Company Cards',disabled: true },
]

export const SIDEBAR_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Home' },
  { to: ROUTES.CARDS, label: 'Cards' },
  { to: ROUTES.PAYMENTS, label: 'Payments' },
  { to: ROUTES.CREDIT, label: 'Credit' },
  { to: ROUTES.SETTINGS, label: 'Settings' },
]
