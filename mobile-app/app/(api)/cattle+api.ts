import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;

if (!GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in environment variables.");
}

interface CattleDisease {
  name: string;
  symptoms: string[];
  possible_causes: string[];
}

interface DiseaseRemedy {
  disease: string;
  treatment: string;
  prevention: string;
}

interface CattleAnalysisResult {
  cattle_diseases: CattleDisease[];
  remedies: DiseaseRemedy[];
}

interface GeminiResponse {
  candidates?: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

/**
 * Converts an image at the given URI to a base64 string.
 * @param uri The file URI to read.
 * @returns A Promise resolving to a base64-encoded string.
 */
async function getBase64(uri: string): Promise<string> {
  try {
    return await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    throw new Error(`Failed to convert image to base64: ${(error as Error).message}`);
  }
}

/**
 * Analyzes a cattle image for potential diseases.
 * @param imageUri The URI of the image to analyze.
 * @param mimeType The MIME type of the image.
 * @returns A Promise resolving to a `CattleAnalysisResult` object.
 */
export async function analyzeCattleImage(
  imageUri: string,
  mimeType: string
): Promise<CattleAnalysisResult> {
  try {
    if (!imageUri) {
      throw new Error("No image provided.");
    }

    const base64Image = await getBase64(imageUri);

    const prompt = `
Analyze this image of cattle for signs of disease.
Specifically, look for:
- Skin lesions, ulcers, or unusual growths.
- Signs of lameness or difficulty walking.
- Discharge from the eyes, nose, or mouth.
- Swelling or inflammation.
- Changes in coat condition.
- Any other abnormalities.

Respond ONLY in JSON format with the following structure:
{
    "cattle_diseases": [
        {
            "name": "Disease Name",
            "symptoms": ["Symptom1", "Symptom2"],
            "possible_causes": ["Cause1", "Cause2"]
        }
    ],
    "remedies": [
        {
            "disease": "Disease Name",
            "treatment": "Treatment plan",
            "prevention": "Prevention tips"
        }
    ]
}
Do not include any extra text.
`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();

    if ((data.candidates ?? []).length > 0) {
      let responseText = (data.candidates ?? [])[0].content.parts[0]?.text?.trim();

      if (!responseText) {
        throw new Error("Empty response from Gemini API.");
      }

      if (responseText.startsWith("```json")) {
        responseText = responseText.replace(/```json\s*|\s*```/g, "").trim();
      }

      try {
        return JSON.parse(responseText) as CattleAnalysisResult;
      } catch (error) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
    } else {
      throw new Error("No valid response from Gemini API.");
    }
  } catch (error) {
    throw new Error(`Error analyzing image: ${(error as Error).message}`);
  }
}
