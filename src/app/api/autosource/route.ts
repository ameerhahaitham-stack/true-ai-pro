import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { input, mode } = await req.json();

    let prompt = "";

    if (mode === "Auto-Source") {
      prompt = `You are a product sourcing expert. Find the best suppliers for: "${input}".
Reply with ONLY this JSON, no markdown:
{"summary":"brief sourcing overview","suppliers":[{"platform":"Alibaba","rating":"4.8 stars","priceRange":"$3-8 per unit","moq":"50 units","shipping":"ePacket 7-14 days","notes":"look for trade assurance verified suppliers"},{"platform":"AliExpress","rating":"4.6 stars","priceRange":"$5-12 per unit","moq":"1 unit","shipping":"Standard 10-20 days","notes":"good for testing before bulk order"},{"platform":"DHgate","rating":"4.5 stars","priceRange":"$4-9 per unit","moq":"10 units","shipping":"DHL 5-10 days","notes":"good middle ground for small bulk"}],"nextSteps":["step 1","step 2","step 3","step 4"]}`;
    } else if (mode === "AI Clone") {
      prompt = `You are a content style analyst. Analyze this content and clone the style: "${input}".
Reply with ONLY this JSON, no markdown:
{"styleProfile":"analysis of their unique voice tone and patterns in 2 sentences","clonedPosts":[{"content":"new post written in their exact style"},{"content":"another post in their exact style"},{"content":"third post in their exact style"}]}`;
    } else {
      prompt = `You are a collaboration matchmaker for ecommerce. Find collaboration matches for this niche: "${input}".
Reply with ONLY this JSON, no markdown:
{"summary":"why these matches work for this niche","matches":[{"type":"Micro Influencer 10k-100k","matchScore":"95% match","description":"why this type works","whereToFind":"TikTok and Instagram"},{"type":"Content Creator UGC","matchScore":"90% match","description":"why this type works","whereToFind":"TikTok Creator Marketplace"},{"type":"Niche Blogger","matchScore":"85% match","description":"why this type works","whereToFind":"Instagram and YouTube"}]}`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json({ error: "No response from AI." }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Failed to process request." },
      { status: 500 }
    );
  }
}
