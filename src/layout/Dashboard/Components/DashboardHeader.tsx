import CreateCardModal from '../../CardCreationModal/pages/CreateCardModalForm.tsx'
import './DashboardHeader.css'
import { useState } from 'react'

export default function DashboardHeader() {
    // const { state } = useAppContext()

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <header className="dashboard-header">
            <div className="dashboard-header__balance-block">
                <div className="dashboard-header__balance-label">Available balance</div>
                <div className="dashboard-header__balance-row">
                    <div>
                        <span className="dashboard-header__currency">S$</span>
                        <span className="dashboard-header__amount">3,000</span>

                    </div>
                    <div className="dashboard-header__actions">
                        <button className="dashboard-header__new" onClick={() => setIsModalOpen(true)}>
                            + New Card
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && <CreateCardModal onClose={() => setIsModalOpen(false)} />}
        </header>
    )
}
