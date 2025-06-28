export interface TestResult {
  passed: boolean;
  input: unknown[];
  expected: unknown;
  actual: unknown;
  error?: string;
}

export interface ExecutionResult {
  success: boolean;
  output?: unknown;
  error?: string;
  testResults?: TestResult[];
  consoleOutput: string[];
}

export function executeCode(code: string, testCases: { input: unknown[]; output: unknown }[]): ExecutionResult {
  const consoleOutput: string[] = [];

  try {
    // Extract the function name from the code
    const functionMatch = code.match(/var\s+(\w+)\s*=\s*function/);
    if (!functionMatch) {
      return {
        success: false,
        error: 'Could not find function definition in code',
        consoleOutput
      };
    }
    const functionName = functionMatch[1];

    // Define the function in a local scope and return it by name
    const getUserFunction = new Function(`"use strict"; ${code}; return ${functionName};`);
    const userFunction = getUserFunction();

    const testResults: TestResult[] = [];
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      // Override console methods to capture output for this test case
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      const originalConsoleInfo = console.info;
      console.log = (...args: unknown[]) => {
        consoleOutput.push(`[LOG] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`);
        originalConsoleLog(...args);
      };
      console.error = (...args: unknown[]) => {
        consoleOutput.push(`[ERROR] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`);
        originalConsoleError(...args);
      };
      console.warn = (...args: unknown[]) => {
        consoleOutput.push(`[WARN] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`);
        originalConsoleWarn(...args);
      };
      console.info = (...args: unknown[]) => {
        consoleOutput.push(`[INFO] ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`);
        originalConsoleInfo(...args);
      };
      try {
        const result = userFunction(...testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.output);
        testResults.push({
          passed,
          input: testCase.input,
          expected: testCase.output,
          actual: result
        });
      } catch (error) {
        testResults.push({
          passed: false,
          input: testCase.input,
          expected: testCase.output,
          actual: undefined,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
      // Restore console methods after each test case
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      console.info = originalConsoleInfo;
    }
    
    return {
      success: true,
      testResults,
      consoleOutput
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      consoleOutput
    };
  }
} 