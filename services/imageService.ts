
import { GoogleGenAI } from "@google/genai";

export const imageService = {
  generateLogo: async (companyName: string): Promise<string | null> => {
    try {
      // Always use process.env.API_KEY directly for initialization right before the call.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A professional, minimalist, and modern vector logo for a company named "${companyName}". The logo should be clean, centered, and suitable for a professional business profile. High contrast, white background, square composition.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Logo generation failed:", error);
      return null;
    }
  }
};
