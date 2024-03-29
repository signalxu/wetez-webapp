import React from 'react';
import Link from 'next/link';
import PlanTag from '../Tag/PlanTag';
import { Time } from '../Time';


type CurrentPlanCardProps = {
  paid: boolean,
  planList: {
    id: number
    todayUsage: number
    status: 1 | 2 | 3
    expireAt: number
    chain:{
      chainId: number
      name: string
    }
    plan:{
      id: number
      name: string
      chainId: number
    }
  }[] | undefined,
  tagList: [string] | undefined,
}

export function CurrentPlanCard({
  paid = false,
  planList = [{
    id : 1, 
    todayUsage: 1000,
    status: 1,
    expireAt: 1,
    chain:{
      chainId: 1,
      name: 'Ethereum'
    },
    plan:{
      id: 1,
      name: 'Free',
      chainId: 1,
    }
  }],
  tagList = ['']
}:CurrentPlanCardProps) {
  
  if(paid){
    return(
      <div className='bg-white/5 rounded-[24px]'>
        <div className='px-6 py-8'>
          <div className='items-center flex'>
            <h2 className='font-bold text-xl text-white'>My Current Plan</h2>
            <div className='grow'></div>
            <div className='flex space-x-1 items-center'>
              {(tagList.map((item,index) => (
                <PlanTag
                  name = {item}
                  key = {index}
                />
              )))}
            </div>
          </div>
          <div className='mt-6 space-y-3'>
            {(planList.map((item) => (
              <div className='' key={item.id}>
                <div className='border-[0.5px] border-white/5 mt-3'></div>
                <div className='grid grid-cols-4 text-base text-white/50 mt-4' >
                  <div className=''>{item.chain.name}</div>
                  <div className=''>{item.plan.name}</div>
                  <div className='col-span-2 text-right'>
                    <Time
                      timestramp={item.expireAt}
                    />
                  </div>
                </div>
              </div>
            )))}

          </div>
          <Link href="/premium">
            <div className='bg-[#2A23FF] rounded-[23px] mt-8 w-2/5'>
              <div className='px-6 py-3 flex items-center'>
                  <div className='text-base text-white'>
                    View All
                  </div>
                <img src="/image/arrow_more_icon.png" className='h-4 ml-3'/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
  return(
    <>
      <div className='bg-white/5 rounded-[24px]'>
        <div className='px-6 py-8'>
          <div className='flex items-center'>
            <h2 className='font-bold text-xl text-white'>My Current Plan</h2>
            <div className='grow'></div>
            <div className=''>
              <PlanTag
                name = "Free"
              />
            </div>
          </div>
          <div className='mt-6 text-base text-white/50'>
            You don't have a paid plan. Please select a plan to prevent storage issues beyond your plan limits.
          </div>
          <Link href="/premium">
            <div className='bg-[#2A23FF] rounded-[23px] mt-6 w-1/3'>
              <div className='px-8 py-3 flex items-center'>
                <div className='text-base text-white'>
                  More
                </div>
                <img src="/image/arrow_more_icon.png" className='h-4 ml-4'/>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
