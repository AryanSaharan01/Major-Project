// Mock Users
export const mockUsers = [
  {
    id: '1',
    email: 'student@test.com',
    password: 'password',
    role: 'student',
    name: 'Mohit',
  },
  {
    id: '2',
    email: 'teacher@test.com',
    password: 'password',
    role: 'teacher',
    name: 'Dr. Swati Gupta',
  },
];

// Mock Subjects
export const mockSubjects = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    description: 'Learn fundamental data structures and algorithms',
    teacherId: '2',
    studentIds: ['1'],
    resources: [
      {
        id: '1',
        title: 'Introduction to Arrays',
        type: 'pdf',
        url: '#',
        uploadDate: '2024-01-15',
      },
      {
        id: '2',
        title: 'Linked Lists Explained',
        type: 'video',
        url: '#',
        uploadDate: '2024-01-20',
      },
    ],
    quizzes: ['1', '2'],
  },
  {
    id: '2',
    name: 'Web Development',
    description: 'Modern web development with React and Node.js',
    teacherId: '2',
    studentIds: ['1'],
    resources: [
      {
        id: '3',
        title: 'React Fundamentals',
        type: 'document',
        url: '#',
        uploadDate: '2024-01-10',
      },
    ],
    quizzes: ['3'],
  },
];

// Mock Quizzes
export const mockQuizzes = [
  {
    id: '1',
    title: 'Arrays and Strings Quiz',
    subjectId: '1',
    timeLimit: 30,
    createdBy: '2',
    createdAt: '2024-01-15',
    isActive: true,
    questions: [
      {
        id: '1',
        type: 'mcq',
        question: 'What is the time complexity of accessing an element in an array by index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(1)',
      },
      {
        id: '2',
        type: 'mcq',
        question: 'Which of the following is true about arrays?',
        options: [
          'Arrays have fixed size in most languages',
          'Array elements must be of the same type',
          'Array indices start from 0',
          'All of the above',
        ],
        correctAnswer: 'All of the above',
      },
    ],
  },
  {
    id: '2',
    title: 'Coding Challenge: Two Sum',
    subjectId: '1',
    timeLimit: 45,
    createdBy: '2',
    createdAt: '2024-01-20',
    isActive: true,
    questions: [
      {
        id: '3',
        type: 'coding',
        question: 'Two Sum Problem',
        codingProblem: {
          problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
          inputFormat: 'First line contains n (size of array)\nSecond line contains n integers\nThird line contains target integer',
          outputFormat: 'Two integers representing the indices',
          constraints: '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹',
          examples: [
            {
              input: '4\n2 7 11 15\n9',
              output: '0 1',
              explanation: 'nums[0] + nums[1] = 2 + 7 = 9',
            },
          ],
          starterCode: `function twoSum(nums, target) {
    // Your code here
    
}`,
        },
      },
    ],
  },
  {
    id: '3',
    title: 'React Basics Quiz',
    subjectId: '2',
    timeLimit: 25,
    createdBy: '2',
    createdAt: '2024-01-10',
    isActive: true,
    questions: [
      {
        id: '4',
        type: 'mcq',
        question: 'What is JSX?',
        options: [
          'A JavaScript library',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database query language',
        ],
        correctAnswer: 'A syntax extension for JavaScript',
      },
    ],
  },
];

// Mock Quiz Attempts
export const mockQuizAttempts = [
  {
    id: '1',
    userId: '1',
    quizId: '1',
    answers: [
      { questionId: '1', answer: 'O(1)' },
      { questionId: '2', answer: 'All of the above' },
    ],
    score: 100,
    completedAt: '2024-01-16',
    timeSpent: 15,
  },
  {
    id: '2',
    userId: '1',
    quizId: '3',
    answers: [{ questionId: '4', answer: 'A syntax extension for JavaScript' }],
    score: 100,
    completedAt: '2024-01-12',
    timeSpent: 8,
  },
];

// Performance Data
export const mockPerformanceData = {
  student: {
    subjectProgress: [
      { subject: 'Data Structures', progress: 85, total: 100 },
      { subject: 'Web Development', progress: 70, total: 100 },
      { subject: 'Algorithms', progress: 60, total: 100 },
    ],
    weeklyScores: [
      { week: 'Week 1', score: 85 },
      { week: 'Week 2', score: 78 },
      { week: 'Week 3', score: 92 },
      { week: 'Week 4', score: 88 },
      { week: 'Week 5', score: 95 },
    ],
    topicWeakness: [
      { topic: 'Dynamic Programming', score: 45 },
      { topic: 'Graph Algorithms', score: 60 },
      { topic: 'Tree Traversal', score: 75 },
      { topic: 'Sorting', score: 90 },
    ],
  },
  teacher: {
    classProgress: [
      { subject: 'Data Structures', avgScore: 78, studentCount: 25 },
      { subject: 'Web Development', avgScore: 82, studentCount: 30 },
      { subject: 'Algorithms', avgScore: 75, studentCount: 22 },
    ],
    studentPerformance: [
      { name: 'John Doe', avgScore: 85, quizzesCompleted: 8 },
      { name: 'Alice Brown', avgScore: 92, quizzesCompleted: 9 },
      { name: 'Bob Wilson', avgScore: 78, quizzesCompleted: 7 },
      { name: 'Carol Davis', avgScore: 88, quizzesCompleted: 8 },
    ],
  },
};
