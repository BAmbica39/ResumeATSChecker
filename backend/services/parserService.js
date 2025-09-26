import fs from "fs";
import pdfParse from "pdf-parse";

const REQUIRED_SKILLS = ["react", "node", "mongodb", "python", "aws"];

export const parseResume = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const text = data.text.toLowerCase();

  // extract fields
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "Not Found";

  const foundSkills = REQUIRED_SKILLS.filter(skill => text.includes(skill));
  const atsScore = Math.round((foundSkills.length / REQUIRED_SKILLS.length) * 100);

  const observations = atsScore < 50 ? "Missing important skills." : "Good skill match.";

  return { email, skills: foundSkills, atsScore, observations, rawText: text };
};

