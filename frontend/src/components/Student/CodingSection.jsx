import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { Play, RotateCcw, BookOpen, CheckCircle, XCircle, ChevronDown, ChevronRight, X } from 'lucide-react';

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

const topics = [
  { id: 'basics', title: 'Basics', problemIds: ['1'] },
  { id: 'arrays', title: 'Arrays', problemIds: ['1'] },
  { id: 'strings', title: 'Strings', problemIds: ['2', '3'] },
];

const getProblemById = (id) => mockCodingProblems.find(p => p.id === id);

const StudentCodingSection = () => {
  const [selectedProblem, setSelectedProblem] = useState(mockCodingProblems[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [expandedTopics, setExpandedTopics] = useState(() => new Set(topics.map(t => t.id)));
  const [problemProgress, setProblemProgress] = useState({});
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [canExitSolveView, setCanExitSolveView] = useState(false);
  const solveRef = useRef(null);

  const languageOptions = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
  ];

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setCode(getTemplateForLanguage(problem, language));
    setOutput('');
    setTestResults([]);
    setIsEditorOpen(true);
  };

  const getTemplateForLanguage = (problem, lang) => {
    // Prefer problem's own starterCode for JS if present
    if (lang === 'javascript' && problem.starterCode) return problem.starterCode;

    const titleComment = `// ${problem.title}`;
    switch (lang) {
      case 'typescript':
        return `${titleComment}
function solve(input: string): string {
  // Implement your solution here
  return '';
}

// Example usage
const exampleInput: string = '';
console.log(solve(exampleInput));`;
      case 'python':
        return `# ${problem.title}
from typing import *

def solve(input_str: str) -> str:
    # Implement your solution here
    return ''

if __name__ == '__main__':
    example_input: str = ''
    print(solve(example_input))`;
      case 'cpp':
        return `// ${problem.title}
#include <bits/stdc++.h>
using namespace std;

string solve(const string &inputStr) {
    // Implement your solution here
    return "";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string inputStr; // read input as needed
    cout << solve(inputStr) << "\n";
    return 0;
}`;
      case 'java':
        return `// ${problem.title}
import java.io.*;
import java.util.*;

public class Main {
    static String solve(String inputStr) {
        // Implement your solution here
        return "";
    }

    public static void main(String[] args) throws Exception {
        String inputStr = ""; // read input as needed
        System.out.println(solve(inputStr));
    }
}`;
      default:
        // javascript default when no problem starter provided
        return `${titleComment}
function solve(input) {
  // Implement your solution here
  return '';
}

// Example usage
const exampleInput = '';
console.log(solve(exampleInput));`;
    }
  };

  // Update editor content when language changes (like LeetCode behavior)
  useEffect(() => {
    setCode(getTemplateForLanguage(selectedProblem, language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, selectedProblem]);

  // Lock body scroll in solve fullscreen view
  useEffect(() => {
    if (isEditorOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isEditorOpen]);

  // Fullscreen helpers
  const enterFullscreen = async () => {
    try {
      const el = solveRef.current || document.documentElement;
      if (!document.fullscreenElement && el.requestFullscreen) {
        await el.requestFullscreen({ navigationUI: 'hide' });
      }
    } catch (_) {
      // ignore
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (_) {
      // ignore
    }
  };

  // Auto-enter fullscreen while solving, and resist accidental exit until submit
  useEffect(() => {
    if (!isEditorOpen) return;
    enterFullscreen();

    const handleFsChange = () => {
      if (!document.fullscreenElement && isEditorOpen && !canExitSolveView) {
        enterFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditorOpen, canExitSolveView]);

  const runCode = () => {
    setIsRunning(true);
    setOutput(`Running ${language} code...\n`);
    
    setTimeout(() => {
      try {
        // This is a mock execution - in a real app, you'd send this to a backend service
        const mockOutput = `Output:\n0 1\n\nExecution successful! [${language}]`;
        setOutput(mockOutput);
        
        // Mock test results
        const mockResults = selectedProblem.examples.map((example, index) => ({
          passed: Math.random() > 0.3, // 70% pass rate for demo
          input: example.input,
          expected: example.output,
          actual: index === 0 ? '0 1' : 'Error: timeout'
        }));
        setTestResults(mockResults);
        const passedCount = mockResults.filter(r => r.passed).length;
        const completed = passedCount >= Math.ceil(mockResults.length / 2);
        setProblemProgress(prev => ({
          ...prev,
          [selectedProblem.id]: { attempted: true, completed }
        }));
      } catch (error) {
        setOutput(`Error: ${error}`);
      }
      setIsRunning(false);
    }, 2000);
  };

  const resetCode = () => {
    setCode(getTemplateForLanguage(selectedProblem, language));
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice by Topic</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Choose a topic and solve problems you want to focus on</p>
      </div>

      <div className="space-y-6">
        {topics.map(topic => {
          const problems = topic.problemIds.map(getProblemById);
          const attempted = problems.filter(p => problemProgress[p.id]?.attempted).length;
          const completed = problems.filter(p => problemProgress[p.id]?.completed).length;
          const progressPct = Math.round((completed / problems.length) * 100);
          const isOpen = expandedTopics.has(topic.id);
          return (
            <div key={topic.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                className="w-full flex items-center justify-between p-5"
                onClick={() => {
                  setExpandedTopics(prev => {
                    const next = new Set(prev);
                    if (next.has(topic.id)) next.delete(topic.id); else next.add(topic.id);
                    return next;
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  {isOpen ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{topic.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{completed}/{problems.length} completed • {attempted} attempted</p>
                  </div>
                </div>
                <div className="w-40">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPct}%` }}></div>
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {problems.map(problem => (
                    <div key={problem.id} className="flex items-center justify-between p-4 md:p-5 border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${problemProgress[problem.id]?.completed ? 'bg-green-500' : problemProgress[problem.id]?.attempted ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{problem.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{problem.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>{problem.difficulty}</span>
                        <button
                          onClick={() => handleProblemSelect(problem)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          {problemProgress[problem.id]?.attempted ? 'Continue' : 'Solve'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditorOpen && (
        <div ref={solveRef} className="fixed inset-0 z-[9999] bg-white dark:bg-gray-900 flex flex-col h-screen w-screen overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedProblem.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(selectedProblem.difficulty)}`}>{selectedProblem.difficulty}</span>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="language" className="text-sm text-gray-600 dark:text-gray-300">Language:</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.label}</option>
                ))}
              </select>
              <button onClick={resetCode} className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Reset</span>
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
              <button
                onClick={async () => {
                  setCanExitSolveView(true);
                  await exitFullscreen();
                  setIsEditorOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
            {/* Left: Problem and Test Cases */}
            <div className="col-span-5 h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-700 dark:text-gray-200 mb-6">{selectedProblem.description}</p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Input Format</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{selectedProblem.inputFormat}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Output Format</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{selectedProblem.outputFormat}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{selectedProblem.constraints}</pre>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Test Cases</h4>
              <div className="space-y-3">
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Example {index + 1}</span>
                      {testResults[index] && (
                        testResults[index].passed ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Input:</span>
                      <div className="bg-gray-50 dark:bg-gray-800/60 p-2 rounded mt-1">
                        <pre className="text-sm text-gray-800 dark:text-gray-200">{example.input}</pre>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Expected:</span>
                      <div className="bg-gray-50 dark:bg-gray-800/60 p-2 rounded mt-1">
                        <pre className="text-sm text-gray-800 dark:text-gray-200">{example.output}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Editor and Output */}
            <div className="col-span-7 h-full flex flex-col overflow-hidden">
              <div className="flex-1 min-h-0">
                <Editor
                  height="100%"
                  language={language}
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
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4 overflow-y-auto max-h-64">
                {output && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Output</h5>
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm max-h-40 overflow-y-auto">
                      <pre>{output}</pre>
                    </div>
                  </div>
                )}
                {testResults.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Test Results</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {testResults.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                          <div className="flex items-center space-x-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Test {index + 1}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${result.passed ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'}`}>{result.passed ? 'Passed' : 'Failed'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCodingSection;
