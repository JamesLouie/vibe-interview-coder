# Interview Prep App

A web application for practicing coding interview questions with instant code execution and AI-powered feedback.

## Features
- Browse and select Interview-style coding questions
- Write and run code in an in-browser editor
- See real-time console output and test results
- Get detailed AI feedback on your solution, including:
  - Time Complexity
  - Space Complexity
  - Correctness
  - Code Quality
  - Edge Cases
  - General Thoughts
  - Potential Improvements
- Supports both Anthropic (Claude) and Google (Gemini) AI models for feedback

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env.local` file in the project root with the following (see below for details):

```
# For Anthropic (Claude)
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
AI_MODE=development   # or production

# For Google (Gemini)
# AI_PROVIDER=google
# GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

- `AI_MODE=development` uses Claude Haiku (cheaper, faster)
- `AI_MODE=production` uses Claude Sonnet (higher quality)
- For Google, always uses Gemini 2.5 Flash model

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Select a question from the list
- Write your solution in the code editor
- Click "Run Code" to see test results and console output
- When all test cases pass, AI feedback will be generated and displayed

## Project Structure
- `src/app/interview/page.tsx` — Main UI for coding questions and feedback
- `src/utils/aiFeedback.ts` — AI feedback logic (model selection, prompt, etc.)
- `src/utils/stripMarkdownCodeBlock.ts` — Utility to clean up markdown from AI responses
- `src/data/questions.ts` — List of coding questions

## Requirements
- Node.js 18+
- API key for either Anthropic or Google Generative AI

## License
MIT
