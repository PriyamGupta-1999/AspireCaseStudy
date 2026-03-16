import CardDetails from '../Components/CardDetails'
import CardActionsStrip from '../Components/CardActionsStrip'
import RecentTransaction from '../Components/RecentTransaction'

export default function CardDetailsPage() {
  return (
    <div>
      <CardDetails />
      <CardActionsStrip />
      <RecentTransaction />
    </div>
  )
}
