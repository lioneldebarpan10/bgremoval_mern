import jwt from 'jsonwebtoken'

// Middleware function to decode jwt token to get clerkId

const authUser = async (req, res, next) => {

   try {

      const { token } = req.headers

      if (!token) {
         return res.json({ success: false, messgae: 'Not Authorized Login again' })
      }

      const token_decode = jwt.decode(token)
      req.body.clerkId = token_decode.clerkId
      next()

   }
   catch (error) {
      console.log(error.message);
      return res.json({ success: true, message: error.message });
   }

}
export default authUser