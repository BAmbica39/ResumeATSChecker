import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const REQUIRED_SKILLS = ["react", "node", "mongodb", "python", "aws"];

const genai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export const parseResume = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  const text = data.text;

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/);
  const email = emailMatch ? emailMatch[0] : "Not Found";

  // Gemini AI prompt
  const prompt = `
        You are an ATS system. Analyze the following resume and return a JSON object ONLY. 
        Do NOT include any explanations, markdown, or code blocks. The JSON must have these keys:

        1. "skills": list of skills found from ${REQUIRED_SKILLS.join(", ")}
        2. "atsScore": a number between 0 and 100
        3. "observations": list of short advice strings

        Resume text:
        ${text}
        `;


  let atsResult = { skills: [], atsScore: 0, observations: "" };

  try {
    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          type: "text",
          text: prompt
        }
      ],
      temperature: 0.2,
      maxOutputTokens: 500
    });
    
    // The output text is in response.output[0].content[0].text
    const reply =  await response.candidates[0].content.parts[0].text;
    
    console.log(reply)
    // Then parse
    atsResult = JSON.parse(reply);

    // console.log("printing", atsResult);
    console.log(atsResult)

  } catch (err) {
    console.error("Gemini parse failed, fallback to static scoring", err);

    const foundSkills = atsResult.skills;

    const atsScore = atsResult.atsScore;

    const observations = atsResult.observations;
    atsResult = { skills: foundSkills, atsScore, observations };
  }

  return { email, ...atsResult, rawText: text };
};