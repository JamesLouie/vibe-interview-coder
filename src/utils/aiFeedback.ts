import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI, GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';
import { LanguageModelV1 } from 'ai';
import { CLAUDE_4_SONNET, CLAUDE_3_5_HAIKU, GEMINI_2_5_FLASH } from './aiModels';

// =========================
// Type Definitions
// =========================

// Model string examples:
//   Google: GEMINI_2_5_FLASH
//   Anthropic: CLAUDE_4_SONNET, CLAUDE_3_5_HAIKU

export interface AIGenerateRequest {
  prompt: string;
  system?: string;
  model?: string; // Model string, e.g. GEMINI_2_5_FLASH
  maxTokens?: number;
  temperature?: number;
}

export interface AIGenerateResponse {
  text: string;
  provider: 'anthropic' | 'google';
  model: string;
}

export interface AIFeedbackRequest {
  problem: string;
  code: string;
  model?: string;
}

export interface AIFeedbackResponse {
  feedback: string;
  provider: 'anthropic' | 'google';
  model: string;
}

export interface ProblemContext {
  title?: string;
  difficulty?: string;
  description?: string;
  code?: string;
  testResults?: Array<{
    passed: boolean;
    input: unknown;
    expected: unknown;
    actual: unknown;
    error?: string;
  }>;
}

// =========================
// Main Exported Functions
// =========================

/**
 * Generic AI text generation function
 * Determines provider/configuration based on model string.
 */
export async function generateAIText(request: AIGenerateRequest): Promise<AIGenerateResponse> {
  const {
    prompt,
    system = 'You are a helpful AI assistant.',
    model: modelString,
    maxTokens,
    temperature = 0.7
  } = request;

  // Determine provider and default model if not provided
  let provider: 'anthropic' | 'google';
  let model: LanguageModelV1;
  let modelName: string;

  if (!modelString) {
    provider = 'google';
    modelName = GEMINI_2_5_FLASH;
  } else if (modelString.startsWith('gemini')) {
    provider = 'google';
    modelName = GEMINI_2_5_FLASH;
  } else if (modelString.startsWith('claude')) {
    provider = 'anthropic';
    // If a specific Claude model is passed, use it, else default
    modelName = [CLAUDE_4_SONNET, CLAUDE_3_5_HAIKU].includes(modelString) ? modelString : CLAUDE_4_SONNET;
  } else {
    provider = 'google';
    modelName = GEMINI_2_5_FLASH;
  }

  // Instantiate model
  if (provider === 'google') {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('Google Generative AI API key not set. Set GOOGLE_GENERATIVE_AI_API_KEY environment variable.');
    }
    const google = createGoogleGenerativeAI({ apiKey });
    model = google(modelName);
  } else if (provider === 'anthropic') {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Anthropic API key not set.');
    }
    const anthropic = createAnthropic({ apiKey });
    model = anthropic(modelName);
  } else {
    throw new Error('Invalid AI provider configuration.');
  }

  const { text } = await generateText({
    model,
    system,
    prompt,
    maxTokens: maxTokens || (provider === 'google' ? 4096 : 1024),
    temperature,
    // Always include thinkingConfig for Google
    providerOptions: provider === 'google' ? {
      google: {
        thinkingConfig: {
          thinkingBudget: 4096,
        },
      } satisfies GoogleGenerativeAIProviderOptions,
    } : undefined,
  });

  return { 
    text, 
    provider, 
    model: modelName 
  };
}

/**
 * Specialized function for generating coding feedback
 * Accepts a model string (optional). Defaults to Anthropic if not provided.
 */
export async function generateAIFeedback(request: AIFeedbackRequest): Promise<AIFeedbackResponse> {
  const { problem, code } = request;

  const feedbackPrompt = `You are an expert coding interviewer. Review the following coding problem and the candidate's solution. Return your response in proper markdown format with the following exact structure:

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

  const result = await generateAIText({
    prompt: feedbackPrompt,
    system: 'You are an expert coding interviewer. Always respond in markdown format with clear sections and code formatting.',
  });

  return {
    feedback: result.text,
    provider: result.provider,
    model: result.model,
  };
}

/**
 * Specialized function for chat responses
 * Accepts a model string (optional). Defaults to Anthropic if not provided.
 */
export async function generateChatResponse(
  message: string, 
  context?: { problem?: ProblemContext }, 
): Promise<AIGenerateResponse> {
  // Build the system prompt based on context
  let systemPrompt = `You are a helpful coding assistant specializing in algorithms, data structures, and programming problems. You provide clear, practical advice and explanations. Always respond in a helpful, conversational tone.`;

  if (context?.problem) {
    const { problem } = context;
    systemPrompt += `\n\nCurrent Context:
- Problem: ${problem.title}
- Difficulty: ${problem.difficulty}
- Description: ${problem.description}
- Current Code: ${problem.code || 'No code provided yet'}
${problem.testResults ? `- Test Results: ${JSON.stringify(problem.testResults, null, 2)}` : ''}

Please provide helpful, specific guidance based on this context. If the user has failing tests, help them debug. If they're asking for algorithm suggestions, provide clear explanations.`;
  }

  // Create the user message with context
  let userMessage = message;
  if (context?.problem) {
    userMessage = `Context: Working on "${context.problem.title}" (${context.problem.difficulty})
Current code: ${context.problem.code || 'No code yet'}

User question: ${message}`;
  }

  return generateAIText({
    prompt: userMessage,
    system: systemPrompt,
  });
} 