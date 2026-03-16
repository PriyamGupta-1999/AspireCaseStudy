import type { AppAction, AppState, Card, Category, Transaction } from '../../shared/types'

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'SET_CARDS': {
      const cardsById: Record<string, Card> = {}
      action.payload.cards.forEach((card) => {
        cardsById[card.id] = card
      })
      return {
        ...state,
        cards: cardsById,
        cardIds: action.payload.ids,
      }
    }

    case 'SET_CATEGORIES': {
      const categoriesById: Record<string, Category> = {}
      action.payload.forEach((cat) => {
        categoriesById[cat.category_name] = cat
      })
      return {
        ...state,
        categories: categoriesById,
      }
    }

    case 'SELECT_CATEGORY':
      return { ...state, selectedCategoryId: action.payload }

    case 'SELECT_CARD':
      return { ...state, selectedCardId: action.payload }

    case 'TOGGLE_FREEZE': {
      const card = state.cards[action.payload.cardId]
      if (!card) return state
      const updated = { ...card, isCardFreezed: !card.isCardFreezed }
      return {
        ...state,
        cards: { ...state.cards, [action.payload.cardId]: updated },
      }
    }

    case 'ADD_CARD': {
      const card = action.payload
      return {
        ...state,
        cards: { ...state.cards, [card.id]: card },
        cardIds: [card.id, ...state.cardIds],
      }
    }

    case 'SET_TRANSACTIONS': {
      const map: Record<string, Transaction> = {}
      action.payload.transactions.forEach((tx) => {
        map[tx.id] = tx
      })
      return { ...state, transactions: map }
    }

    default:
      return state
  }
}
