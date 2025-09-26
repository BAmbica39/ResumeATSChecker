import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://ambica:Mongo%40123@cluster0.n3yo3ep.mongodb.net/resumeats?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/api/upload", uploadRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
