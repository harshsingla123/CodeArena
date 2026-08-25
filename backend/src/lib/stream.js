import { ENV } from "./env.js";
import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;
if (!apiKey || !apiSecret) { throw new Error("STREAM_API_KEY and STREAM_API_SECRET must be set in the environment variables."); }
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);
export const streamClient = new StreamClient(apiKey, apiSecret);
export const upsertStreamUser = async ( userData ) => {

    try {
        await chatClient.upsertUser(userData);
        console.log(`User with ID ${userData.id} upserted successfully.`);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
        
    }
};
export const deleteStreamUser = async ( userID ) => {

    try {
        await chatClient.deleteUser({userID });
        console.log(`User with ID ${userID} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
        
    }
};
