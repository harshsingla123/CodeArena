import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
const __dirname = path.resolve();

const app = express();
console.log(ENV.PORT);
app.get("/health", (req, res) => {
   res.status(200).json({ message: "api is running fine" });
}); 
if(ENV.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));
   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
   });
}
app.listen(ENV.PORT, () => {
   console.log("Server is running on port " + ENV.PORT);
}); 