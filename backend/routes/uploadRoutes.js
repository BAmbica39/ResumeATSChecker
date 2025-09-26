import express from "express";
import multer from "multer";
import path from "path";
import Candidate from "../models/Candidate.js";
import { parseResume } from "../services/parserService.js";

const router = express.Router();

// Upload storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Upload & parse resume
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const parsed = await parseResume(filePath);

    const candidate = new Candidate({
      email: parsed.email,
      skills: parsed.skills,
      atsScore: parsed.atsScore,
      observations: parsed.observations,
      rawText: parsed.rawText,
      filePath
    });

    await candidate.save();

    res.json({ message: "Resume uploaded & parsed", candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all candidates
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ atsScore: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
