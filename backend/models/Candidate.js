import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  education: String,
  experience: String,
  atsScore: Number,
  observations: String,
  filePath: String
});

export default mongoose.model("Candidate", candidateSchema);