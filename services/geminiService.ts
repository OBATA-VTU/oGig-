
import { GoogleGenAI, Type } from "@google/genai";
import { AIProcessedJob, JobType } from "../types";

// Always use process.env.API_KEY directly for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  processJobContent: async (rawText: string): Promise<AIProcessedJob> => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional business analyst for oGig, Nigeria's premier job nexus. 
      Your task is to structure the provided raw input into a professional job posting.
      
      CRITICAL INSTRUCTIONS:
      1. Output MUST be purely professional and business-oriented. 
      2. NEVER mention yourself, AI, or LLMs in the output.
      3. Location MUST be in Nigeria. Format as "State, Area" (e.g., Lagos, Lekki).
      4. Contacts: Extract every WhatsApp number, Phone, and Email found.
      5. Requirements: Create a clear bulleted list of skills or qualifications.
      6. Procedure: Create a step-by-step application guide.
      7. Language: Professional, encouraging, and clear.
      
      Input text: "${rawText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            company: { type: Type.STRING },
            description: { type: Type.STRING },
            requirements: { type: Type.STRING },
            procedure: { type: Type.STRING },
            location: { type: Type.STRING },
            type: { type: Type.STRING, enum: Object.values(JobType) },
            category: { type: Type.STRING },
            salary: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            whatsapp: { type: Type.STRING },
            phone: { type: Type.STRING },
            email: { type: Type.STRING },
            link: { type: Type.STRING }
          },
          required: ['title', 'company', 'description', 'requirements', 'procedure', 'location', 'type', 'category', 'tags']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as AIProcessedJob;
  }
};
