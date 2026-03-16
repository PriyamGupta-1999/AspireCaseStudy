import CardSlider from './CardSlider/CardSlider'
import CardActionsStrip from '../../CardDetails/Components/CardActionsStrip.tsx'
import './DashboardBody.css'
import CardDetails from '../../CardDetails/Components/CardDetails.tsx'
import RecentTransaction from '../../CardDetails/Components/RecentTransaction.tsx'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
export default function DashboardBody() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
    return (
        <div className="dashboard-body">
            {isMobile ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%',gap:'1em'}}>
                    <div style={{ width: '100%', padding: '0em 1em' }}>
                        <CardSlider CARDS_PER_SLIDE={1.1} />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',background:'white',flex:1,gap:'1rem',border:'none',borderRadius:'12px'}}>
                        <CardActionsStrip />
                        <CardDetails />
                        <RecentTransaction />
                    </div>

                </div>
            ) : (

                <>
                    <div className="dashboard-body__left-section">
                        <CardSlider CARDS_PER_SLIDE={1} />
                        <CardActionsStrip />
                    </div>
                    <div className="dashboard-body__right-section">
                        <CardDetails />
                        <RecentTransaction />
                    </div>
                </>
            )}


        </div>
    )
}
