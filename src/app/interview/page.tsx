'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { stripMarkdownCodeBlock } from '@/utils/stripMarkdownCodeBlock';
import { questions, Question } from '@/data/questions';
import CodeEditor from '@/components/CodeEditor';
import ConsoleOutput from '@/components/ConsoleOutput';
import { executeCode, ExecutionResult } from '@/utils/codeExecutor';
import { useChatContext } from '@/contexts/ChatContext';
import confetti from 'canvas-confetti';

// Group questions by section
const questionsBySection = questions.reduce<Record<string, Question[]>>((acc, q) => {
  if (!acc[q.section]) acc[q.section] = [];
  acc[q.section].push(q);
  return acc;
}, {});

export default function InterviewPage() {
  const { setProblemContext } = useChatContext();
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Update chat context when question or code changes
  useEffect(() => {
    if (selectedQuestion) {
      setProblemContext({
        title: selectedQuestion.title,
        description: selectedQuestion.description,
        difficulty: selectedQuestion.difficulty,
        code,
        testResults: executionResult?.testResults
      });
    } else {
      setProblemContext(null);
    }
  }, [selectedQuestion, code, executionResult, setProblemContext]);

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setCode(question.starterCode);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    if (!selectedQuestion) return;
    const result = executeCode(code, selectedQuestion.testCases);
    setExecutionResult(result);
    if (result.consoleOutput.length > 0 || result.error) {
      setShowConsole(true);
    }
  };

  // Request AI feedback when all test cases pass
  useEffect(() => {
    if (
      executionResult &&
      executionResult.success &&
      executionResult.testResults &&
      executionResult.testResults.every(r => r.passed) &&
      selectedQuestion &&
      code
    ) {
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setAiLoading(true);
      setAiError(null);
      setAiFeedback(null);
      fetch('/api/interview/ai-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem: selectedQuestion.description,
          code,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.feedback) setAiFeedback(data.feedback);
          else setAiError(data.error || 'No feedback received.');
        })
        .catch(err => setAiError(err.message || 'AI feedback error.'))
        .finally(() => setAiLoading(false));
    }
  }, [executionResult, selectedQuestion, code]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice</h1>
        <p className="text-gray-600">Sharpen your skills with real interview questions and instant feedback.</p>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sticky Sidebar */}
        <aside className="w-80 min-w-[18rem] max-w-xs bg-white border-r border-gray-100 shadow-md flex-shrink-0 overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Questions by Topic</h2>
            <div className="space-y-6">
              {Object.entries(questionsBySection).map(([section, qs]) => (
                <div key={section}>
                  <h3 className="text-lg font-bold text-blue-700 mb-2">{section}</h3>
                  <div className="space-y-2">
                    {qs.map((question) => (
                      <div
                        key={question.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border border-transparent ${
                          selectedQuestion?.id === question.id
                            ? 'bg-blue-100 border-blue-300'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => handleQuestionSelect(question)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{question.title}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{question.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {selectedQuestion ? (
            <div className="flex flex-col lg:flex-row gap-6 p-6 h-full">
              {/* Left: Question Description */}
              <section className="lg:w-1/2 w-full flex flex-col gap-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{selectedQuestion.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line mb-4">{selectedQuestion.description}</p>
                  <div className="space-y-4">
                    {selectedQuestion.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                        <p className="text-sm"><strong>Input:</strong> {example.input}</p>
                        <p className="text-sm"><strong>Output:</strong> {example.output}</p>
                        {example.explanation && (
                          <p className="text-sm mt-2"><strong>Explanation:</strong> {example.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {executionResult && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                    {executionResult.success ? (
                      <div className="space-y-3">
                        {executionResult.testResults?.map((result, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border ${
                              result.passed
                                ? 'bg-green-50 border-green-200'
                                : 'bg-red-50 border-red-200'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">Test Case {index + 1}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.passed
                                  ? 'bg-green-200 text-green-800'
                                  : 'bg-red-200 text-red-800'
                              }`}>
                                {result.passed ? 'PASSED' : 'FAILED'}
                              </span>
                            </div>
                            <div className="text-sm space-y-1">
                              <p><strong>Input:</strong> {JSON.stringify(result.input)}</p>
                              <p><strong>Expected:</strong> {JSON.stringify(result.expected)}</p>
                              <p><strong>Actual:</strong> {JSON.stringify(result.actual)}</p>
                              {result.error && (
                                <p className="text-red-600"><strong>Error:</strong> {result.error}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <p className="text-red-800"><strong>Error:</strong> {executionResult.error}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Success Window */}
                {executionResult && executionResult.success && executionResult.testResults && executionResult.testResults.every(r => r.passed) && selectedQuestion && (
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4">🎉 All test cases passed!</h3>
                    <div>
                      <span className="font-semibold">AI Feedback:</span>
                      {aiLoading && <div className="text-green-700">Loading AI feedback...</div>}
                      {aiError && <div className="text-red-700">{aiError}</div>}
                      {aiFeedback && (
                        <div className="bg-white border border-green-200 rounded p-4 mt-2 text-green-900">
                          <ReactMarkdown 
                            components={{
                              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                              h2: ({children}) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                              h3: ({children}) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                              p: ({children}) => <p className="mb-2">{children}</p>,
                              ul: ({children}) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                              li: ({children}) => <li className="mb-1">{children}</li>,
                              code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
                              pre: ({children}) => <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
                              strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                            }}
                          >
                            {stripMarkdownCodeBlock(aiFeedback)}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Right: Code Editor & Console */}
              <section className="lg:w-1/2 w-full flex flex-col gap-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Code Editor</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowConsole(!showConsole)}
                        className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      >
                        {showConsole ? 'Hide' : 'Show'} Console
                      </button>
                      <button
                        onClick={handleRunCode}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Run Code
                      </button>
                    </div>
                  </div>
                  <CodeEditor
                    key={`question-${selectedQuestion.id}`}
                    code={code}
                    onChange={(value) => setCode(value || '')}
                  />
                  {showConsole && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Console Output</h3>
                      <ConsoleOutput 
                        output={executionResult?.consoleOutput || []} 
                        isVisible={true} 
                      />
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12">
              <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Select a question to start coding!</h2>
                <p className="text-gray-600">Browse the topics on the left and pick a problem to begin your interview prep journey.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 