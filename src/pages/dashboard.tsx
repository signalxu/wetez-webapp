import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { CurrentPlanCard } from '../components/Card/CurrentPlanCard'
import { Header } from '../components/Header'
import { ApiUsageCard } from '../components/Card/ApiUsageCard'
import { useCurrentPlans,useSubscribedList } from 'src/api/dashboard'
import dynamic from 'next/dynamic'

const CircleChart = dynamic(
  () => import('../components/CircleChart'),
  { ssr: false }
)

const TagList = [
  {
    planName:'Team'
  },
  {
    planName:'Growth'
  },
  {
    planName:'Developer'
  },
]

export default function Dashboard() {

  const{
    data: currentPlan,
    error: planError,
    loading: planLoading,
  } = useCurrentPlans()

  const{
    data: subscribedList,
    error: listError,
    loading: listLoading,
  } = useSubscribedList()

  let paid:boolean = false
  if(!currentPlan && !planLoading){
    paid = true
  }

  if( planLoading && listLoading){
    return<></>
  }


  return(
    <>
      <Meta
        title=''
        description=''
        image=''
      />
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-10'>
          <Header
            title="Dashboard"
            description="Whole data about your plans here"
          />
          <div className='px-0 py-10'>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-3'>
                <ApiUsageCard
                  subscribePlanList={subscribedList?.list}
                />
              </div>
              <div className='col-span-2'>
                <CurrentPlanCard
                  paid = {paid}
                  tagList = {TagList}
                  planList = {currentPlan?.subscribedPlan}
                />
                <div className='mt-6'>
                  <CircleChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
