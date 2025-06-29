# AI Utility Documentation

The `aiFeedback.ts` utility has been enhanced to provide a generic, flexible AI interface that supports multiple providers and use cases.

## 🚀 Features

- **Multi-Provider Support**: Anthropic (Claude) and Google (Gemini)
- **Flexible Configuration**: Development vs Production modes
- **Context-Aware Responses**: Problem-specific guidance
- **Type Safety**: Full TypeScript support
- **Error Handling**: Graceful fallbacks and error management

## 📦 Available Functions

### 1. `generateAIText()` - Generic Text Generation

The most flexible function for any AI text generation task.

```typescript
import { generateAIText } from '@/utils/aiFeedback';

const result = await generateAIText({
  prompt: "Your question or request here",
  system: "Optional system prompt to define AI behavior",
  provider: 'anthropic', // or 'google'
  mode: 'development',   // or 'production'
  maxTokens: 1000,       // optional
  temperature: 0.7       // optional
});

console.log(result.text);      // Generated response
console.log(result.provider);  // Which provider was used
console.log(result.model);     // Which model was used
```

### 2. `generateChatResponse()` - Chat-Specific Responses

Optimized for chat interactions with context awareness.

```typescript
import { generateChatResponse } from '@/utils/aiFeedback';

const result = await generateChatResponse(
  "I'm stuck on this problem",  // user message
  {                             // optional context
    problem: {
      title: "Two Sum",
      difficulty: "Easy",
      code: "function twoSum(nums, target) { ... }",
      testResults: [...]
    }
  },
  'anthropic',  // optional provider
  'development' // optional mode
);
```

### 3. `generateAIFeedback()` - Code Review

Specialized for reviewing code solutions.

```typescript
import { generateAIFeedback } from '@/utils/aiFeedback';

const result = await generateAIFeedback({
  problem: "Problem description here",
  code: "Your solution code here",
  provider: 'google',    // optional
  mode: 'production'     // optional
});

console.log(result.feedback); // Detailed code review
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# AI Provider (anthropic or google)
AI_PROVIDER=anthropic

# AI Mode (development or production)
AI_MODE=development

# API Keys
ANTHROPIC_API_KEY=your_anthropic_key_here
GOOGLE_GENERATIVE_AI_API_KEY=your_google_key_here
```

### Provider Options

| Provider | Development Model | Production Model |
|----------|------------------|------------------|
| Anthropic | claude-3-5-haiku-20241022 | claude-4-sonnet-20250514 |
| Google | gemini-2.5-flash-preview-04-17 | gemini-2.5-pro-preview-04-17 |

### Mode Differences

- **Development**: Faster, cheaper models for testing and development
- **Production**: Higher quality models for production use

## 🎯 Use Cases

### 1. Algorithm Explanations

```typescript
const result = await generateAIText({
  prompt: "Explain how quicksort works with examples",
  system: "You are an algorithms expert. Provide clear explanations with code examples.",
  provider: 'anthropic',
  mode: 'production'
});
```

### 2. Code Debugging

```typescript
const result = await generateAIText({
  prompt: `I'm getting this error: "${error}" in my code. Help me debug it.`,
  system: "You are a debugging expert. Help identify and fix issues.",
  provider: 'google',
  mode: 'development'
});
```

### 3. Performance Optimization

```typescript
const result = await generateAIText({
  prompt: `Analyze this code for performance improvements:\n${code}`,
  system: "You are a performance optimization expert.",
  provider: 'anthropic',
  mode: 'production',
  maxTokens: 1200
});
```

### 4. Context-Aware Chat

```typescript
const result = await generateChatResponse(
  "Why are my tests failing?",
  {
    problem: {
      title: "Valid Parentheses",
      difficulty: "Easy",
      code: currentCode,
      testResults: failingTests
    }
  }
);
```

## 🔧 Advanced Usage

### Custom System Prompts

```typescript
const result = await generateAIText({
  prompt: "Explain binary search",
  system: `You are a computer science professor teaching first-year students. 
           Use simple language and provide step-by-step explanations. 
           Include visual examples when possible.`,
  provider: 'anthropic',
  temperature: 0.3 // Lower temperature for more focused responses
});
```

### Provider-Specific Features

```typescript
// Google's thinking feature for complex reasoning
const result = await generateAIText({
  prompt: "Solve this complex algorithm problem step by step",
  provider: 'google',
  mode: 'production',
  // Google-specific options are automatically applied
});
```

## 🛠️ Error Handling

The utility includes comprehensive error handling:

```typescript
try {
  const result = await generateAIText({
    prompt: "Your request here",
    provider: 'anthropic'
  });
  console.log(result.text);
} catch (error) {
  if (error.message.includes('API key not set')) {
    console.error('Please set your API key in .env.local');
  } else if (error.message.includes('Invalid AI provider')) {
    console.error('Provider must be "anthropic" or "google"');
  } else {
    console.error('AI service error:', error.message);
  }
}
```

## 📊 Response Format

All functions return a consistent response format:

```typescript
interface AIGenerateResponse {
  text: string;           // The generated response
  provider: AIProvider;   // Which provider was used
  model: string;          // Which specific model was used
}
```

## 🚀 Getting Started

1. **Set up environment variables** (see Configuration section)
2. **Import the functions** you need
3. **Choose your provider and mode**
4. **Start generating AI responses!**

```typescript
import { generateAIText } from '@/utils/aiFeedback';

// Simple example
const result = await generateAIText({
  prompt: "What is the time complexity of binary search?",
  provider: 'anthropic',
  mode: 'development'
});

console.log(result.text);
```

## 🔄 Migration from Old API

If you were using the old `generateAIFeedback` function, the new API is backward compatible:

```typescript
// Old way (still works)
const feedback = await generateAIFeedback({ problem, code });

// New way (with more options)
const feedback = await generateAIFeedback({ 
  problem, 
  code, 
  provider: 'google',
  mode: 'production' 
});
```

The utility is now much more flexible and can handle any AI text generation task while maintaining the specialized functions for common use cases. 