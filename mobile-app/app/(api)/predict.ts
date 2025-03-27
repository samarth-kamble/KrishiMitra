import * as FileSystem from "expo-file-system";

// Convert image to base64
const getBase64FromUri = async (uri: string) => {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};

// Function to predict disease using Hugging Face API
export async function predictPlantDisease(imageUri: string) {
  try {
    // Convert image to base64 format
    const base64Image = await getBase64FromUri(imageUri);
    const blob = `data:image/jpeg;base64,${base64Image}`;

    // Hugging Face API endpoint (Replace with your real API URL)
    const API_URL =
      "https://sankalp2606-Plant-Disease_diagnosis.hf.space/run/predict";

    // Make POST request to Hugging Face API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img: blob }),
    });

    const result = await response.json();

    // Ensure valid response
    if (!result || typeof result !== "object") {
      throw new Error("Invalid response from server");
    }

    return result;
  } catch (error) {
    console.error("Prediction Error:", error);
    return { error: "Failed to get prediction" };
  }
}
