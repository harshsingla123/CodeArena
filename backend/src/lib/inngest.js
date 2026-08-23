import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import User from "../models/user.js";
export const inngest = new Inngest({ id: "Code-Arena" });
import { upsertStreamUser, deleteStreamUser } from "./stream.js";
const syncUser = inngest.createFunction(
    { id: "Sync User" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        
            await connectDB();
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const newUser = {
                name: `${first_name} ${last_name}`,     
                email: email_addresses[0].email_address,
                clerkId:id,
                profileImage: image_url
            }
         await User.create(newUser);
         await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage
         });
        });


 const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        
            await connectDB();
            const {id} = event.data;
            await User.findOneAndDelete({ clerkId: id });
            await deleteStreamUser(id.toString());
        });
  export const functions = [syncUser, deleteUserFromDB];