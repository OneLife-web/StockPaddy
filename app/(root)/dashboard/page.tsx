import SalesChart from '@/components/charts/SalesChart'
import ShortCut from '@/components/Navigation/ShortCut'

const DashboardPage = () => {
  return (
    <main className='pt-[80px]'>
      <SalesChart />
      <ShortCut />
    </main>
  )
}

export default DashboardPage
