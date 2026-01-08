
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not defined. Please configure it in your environment variables."
    );
  }

  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a professional image based on a prompt using gemini-2.5-flash-image.
 */
export async function generateThematicImage(prompt: string): Promise<string | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Professional high-tech corporate photography for a "Digital Equity Value Creation" presentation. Subject: ${prompt}. Style: minimalist, bright lighting, electric blue accents, technological growth, high-resolution, sharp focus, modern digital business environment, 16:9 aspect ratio.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return null;
  }
}

/**
 * Edits an existing image.
 */
export async function editImage(base64Data: string, mimeType: string, prompt: string): Promise<string | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `As a professional designer for Digital Equity Value Creation, modify this image based on: ${prompt}. Use electric blue branding, digital themes, and a modern corporate look. Return the edited image.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Edit Error:", error);
    return null;
  }
}

/**
 * Generates a complete slide deck (exactly 5 slides) with content and image prompts.
 */
export async function generateSlideDeck(userIntent: string): Promise<any[] | null> {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Senior Strategic Consultant at Digital Equity Value Creation.
      User Intent: "${userIntent}".
  Task: Create a cohesive 5 - slide strategy deck focused on digital transformation and value creation.

    Structure:
      Slide 1: Digital Equity Vision & Objective
      Slide 2: Digital Readiness & Market Opportunity
      Slide 3: Strategic Equity Framework
      Slide 4: Implementation Roadmap
      Slide 5: Value Realization & ROI
      
      For each slide, provide:
1. Title: Impactful, digital - growth oriented title.
      2. Subtitle: Strategic context.
      3. MainPoint: The core takeaway.
      4. BulletPoints: 3 strategic insights.
      5. Template: One of[EXECUTIVE_SUMMARY, STRATEGIC_FRAMEWORK, PORTFOLIO_GRID].
      6. VisualPrompt: A precise description for an AI image generator to create a professional digital / tech corporate visual.
      
      Return a JSON array containing exactly 5 slide objects.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              mainPoint: { type: Type.STRING },
              bulletPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              template: { type: Type.STRING },
              visualPrompt: { type: Type.STRING }
            },
            required: ["title", "subtitle", "mainPoint", "bulletPoints", "template", "visualPrompt"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Deck Generation Error:", error);
    return null;
  }
}
