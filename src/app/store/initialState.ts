import type { AppState } from '../../shared/types'

export const initialState: AppState = {
  user: null,
  cards: {},
  cardIds: [],
  selectedCardId: null,
  categories: {},
  selectedCategoryId: null,
  transactions: {},
  loading: false,
  error: null,
}
