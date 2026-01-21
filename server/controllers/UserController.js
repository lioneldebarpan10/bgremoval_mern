import { Webhook } from 'svix';
import userModel from '../models/userModel.js';
// API Controller function to manage clerk user with database

// https://localhost:4000/api/user/webhooks

// logic for whenever we created a new user in frontend it will automatically then we will get the 
// user data in our backend also
const clerkWebhooks = async (req, res) => {

    try {
        // create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkID: data.id,
                    email: data.email_addresses[0].email_addresses,
                    firstName: data.first_Name,
                    lastName: data.last_Name,
                    photo: data.image_url
                }
                await userModel.create(userData)
                res.json({})
                break;
            }

            case "user.updated": {
                const userData = {
                    clerkID: data.id,
                    email: data.email_addresses[0].email_addresses,
                    firstName: data.first_Name,
                    lastName: data.last_Name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({clerkID:data.id} , userData)
                res.json({})
                break;
            }


            case "user.deleted": {

                await userModel.findOneAndDelete({clerkID:data.id})
                res.json({})
                break;

            }
        }
    }
    catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export {clerkWebhooks}