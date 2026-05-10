import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { product } = await req.json();

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
                  text: `You are an expert ecommerce business analyst. Analyze this product for dropshipping/reselling: "${product}". Respond ONLY with raw JSON, no markdown, no backticks:
{"analysis":"market analysis here","sellPrice":"$29.99","profitMargin":"45%","bestPlatform":"TikTok Shop","supplier":"supplier info here","marketing":"marketing strategy here","actionPlan":["step 1","step 2","step 3","step 4"]}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      return NextResponse.json({ 
        error: `AI error: ${JSON.stringify(data).substring(0, 200)}` 
      }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to analyze product." },
      { status: 500 }
    );
  }
}
