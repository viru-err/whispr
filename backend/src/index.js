import express from "express";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"; 
import messageRoutes from "./routes/message.routes.js"; 
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express(); // using express to handle HTTP requests

const PORT = process.env.PORT;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes); // handling requests
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on Port " + PORT);
  connectDB();
});
