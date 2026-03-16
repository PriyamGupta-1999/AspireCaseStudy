export type Transaction = {
  id: string,
  name: string,
  transactionDoneAt: string
  date: string
  transactionDetails: string
  amount: number
  isDebited: boolean
  currency: string
  icon?: string
}

export type Card = {
  id: string
  c_name: string
  cardNumber: string
  expiryDate: string
  cvv: string
  isCardFreezed: boolean
  transactions: string[]
}

export type User = {
  name: string
  userId: string
}

export type Category = {
  category_name: string
  cardIds: string[]
}

export type CardListByCategory = {
  category_name: string
  cards: Card[]
}

export type AppState = {
  user: User | null
  cards: Record<string, Card>
  cardIds: string[]
  selectedCardId: string | null
  categories: Record<string, Category>
  selectedCategoryId: string | null
  transactions: Record<string, Transaction>
  loading: boolean
  error: string | null
}

export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_CARDS'; payload: { cards: Card[]; ids: string[] } }
  | { type: 'SELECT_CARD'; payload: string }
  | { type: 'TOGGLE_FREEZE'; payload: { cardId: string } }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'SET_TRANSACTIONS'; payload: { transactions: Transaction[] } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CATEGORIES'; payload: Category[] }
  | { type: 'SELECT_CATEGORY'; payload: string }
