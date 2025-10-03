import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw, BookOpen, CheckCircle, XCircle } from 'lucide-react';

const mockCodingProblems = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'First line contains n (size of array)\nSecond line contains n integers\nThird line contains target integer',
    outputFormat: 'Two integers representing the indices',
    constraints: '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹',
    examples: [
      {
        input: '4\n2 7 11 15\n9',
        output: '0 1',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1]'
      },
      {
        input: '3\n3 2 4\n6',
        output: '1 2',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2]'
      }
    ],
    starterCode: `function twoSum(nums, target) {
    // Your code here
    
}

// Test your solution
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));`
  },
  {
    id: '2',
    title: 'Reverse String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
    inputFormat: 'An array of characters',
    outputFormat: 'The same array with characters reversed',
    constraints: '1 ≤ s.length ≤ 10⁵\ns[i] is a printable ASCII character',
    examples: [
      {
        input: '["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    starterCode: `function reverseString(s) {
    // Your code here
    
}

// Test your solution
const s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);`
  },
  {
    id: '3',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
    inputFormat: 'A string s',
    outputFormat: 'Boolean (true if palindrome, false otherwise)',
    constraints: '1 ≤ s.length ≤ 2 × 10⁵\ns consists only of printable ASCII characters',
    examples: [
      {
        input: '"A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: 'After removing non-alphanumeric characters: "amanaplanacanalpanama" is a palindrome'
      },
      {
        input: '"race a car"',
        output: 'false',
        explanation: 'After removing non-alphanumeric characters: "raceacar" is not a palindrome'
      }
    ],
    starterCode: `function isPalindrome(s) {
    // Your code here
    
}

// Test your solution
const s = "A man, a plan, a canal: Panama";
console.log(isPalindrome(s));`
  }
];

const StudentCodingSection = () => {
  const [selectedProblem, setSelectedProblem] = useState(mockCodingProblems[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setOutput('');
    setTestResults([]);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    
    setTimeout(() => {
      try {
        // This is a mock execution - in a real app, you'd send this to a backend service
        const mockOutput = `Output:\n0 1\n\nExecution successful!`;
        setOutput(mockOutput);
        
        // Mock test results
        const mockResults = selectedProblem.examples.map((example, index) => ({
          passed: Math.random() > 0.3, // 70% pass rate for demo
          input: example.input,
          expected: example.output,
          actual: index === 0 ? '0 1' : 'Error: timeout'
        }));
        setTestResults(mockResults);
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
      setIsRunning(false);
    }, 2000);
  };

  const resetCode = () => {
    setCode(selectedProblem.starterCode);
    setOutput('');
    setTestResults([]);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Coding Section</h1>
        <p className="mt-2 text-gray-600">Practice coding problems and improve your programming skills</p>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Problem List */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Problems</h2>
            <div className="space-y-2">
              {mockCodingProblems.map(problem => (
                <button
                  key={problem.id}
                  onClick={() => handleProblemSelect(problem)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedProblem.id === problem.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{problem.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedProblem.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProblem.difficulty)}`}>
                {selectedProblem.difficulty}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProblem.description}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Input Format</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedProblem.inputFormat}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Output Format</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedProblem.outputFormat}</pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints</h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">{selectedProblem.constraints}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Examples</h3>
                <div className="space-y-4">
                  {selectedProblem.examples.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Example {index + 1}:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Input:</span>
                          <div className="bg-gray-50 p-2 rounded mt-1">
                            <pre className="text-sm text-gray-800">{example.input}</pre>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Output:</span>
                          <div className="bg-gray-50 p-2 rounded mt-1">
                            <pre className="text-sm text-gray-800">{example.output}</pre>
                          </div>
                        </div>
                        {example.explanation && (
                          <div>
                            <span className="text-sm font-medium text-gray-600">Explanation:</span>
                            <p className="text-sm text-gray-700 mt-1">{example.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor and Output */}
        <div className="col-span-5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
            {/* Editor Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Code Editor</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetCode}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-0">
              <Editor
                height="60%"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Output and Test Results */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              {output && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Output</h3>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm max-h-32 overflow-y-auto">
                    <pre>{output}</pre>
                  </div>
                </div>
              )}

              {testResults.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Test Results</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {result.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <span className="text-sm font-medium">Test {index + 1}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCodingSection;
