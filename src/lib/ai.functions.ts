import { createServerFn } from "@tanstack/react-start";

export const generateProgramContent = createServerFn({ method: "POST" })
  .validator((data: { title: string; category: string; field: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env["GEMINI_API_KEY"];
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server.");
    }

    let prompt = "";
    if (data.field === "description") {
      prompt = `You are a clinical nutritionist and copywriter for Reclaim Hormones clinic. Write a short, engaging 1-2 sentence description for a new program titled "${data.title}" (Category: ${data.category}). Return ONLY the text without quotes.`;
    } else if (data.field === "points") {
      prompt = `You are a clinical nutritionist and copywriter for Reclaim Hormones clinic. Write a comma-separated list of 3-4 key highlights or benefits for a program titled "${data.title}" (Category: ${data.category}). Return ONLY the text without any introductory text.`;
    } else if (data.field === "longDescription") {
      prompt = `You are a clinical nutritionist and copywriter for Reclaim Hormones clinic. Write a detailed 1-2 paragraph introduction for the detail page of a program titled "${data.title}" (Category: ${data.category}). Return ONLY the text without quotes.`;
    } else if (data.field === "whoFor") {
      prompt = `You are a clinical nutritionist and copywriter for Reclaim Hormones clinic. Write a list of who the program titled "${data.title}" (Category: ${data.category}) is ideal for. Provide 3-4 points separated by newlines. Return ONLY the text with no bullet points like -.`;
    } else if (data.field === "process") {
      prompt = `You are a clinical nutritionist and copywriter for Reclaim Hormones clinic. Write a step-by-step list explaining how the program titled "${data.title}" (Category: ${data.category}) works. Provide 3-4 points separated by newlines. Return ONLY the text with no numbers or bullet points.`;
    } else {
      throw new Error("Invalid field");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error("Failed to generate content from AI.");
    }

    const result = await response.json();
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error("AI returned empty response.");
    }

    return { text: generatedText.trim() };
  });
