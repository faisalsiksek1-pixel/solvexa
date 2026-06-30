import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { problem, topic } = await req.json();

  if (!problem?.trim()) {
    return NextResponse.json({ error: "No problem provided" }, { status: 400 });
  }

  const prompt = `You are a math tutor. Solve the following math problem step by step.

Problem: ${problem}${topic ? `\nTopic: ${topic}` : ""}

Respond ONLY with a JSON object in this exact format, no markdown, no extra text:
{
  "statement": "the original problem",
  "topic": "the math topic (e.g. Algebra, Calculus, Geometry)",
  "difficulty": "foundation" or "standard" or "advanced" or "extension",
  "finalAnswer": "the final answer as plain text",
  "finalAnswerLatex": "the final answer in LaTeX notation (e.g. x = \\\\frac{3}{2})",
  "steps": [
    {
      "id": "s1",
      "title": "step title",
      "explanation": "clear explanation of this step in plain English",
      "math": "the math for this step in LaTeX notation (e.g. 2x + 3 = 7)"
    }
  ],
  "graphFunction": "if this problem involves a function to plot, provide it as a JavaScript math expression using x as the variable (e.g. '2*x + 3' or 'Math.sin(x)' or 'x*x - 4'). Leave as null if not applicable.",
  "graphXMin": -10,
  "graphXMax": 10
}

RULES:
- "explanation" must be plain English only — no LaTeX, no backslashes, no math notation
- "math" fields must use proper LaTeX: \\frac{a}{b} for fractions, \\sqrt{x} for square roots, \\pm for plus-minus, \\int for integrals, x^{2} for powers
- Do NOT use \\text{} in math fields — if you need "or", split into two separate steps
- Do NOT wrap math in dollar signs`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content ?? "";
    const solution = JSON.parse(text);
    solution.solvedAt = new Date().toISOString();

    return NextResponse.json(solution);
  } catch (err) {
    console.error("Groq error:", err);
    return NextResponse.json({ error: "Failed to solve problem" }, { status: 500 });
  }
}
