import axios from "axios";
import { OPENAI_API_KEY } from "../../contants";

export async function fetchChatCompletion(prompt: string) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error(
        "Terlalu banyak request ke OpenAI. Coba beberapa saat lagi."
      );
    }
    throw new Error("Terjadi kesalahan saat memanggil OpenAI.");
  }
}
