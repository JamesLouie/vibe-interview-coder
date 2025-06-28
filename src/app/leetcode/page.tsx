'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { stripMarkdownCodeBlock } from '@/utils/stripMarkdownCodeBlock';
import { questions, Question } from '@/data/questions';
import CodeEditor from '@/components/CodeEditor';
import ConsoleOutput from '@/components/ConsoleOutput';
import { executeCode, ExecutionResult } from '@/utils/codeExecutor';

export default function LeetCodePage() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setCode(question.starterCode);
    setExecutionResult(null);
  };

  const handleRunCode = () => {
    if (!selectedQuestion) return;
    
    const result = executeCode(code, selectedQuestion.testCases);
    console.log('Execution result:', result); // Debug log
    setExecutionResult(result);
    
    // Always show console if there's output, or if there's an error
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
      setAiLoading(true);
      setAiError(null);
      setAiFeedback(null);
      fetch('/api/leetcode/ai-feedback', {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">LeetCode Practice</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              <div className="space-y-2">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
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
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {selectedQuestion ? (
              <>
                {/* Question Description */}
                <div className="bg-white rounded-lg shadow-md p-6">
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

                {/* Code Editor */}
                <div className="bg-white rounded-lg shadow-md p-6">
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
                </div>

                {/* Console Output */}
                {(showConsole || (executionResult && executionResult.consoleOutput.length > 0)) && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold mb-4">Console Output</h3>
                    <ConsoleOutput 
                      output={executionResult?.consoleOutput || []} 
                      isVisible={true} 
                    />
                    {/* Debug info */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                        <p>Debug: Console output length: {executionResult?.consoleOutput?.length || 0}</p>
                        <p>Debug: Show console state: {showConsole.toString()}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Results */}
                {executionResult && (
                  <div className="bg-white rounded-lg shadow-md p-6">
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
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
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
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">Select a question to start coding!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 