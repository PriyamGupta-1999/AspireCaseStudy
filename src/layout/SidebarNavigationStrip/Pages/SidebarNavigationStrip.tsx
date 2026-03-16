import DesktopSidebarNavigation from '../Components/DesktopSidebarNavigation'
import MobileSidebarNavigation from '../Components/MobileSidebarNavigation'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
export default function SidebarNavigationStrip() {
      const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  
  return (
    <>
    {isMobile ? <MobileSidebarNavigation /> : <DesktopSidebarNavigation />}
    </>
  )
}
