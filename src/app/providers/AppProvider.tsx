import type { ReactNode } from 'react'
import { createContext, useContext, useReducer, useEffect } from 'react'
import { initialState } from '../store/initialState'
import { appReducer } from '../store/reducer'
import { getUser, getCards, getTransactions, getCategories, createCard, updateCard } from '../../shared/api/mockApi'
import type { AppState, AppAction, Card } from '../../shared/types'

type AppContextValue = {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  loadInitialData: () => void
  addCard: (card: Card) => Promise<void>
  toggleFreeze: (cardId: string) => void
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const loadInitialData = () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    Promise.all([getUser(), getCards(), getTransactions(), getCategories()])
      .then(([user, cards, transactions, categories]) => {
        dispatch({ type: 'SET_USER', payload: user })

        dispatch({ type: 'SET_CARDS', payload: { cards, ids: cards.map((c) => c.id) } })
        dispatch({ type: 'SET_TRANSACTIONS', payload: { transactions } })
        dispatch({ type: 'SET_CATEGORIES', payload: categories })
        dispatch({ type: 'SELECT_CARD', payload: cards[0]?.id ?? null })
        dispatch({ type: 'SELECT_CATEGORY', payload: categories[0]?.category_name ?? null })
      })
      .catch((err) => {
        dispatch({ type: 'SET_ERROR', payload: err?.message || 'Failed to load data.' })
      })
      .finally(() => {
        dispatch({ type: 'SET_LOADING', payload: false })
      })
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  const addCard = async (card: Card) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const created = await createCard(card)
      dispatch({ type: 'ADD_CARD', payload: created })
      dispatch({ type: 'SELECT_CARD', payload: created.id })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const toggleFreeze = async (cardId: string) => {
    const card = state.cards[cardId]
    if (!card) return

    const updatedCard = { ...card, isCardFreezed: !card.isCardFreezed }

    dispatch({ type: 'TOGGLE_FREEZE', payload: { cardId } })
    try {
      await updateCard(updatedCard)
    } catch {
    
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch, loadInitialData, addCard, toggleFreeze }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
