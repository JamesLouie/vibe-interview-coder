import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/utils/aiFeedback';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    try {
      const result = await generateChatResponse(
        message, 
        context, 
        (process.env.AI_PROVIDER as 'anthropic' | 'google') || 'anthropic',
        (process.env.AI_MODE as 'development' | 'production') || 'production'
      );

      return NextResponse.json({ message: result.text });
    } catch (aiError) {
      console.error('AI API error:', aiError);
      
      // Fallback to a basic response if AI fails
      const fallbackResponse = context?.problem 
        ? `I'm having trouble connecting to my AI service right now, but I can see you're working on "${context.problem.title}". Please try again in a moment, or you can ask me about general coding concepts.`
        : 'I\'m having trouble connecting to my AI service right now. Please try again in a moment.';
      
      return NextResponse.json({ message: fallbackResponse });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 