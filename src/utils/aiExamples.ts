import { generateAIText, generateAIFeedback, generateChatResponse } from './aiFeedback';

/**
 * Examples of how to use the generic AI utility functions
 */

// Example 1: Generic text generation
export async function exampleGenericText() {
  const result = await generateAIText({
    prompt: "Explain the difference between a stack and a queue in data structures.",
    system: "You are a computer science tutor explaining concepts to students.",
    provider: 'anthropic',
    mode: 'development',
    maxTokens: 500,
    temperature: 0.7
  });

  console.log('Generated text:', result.text);
  console.log('Provider used:', result.provider);
  console.log('Model used:', result.model);
}

// Example 2: Code review with specific provider
export async function exampleCodeReview(code: string, problem: string) {
  const result = await generateAIFeedback({
    problem,
    code,
    provider: 'google', // Use Google's Gemini
    mode: 'production'  // Use higher quality model
  });

  console.log('Feedback:', result.feedback);
  console.log('Provider used:', result.provider);
  console.log('Model used:', result.model);
}

// Example 3: Chat response with context
export async function exampleChatWithContext(
  message: string, 
  problemContext: {
    title: string;
    difficulty: string;
    code: string;
  }
) {
  const result = await generateChatResponse(
    message,
    { problem: problemContext },
    'anthropic',  // Use Claude
    'development' // Use faster model
  );

  console.log('Chat response:', result.text);
  console.log('Provider used:', result.provider);
  console.log('Model used:', result.model);
}

// Example 4: Algorithm explanation
export async function exampleAlgorithmExplanation(algorithm: string) {
  const result = await generateAIText({
    prompt: `Explain how the ${algorithm} algorithm works, including its time and space complexity.`,
    system: "You are an expert in algorithms and data structures. Provide clear, detailed explanations with examples.",
    provider: 'anthropic',
    mode: 'production',
    maxTokens: 1000
  });

  return result;
}

// Example 5: Debugging help
export async function exampleDebuggingHelp(errorMessage: string, code: string) {
  const result = await generateAIText({
    prompt: `I'm getting this error: "${errorMessage}" in my code. Can you help me debug it?\n\nCode:\n${code}`,
    system: "You are a debugging expert. Help identify and fix issues in code.",
    provider: 'google',
    mode: 'development',
    maxTokens: 800
  });

  return result;
}

// Example 6: Performance optimization
export async function examplePerformanceOptimization(code: string) {
  const result = await generateAIText({
    prompt: `Analyze this code for performance improvements:\n\n${code}\n\nSuggest optimizations for time and space complexity.`,
    system: "You are a performance optimization expert. Focus on algorithmic improvements and best practices.",
    provider: 'anthropic',
    mode: 'production',
    maxTokens: 1200
  });

  return result;
} 