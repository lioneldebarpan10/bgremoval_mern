// Receive the image fromm frontend and remove the backgorund of the image

import axios from 'axios'

import fs from 'fs'
import FormData from 'form-data';
import userModel from '../models/userModel.js';

// controller function to remove background from image

const removeBgImage = async (req, res) => {

   // get the image from frontend and remove it's background
   try {

      // multer to parse form-data
      const { clerkId } = req.body
      const user = await userModel.findOne({ clerkId })
      // if user is not found in that clerkId
      if (!user) {
         return res.json({ succes: false, message: 'User not found' })
      }
      // now check if the user has credits or not
      if (user.creditBalance === 0) {
         return res.json({ success: false, message: 'Insufficient credits', creditBalance: user.creditBalance })
      }

      // if user has some credit balance then
      const imagePath = req.file.path;

      // Reading the image file
      const imageFile = fs.createReadStream(imagePath)

      // preparing form data
      const formData = new FormData()
      formData.append('image_file', imageFile)

      // calling remove bg api -> source 'https://clipdrop.co/apis/docs/remove-background'

      const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
         headers: {
            'x-api-key': process.env.CLIPDROP_API,
         },
         responseType: 'arraybuffer'
      })

      // deleting the file from local storage
      const base64Image = Buffer.from(data, 'binary').toString('base64')

      // constructing result image
      const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

      // deducting one credit from user account after getting result image
      await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 })

      res.json({ success: true, resultImage: resultImage, creditBalance: user.creditBalance - 1 , message: 'Background removed successfully' })

   }
   catch (error) {
      console.log(error.message);
      return res.json({ success: false, message: error.message });
   }
}

export { removeBgImage }