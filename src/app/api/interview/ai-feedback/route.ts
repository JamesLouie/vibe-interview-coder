import { NextRequest, NextResponse } from 'next/server';
import { generateAIFeedback } from '@/utils/aiFeedback';

export async function POST(req: NextRequest) {
  try {
    const { problem, code } = await req.json();
    
    const result = await generateAIFeedback({ problem, code });
    
    return NextResponse.json(result);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'AI feedback error.';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
} 