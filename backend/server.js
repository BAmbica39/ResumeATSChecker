import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://tulasinalluri165_db_user:Mongodb!123@cluster0.qnf0psq.mongodb.net/ResumeATS?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/upload", uploadRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));