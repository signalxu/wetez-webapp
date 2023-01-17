import React from 'react';
import { Meta } from '../components/Meta';
import Link from 'next/link';

export default function Signup() {
  
  return(
    <>
      <Meta
          title=''
          description=''
          image=''
        />
        <div className='bg-[#182036] h-screen flex flex-col'>
          <div className='flex items-center px-10 pt-8'>
            <img src="/image/wetez_logo.png" className='w-32'/>
            <div className='grow'></div>
            <div className='text-white/50 text-lg'>
              Need Help?
            </div>
          </div>
          <div className='grow mx-auto w-1/2 px-10 flex flex-col justify-center'>
            <img src="/image/onboard_success_icon.png" className='w-36 mx-auto'/>
            <div className='text-3xl text-white text-center font-brand mt-10'> Congratulations! </div>
            <div className='text-white/50 text-whit/50 text-center leading-relaxed mt-8'>
              Your Account 283733@gmail.com registered successfully！The activation email has been sent to your email address, and the email is valid for 24 hours. Please log in to your mailbox in time and click the link in the email to activate your account.
            </div>
            <div className='flex gap-x-10 mt-12 items-center justify-center'>
              <button className='bg-[#2A23FF] w-2/5 text-white text-center py-4 text-lg rounded-[23px]'>
                Check Email
              </button>
              <button className='w-2/5 text-white text-center py-4 text-lg rounded-[23px] border-[1px] border-white/20'>
                Go Homepage
              </button>
            </div>
          </div>
        </div>
    </>
  )
  }