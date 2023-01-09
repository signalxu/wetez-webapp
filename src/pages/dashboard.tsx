import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { PlanCard } from '../components/Dashboard/PlanCard'
import dynamic from 'next/dynamic'

const CircleChart = dynamic(
  () => import('../components/CircleChart'),
  { ssr: false }
)


export default function Dashboard() {

  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-20 pr-6'>
          <div className='mt-12 font-brand text-4xl text-white'>
            Dashboard
          </div>
          <div className='text-white/30 mt-4 text-lg'>
            Whole data about your plans here
          </div>
          <div className='px-0 py-10'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3'>
              </div>
              <div className='col-span-2'>
                <PlanCard/>
                <CircleChart/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}