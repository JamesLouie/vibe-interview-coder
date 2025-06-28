import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';

export async function POST(req: NextRequest) {
  const { problem, code } = await req.json();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Anthropic API key not set.' }, { status: 500 });
  }

  const anthropic = createAnthropic({ apiKey });

  const prompt = `You are an expert coding interviewer. Review the following coding problem and the candidate's solution. Provide feedback on correctness, time/space complexity, readability, and suggestions for improvement. Be concise and actionable.\n\nProblem:\n${problem}\n\nCandidate's Code:\n${code}\n\nFeedback:`;

  try {
    const { text } = await generateText({
      model: anthropic('claude-2'),
      system: 'You are an expert coding interviewer.',
      prompt,
      maxTokens: 512,
    });
    return NextResponse.json({ feedback: text });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'AI feedback error.';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
} 