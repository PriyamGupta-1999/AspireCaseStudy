import DashboardHeader from '../Components/DashboardHeader'
import DashboardTabs from '../Components/DashboardTabs'
import DashboardBody from '../Components/DashboardBody'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import './Dashboard.mobile.css';
export default function Dashboard() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <div className={isMobile ? 'dashboard-mobile' : 'dashboard-desktop'}>
            <div className={isMobile ? 'dashboard-mobile__header-tabs' : ''}>
                <DashboardHeader />
                <DashboardTabs />
            </div>
            <div className={isMobile ? 'dashboard-mobile__body' : ''}>
                <DashboardBody />
            </div>
          
        </div>
    );
}
