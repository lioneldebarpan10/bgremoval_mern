import { createContext } from "react";
import { useAuth, useClerk, useUser } from '@clerk/clerk-react'

import axios from 'axios'
import { toast } from 'react-toastify'

import { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

const AppContextProvider = (props) => {

   const [credit, setCredit] = useState(false);

   const [image, setImage] = useState(false)

   const [resultImage, setresultImage] = useState(false)

   const backendUrl = import.meta.env.VITE_BACKEND_URL
   // build API urls safely: trim quotes/spaces and ensure single slash joining
   const getApiUrl = (path) => {
      const raw = String(backendUrl || '').trim().replace(/^['"]|['"]$/g, '')
      const base = raw.replace(/\/+$/g, '')
      const p = String(path).replace(/^\/+/, '')
      return base ? `${base}/${p}` : `/${p}`
   }
   const navigate = useNavigate()

   const { getToken } = useAuth()

   const { isSignedIn } = useUser()

   const { openSignIn } = useClerk()

   const loadCreditsData = async () => {

      try {
         const token = await getToken()
         const { data } = await axios.get(getApiUrl('api/user/credits'), { headers: { token } })
         if (data.success) {
            setCredit(data.credits)
            console.log(data.credits)
         }
      }
      catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   const removeBg = async (image) => {

      try {
         if (!isSignedIn) {
            return openSignIn()
         }
         setImage(image)
         setresultImage(false)

         navigate('/result')

         const token = await getToken()

         const formData = new FormData()
         image && formData.append('image', image)

         const { data } = await axios.post(getApiUrl('api/image/remove-bg'), formData, { headers: { token } })

         if(data.success) {
            setresultImage(data.resultImage)
            data.creditBalance && setCredit(data.creditBalance)
         }
         else{
            toast.error(data.message)
            data.creditBalance && setCredit(data.creditBalance)

            if(data.creditBalance === 0){
               navigate('/buy')
            }
         }

      }
      catch (error) {

         console.log(error)
         toast.error(error.message)
      }

   }

   const value = {
      credit, setCredit,
      loadCreditsData,
      backendUrl,
      image, setImage,
      removeBg,
      resultImage, setresultImage
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}

export default AppContextProvider