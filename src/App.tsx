import AppRouter from './app/routes/router'
import { AppProvider } from './app/providers/AppProvider'
import './App.css'

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}
