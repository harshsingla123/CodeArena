import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/user.js";    
import { upsertStreamUser } from "../lib/stream.js";

export const protectRoute = [
    requireAuth(),          
    async (req, res, next) => {
        try {
            const clerkId = req.auth?.userId;
            if (!clerkId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            let user = await User.findOne({ clerkId });
            if (!user) {
                try {
                    const clerkUser = await clerkClient.users.getUser(clerkId);
                    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || clerkUser.username || "User";
                    const email = clerkUser.emailAddresses?.[0]?.emailAddress || `${clerkId}@clerk.local`;
                    user = await User.create({
                        clerkId,
                        name,
                        email,
                        profileImage: clerkUser.imageUrl || ""
                    });
                    await upsertStreamUser({
                        id: clerkId,
                        name: user.name,
                        image: user.profileImage
                    });
                } catch (err) {
                    console.error("Error auto-syncing Clerk user:", err);
                    return res.status(401).json({ message: "User not found" });
                }
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
];