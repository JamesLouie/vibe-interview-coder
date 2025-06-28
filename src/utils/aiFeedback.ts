import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI, GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';

interface AIFeedbackRequest {
  problem: string;
  code: string;
}

interface AIFeedbackResponse {
  feedback: string;
}

export async function generateAIFeedback(request: AIFeedbackRequest): Promise<AIFeedbackResponse> {
  const { problem, code } = request;
  const aiProvider = process.env.AI_PROVIDER || 'anthropic';
  const aiMode = process.env.AI_MODE || 'production';

  // Validate AI provider
  if (aiProvider !== 'google' && aiProvider !== 'anthropic') {
    throw new Error('Invalid AI_PROVIDER. Must be either "google" or "anthropic".');
  }

  let model;

  // Select model based on provider
  if (aiProvider === 'google') {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('Google Generative AI API key not set. Set GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
    }
    const google = createGoogleGenerativeAI({ apiKey });
    model = google('gemini-2.5-flash-preview-04-17');
  } else if (aiProvider === 'anthropic') {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not set.');
    }
    const anthropic = createAnthropic({ apiKey });
    
    // Select Anthropic model based on mode
    if (aiMode === 'development') {
      model = anthropic('claude-3-5-haiku-20241022');
    } else {
      model = anthropic('claude-4-sonnet-20250514');
    }
  } else {
    // This should never happen due to validation above, but TypeScript needs it
    throw new Error('Invalid AI provider configuration.');
  }

  const prompt = `You are an expert coding interviewer. Review the following coding problem and the candidate's solution. Return your response in proper markdown format with the following exact structure:

**Problem:**
${problem}

**Candidate's Code:**
\`\`\`
${code}
\`\`\`

**Your Response (in markdown):**

## Time Complexity
[Big O analysis and reasoning]

## Space Complexity  
[Memory usage analysis]

## Correctness
[Does it solve the problem correctly? Any bugs?]

## Code Quality
[Readability, variable naming, structure, comments]

## Edge Cases
[How well does it handle edge cases?]

## General Thoughts
[Overall assessment and what was done well]

## Potential Improvements
[Specific suggestions for enhancement]`;

  const { text } = await generateText({
    model,
    system: 'You are an expert coding interviewer. Always respond in markdown format with clear sections and code formatting.',
    prompt,
    maxTokens: aiProvider === 'google' ? 4096 : 1024,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingBudget: 4096,
        },
      } satisfies GoogleGenerativeAIProviderOptions,
    },
  });

  return { feedback: text };
} 