import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"; 
import messageRoutes from "./routes/message.routes.js"; 
import cookieParser from "cookie-parser"
import cors from "cors"
// Add the .js extension
dotenv.config()
const app = express();// using express to handle httprequest

const PORT= process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes); // handling request
app.use("/api/message", messageRoutes);
app.use("/api/auth", authRoutes);
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,}
))
app.listen(PORT, () => {
  console.log("server is running on Port"+PORT);
  connectDB();
});