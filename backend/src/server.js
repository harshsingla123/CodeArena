import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const __dirname = path.resolve();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));
app.use("/api/inngest",serve({clint:inngest,functions}))

console.log(ENV.PORT);
app.get("/health", (req, res) => {
   res.status(200).json({ message: "api is running fine" });
});
app.get("/books", (req, res) => {
   res.status(200).json({ message: "This is the books endpoint" });
});
if (ENV.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));
   app.get("/{*splat}", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
   });
}

const startServer = async () => {
   try {
      await connectDB();
      app.listen(ENV.PORT, () => {
         console.log("Server is running on port " + ENV.PORT);

      })} catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
   }}
   startServer();