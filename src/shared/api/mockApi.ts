import type { Card, Category, Transaction, User } from '../types'

const STORAGE_KEYS = {
  USER: 'aspire_user',
  CARDS: 'aspire_cards',
  TRANSACTIONS: 'aspire_transactions',
  CATEGORIES: 'aspire_categories',
}

const defaultUser: User = {
  name: 'Mark Henry',
  userId: '123',
}

const defaultCards: Card[] = [
  {
    id: 'c1',
    c_name: 'Mark Henry',
    cardNumber: '4242424242424242',
    expiryDate: '12/28',
    cvv: '123',
    isCardFreezed: false,
    transactions: ['t1', 't2','t3','t4'],
  },
  {
    id: 'c2',
    c_name: 'Mark Henry',
    cardNumber: '5555555555554444',
    expiryDate: '06/26',
    cvv: '321',
    isCardFreezed: false,
    transactions: ['t3'],
  },
]

const defaultTransactions: Transaction[] = [
  {
    id: 't1',
    transactionDoneAt: '2026-03-01T10:15:00Z',
    date: '2026-03-01',
    name:'Starbucks',
    transactionDetails: 'Charged to debit card',
    amount: 4.5,
    isDebited: true,
    currency: 'USD',
    icon:'./assets/file-storage-1.png'
  },
  {
    id: 't2',
    transactionDoneAt: '2026-02-27T18:22:00Z',
    date: '2026-02-27',
      name:'Slack Subscription',
    transactionDetails: 'Charged to debit card',
    amount: 12.0,
    isDebited: false,
    currency: 'USD',
    icon:'./assets/flights.png'
    
  },
  {
    id: 't3',
    transactionDoneAt: '2026-03-10T08:00:00Z',
    date: '2026-03-10',
      name:'Lunch',
    transactionDetails: 'Charged to debit card',
    amount: 18.25,
    isDebited: true,
    currency: 'USD',
    icon:'./assets/megaphone.png'

  },

   {
    id: 't4',
    transactionDoneAt: '2026-03-10T08:00:00Z',
    date: '2026-03-10',
      name:'Lunch',
    transactionDetails: 'Charged to debit card',
    amount: 18.25,
    isDebited: true,
    currency: 'USD',
    icon:'./assets/file-storage-1.png'

  },
]

const defaultCategories: Category[] = [
  { category_name: 'myDebitCard', cardIds: ['c1', 'c2'] },
  { category_name: 'companyCards', cardIds: [] },
]

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeToStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getUser(): Promise<User> {
  return new Promise((resolve) => {
    const user = readFromStorage<User>(STORAGE_KEYS.USER, defaultUser)
    writeToStorage(STORAGE_KEYS.USER, user)
    setTimeout(() => resolve(user), 250)
  })
}

export function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    const categories = readFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, defaultCategories)
    writeToStorage(STORAGE_KEYS.CATEGORIES, categories)
    setTimeout(() => resolve(categories), 250)
  })
}

export function getCards(): Promise<Card[]> {
  return new Promise((resolve) => {
    const cards = readFromStorage<Card[]>(STORAGE_KEYS.CARDS, defaultCards)
    writeToStorage(STORAGE_KEYS.CARDS, cards)
    setTimeout(() => resolve(cards), 250)
  })
}

export function getTransactions(): Promise<Transaction[]> {
  return new Promise((resolve) => {
    const tx = readFromStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, defaultTransactions)
    writeToStorage(STORAGE_KEYS.TRANSACTIONS, tx)
    setTimeout(() => resolve(tx), 250)
  })
}

export function createCard(newCard: Card): Promise<Card> {
  return new Promise((resolve) => {
    const cards = readFromStorage<Card[]>(STORAGE_KEYS.CARDS, defaultCards)
    const categories = readFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, defaultCategories)
    const updatedCards = [newCard, ...cards]
    writeToStorage(STORAGE_KEYS.CARDS, updatedCards)

    // add to first category by default
    const updatedCategories = categories.map((cat) => {
      if (cat.category_name === 'myDebitCard') {
        return { ...cat, cardIds: [newCard.id, ...cat.cardIds] }
      }
      return cat
    })
    writeToStorage(STORAGE_KEYS.CATEGORIES, updatedCategories)

    setTimeout(() => resolve(newCard), 250)
  })
}

export function updateCard(updatedCard: Card): Promise<Card> {
  return new Promise((resolve) => {
    const cards = readFromStorage<Card[]>(STORAGE_KEYS.CARDS, defaultCards)
    const updated = cards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    writeToStorage(STORAGE_KEYS.CARDS, updated)
    setTimeout(() => resolve(updatedCard), 250)
  })
}
