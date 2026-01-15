import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
   return (
      <div className='flex items-center justify-between gap-4 px-4 lg:px-44 py-3'>
         <img width = {150} src= {assets.logo} alt="footer-logo" />
         <p className='flex-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @DebarpanDeb | All rights reserved</p>

         <div className='flex gap-1'>
            <img src= {assets.facebook_icon} alt="facebook-icon" width = {40}/>
            <img src= {assets.twitter_icon} alt="twitter-icon" width = {40}/>
            <img src= {assets.google_plus_icon} alt="google-plus-icon" width = {40}/>
         </div>
      </div>

   )
}
export default Footer