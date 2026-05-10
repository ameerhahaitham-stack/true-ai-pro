import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { product, platform } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a viral social media content expert. Create a complete ${platform} campaign for this product: "${product}".

Reply with ONLY this JSON, no markdown, no backticks, keep values concise:
{"hook":"attention grabbing first 3 seconds under 15 words","script":"full 30-60 second video script with hook problem solution demo and call to action","caption":"ready to post caption with emojis under 150 characters","voiceover":"natural speaking text for voiceover under 100 words","hashtags":"30 hashtags mix of high medium and niche","thumbnail":"description of ideal thumbnail image under 50 words"}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({
        error: `No response from AI: ${JSON.stringify(data).substring(0, 200)}`,
      }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to generate content." },
      { status: 500 }
    );
  }
}
