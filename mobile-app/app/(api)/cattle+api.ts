import * as FileSystem from "expo-file-system";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Interfaces for type safety
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

class CattleHealthAnalyzer {
  private genAI: GoogleGenerativeAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Google API Key is required");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Convert image URI to base64
   * @param uri Local file URI
   * @returns Base64 encoded image string
   */
  private async imageToBase64(uri: string): Promise<string> {
    try {
      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Image conversion error:", error);
      throw new Error("Failed to convert image to base64");
    }
  }

  /**
   * Analyze cattle image for health issues
   * @param imageUri Local file URI of the image
   * @returns Detailed health analysis
   */
  async analyzeCattleImage(imageUri: string): Promise<CattleAnalysisResult> {
    try {
      // Validate image URI
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (!fileInfo.exists) {
        throw new Error("Image file does not exist");
      }

      // Convert image to base64
      const base64Image = await this.imageToBase64(imageUri);

      // Initialize Gemini model
      const model = this.genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      // Detailed prompt for image analysis
      const prompt = `
      Thoroughly analyze this cattle image for potential health issues:

      Detailed Assessment Criteria:
      1. Physical Condition Evaluation
      2. Potential Disease Indicators
      3. Visible Health Abnormalities
      4. Immediate Veterinary Recommendations

      Response Format (Strict JSON):
      {
        "cattle_diseases": [
          {
            "name": "Specific Disease Name",
            "symptoms": ["Detailed Symptom 1", "Detailed Symptom 2"],
            "possible_causes": ["Primary Cause", "Secondary Cause"]
          }
        ],
        "remedies": [
          {
            "disease": "Disease Name",
            "treatment": "Comprehensive Treatment Protocol",
            "prevention": "Preventive Measures and Best Practices"
          }
        ]
      }
      `;

      // Generate content
      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      // Extract and parse response
      const responseText = result.response
        .text()
        .replace(/```json\s*|\s*```/g, "")
        .trim();

      // Parse JSON response
      const analysisResult: CattleAnalysisResult = JSON.parse(responseText);

      return analysisResult;
    } catch (error) {
      console.error("Cattle Analysis Error:", error);
      throw error;
    }
  }
}

// Export the analyzer for use in the app
export default CattleHealthAnalyzer;
