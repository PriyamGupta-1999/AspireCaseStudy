import { useAppContext } from '../../../app/providers/AppProvider'
import { DASHBOARD_TABS } from '../../../shared/constants/Constants'
import { Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { SyntheticEvent } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
export default function DashboardTabs() {
  const {
    state: { selectedCategoryId },
    dispatch,
  } = useAppContext()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const initialIndex = DASHBOARD_TABS.findIndex(
    (tab) => tab.id === selectedCategoryId
  )

  const [value, setValue] = useState(initialIndex !== -1 ? initialIndex : 0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)

    dispatch({
      type: 'SELECT_CATEGORY',
      payload: DASHBOARD_TABS[newValue].id,
    })
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="dashboard tabs"
    >
      {DASHBOARD_TABS.map((tab, idx) => (
        <Tab
          key={tab.id}
          value={idx}
          label={tab.label}
          disabled={tab.disabled}
          sx={{
            textTransform: 'none',
            color: isMobile ? '#FFFFFF' : 'black',
            fontWeight: 500,
            fontSize: '0.875rem',
            '&.Mui-selected': {
              color: isMobile ? 'white' : 'black',
            },
            '&.Mui-disabled': {
              color: isMobile ? '#FFFFFF' : 'black',

            }
          }}
        />
      ))}
    </Tabs>
  )
}