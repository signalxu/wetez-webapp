import { Meta } from '../components/Meta'
import { Menu } from '../components/Menu'
import { CurrentPlanCard } from '../components/Card/CurrentPlanCard'
import { Header } from '../components/Header'
import { ApiUsageCard } from '../components/Card/ApiUsageCard'
import { useCurrentPlans,useSubscribedList } from 'src/api/dashboard'
import { useIPFSPlan } from 'src/api/ipfs'
import dynamic from 'next/dynamic'
import DashboardSkethon from 'src/components/Skethon/DashboardSkethon'
import React, { useEffect,useState } from 'react'
import Captcha from 'src/components/Captcha/Captcha'
import { useAccountInfo } from 'src/api/setting'
import { getUserSession } from 'src/lib/storage'
import { useRouter } from 'next/router'

const CircleChart = dynamic(
  () => import('../components/Chart/CircleChart'),
  { ssr: false }
)

export default function Dashboard() {

  const [isReady,setIsReady] = useState(false)
  const [paid,setPaid] = useState(false)

  const{
    data: currentPlan,
    error: planError,
    loading: planLoading,
  } = useCurrentPlans(isReady)

  const{
    data: subscribedList,
    error: listError,
    loading: listLoading,
  } = useSubscribedList(isReady)

  const {
    data: ipfsPlanData ,
    loading:ipfsPlanLoading,
    error:ipfsPlanError,
  } = useIPFSPlan(isReady)

  const {
    data: accountInfoData,
    loading: accountInfoLoading,
    error: accountInfoError,
  } = useAccountInfo(isReady)

  const router = useRouter()
  const authorization = getUserSession()
  useEffect(()=>{
    if(authorization){
      setIsReady(true)
    }
    else{
      router.replace('/login')
    }
  },[authorization])

  useEffect(()=>{
    if(!planLoading){
      if(currentPlan?.tags.some((item) => true)){
        setPaid(true)
      }
    }
  },[planLoading])

  if( planLoading && listLoading && ipfsPlanLoading && accountInfoLoading){
    return <DashboardSkethon/>
  }

  return(
    <>
      <Meta
        title='Dashboard'
        description=''
        image=''
      />
      
      <div className='flex'>
        <Menu/>
        <div className='grow bg-[#182036] pl-10 pr-16 overflow-y-auto h-screen'>
          <div className='max-w-6xl mx-auto'>
            <Header
              title="Dashboard"
              description="Whole data about your plans here"
              url = ''
              back = {false}
              backTitle = ""
              backUrl=""
            />
            <div className='px-0 py-10'>
            <Captcha>
              <div className='grid grid-cols-5 gap-4'>
                  <div className='col-span-3'>
                    <ApiUsageCard
                      apikey={accountInfoData?.apiKey}
                      subscribePlanList={subscribedList?.list}
                    />
                  </div>
                <div className='col-span-2'>
                  <CurrentPlanCard
                    paid = {paid}
                    tagList = {currentPlan?.tags}
                    planList = {currentPlan?.subscribedPlans}
                  />
                  <div className='mt-6'>
                    <CircleChart
                      planShow = {false}
                      plandata = {ipfsPlanData?.subscribedPlan}
                    />
                  </div>
                </div>
              </div>
              </Captcha>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
