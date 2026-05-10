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
                  text: `You are an expert ecommerce business analyst. Analyze this product for dropshipping/reselling: "${product}"

Respond ONLY with a JSON object, no markdown, no explanation, just raw JSON:
{
  "analysis": "2-3 sentence market analysis",
  "sellPrice": "recommended retail price in USD e.g. $29.99",
  "profitMargin": "estimated profit margin e.g. 45%",
  "bestPlatform": "best platform to sell on e.g. TikTok Shop",
  "supplier": "where to source this product and what to look for",
  "marketing": "specific marketing strategy with target audience",
  "actionPlan": [
    "First specific action step",
    "Second specific action step",
    "Third specific action step",
    "Fourth specific action step"
  ]
}`,
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
    
    const parts = data?.candidates?.[0]?.content?.parts;
    const textPart = parts?.find((p: any) => p.text && !p.thought);
    const text = textPart?.text || parts?.[0]?.text;
    
    if (!text) {
      return NextResponse.json({ error: "No response from AI." }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to analyze product. Please try again." },
      { status: 500 }
    );
  }
}
