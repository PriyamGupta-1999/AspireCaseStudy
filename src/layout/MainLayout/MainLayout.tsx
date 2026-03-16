import type { ReactNode } from 'react'
import SidebarNavigationStrip from '../SidebarNavigationStrip/Pages/SidebarNavigationStrip.tsx'
import './styles/MainLayout.css'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export default function MainLayout({ children }: { children: ReactNode }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  
  return (
    <div className="app-layout">
    <SidebarNavigationStrip />
      
      <main className="app-main" role="main">
        {children}
      </main>
    </div>
  )
}
