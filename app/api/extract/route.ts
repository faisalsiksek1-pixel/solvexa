import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { imageBase64, mimeType } = await req.json();

  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType ?? "image/jpeg"};base64,${imageBase64}`,
              },
            },
            {
              type: "text",
              text: "Extract the math problem from this image. Return ONLY the problem statement as plain text, exactly as written. Do not solve it. Do not add any explanation or formatting.",
            },
          ],
        },
      ],
      temperature: 0.1,
    });

    const problem = completion.choices[0]?.message?.content?.trim() ?? "";

    if (!problem) {
      return NextResponse.json({ error: "Could not extract problem from image" }, { status: 400 });
    }

    return NextResponse.json({ problem });
  } catch (err) {
    console.error("Extract error:", err);
    return NextResponse.json({ error: "Failed to read image" }, { status: 500 });
  }
}
