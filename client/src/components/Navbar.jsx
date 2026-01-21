import React from 'react'
import { assets } from '../assets/assets'

import { Link } from 'react-router-dom';

import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';

const Navbar = () => {
   const { openSignIn } = useClerk()
   const { isSignedIn, user } = useUser()

   const {credit , loadCreditsData} = useContext(AppContext)

   useEffect(() => {

      if(isSignedIn){
         loadCreditsData()
      }
   } , [isSignedIn])


   return (
      <div className='flex items-center justify-between mx-4 py-3 lg:mx-44'>
         <Link to='/'> <img src={assets.logo} alt="logo" className='w-32 sm:w-44' /> </Link>
         {
            isSignedIn ?
               <div>
                  <button>
                     <img src= {assets.credit_icon} alt="credit-icon" />
                     <p>Credits: {credit}</p>
                  </button>
                  <UserButton />
               </div>
               :
               <button onClick={() => openSignIn({})} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full cursor-pointer'>
                  Get Started <img src={assets.arrow_icon} alt="arrow-icon" className='w-3 sm:w-4' />
               </button>
         }

      </div>

   )
}

export default Navbar