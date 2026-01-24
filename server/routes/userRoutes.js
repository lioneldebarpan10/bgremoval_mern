import express from 'express'

import { clerkWebhooks, paymentRazoypay, userCredits, verifyRazorpay } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks' , clerkWebhooks)
userRouter.get('/credits' , authUser , userCredits)
userRouter.post('/pay-razor' , authUser , paymentRazoypay)
userRouter.post('/verify-razor' , verifyRazorpay)

export default userRouter