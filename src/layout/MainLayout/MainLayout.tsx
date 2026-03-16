import type { ReactNode } from 'react'
import SidebarNavigationStrip from '../SidebarNavigationStrip/Pages/SidebarNavigationStrip.tsx'
import './styles/MainLayout.css'



export default function MainLayout({ children }: { children: ReactNode }) {
 

  
  return (
    <div className="app-layout">
    <SidebarNavigationStrip />
      
      <main className="app-main" role="main">
        {children}
      </main>
    </div>
  )
}
