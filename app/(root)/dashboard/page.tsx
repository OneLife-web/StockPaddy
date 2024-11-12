import SalesChart from '@/components/charts/SalesChart'
import ShortCut from '@/components/Navigation/ShortCut'

const DashboardPage = () => {
  return (
    <main className='pt-[80px] relative min-h-screen'>
      <SalesChart />
      <ShortCut />
    </main>
  )
}

export default DashboardPage
