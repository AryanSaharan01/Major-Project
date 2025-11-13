import React, { useState } from 'react';
import { Plus, Trash2, Save, FileQuestion, Code } from 'lucide-react';
import { mockSubjects } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const TeacherCreateQuiz = () => {
  const { user } = useAuth();
  const teacherSubjects = mockSubjects.filter(subject => subject.teacherId === user?.id);

  const [quizData, setQuizData] = useState({
    title: '',
    subjectId: '',
    timeLimit: 30,
    isActive: true,
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    id: '',
    type: 'mcq',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null);

  const handleQuizDataChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addQuestion = () => {
    if (editingQuestionIndex !== null) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingQuestionIndex] = { ...currentQuestion, id: Date.now().toString() };
      setQuestions(updatedQuestions);
      setEditingQuestionIndex(null);
    } else {
      // Add new question
      const newQuestion = { ...currentQuestion, id: Date.now().toString() };
      setQuestions([...questions, newQuestion]);
    }

    // Reset form
    setCurrentQuestion({
      id: '',
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
    setShowQuestionForm(false);
  };

  const editQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditingQuestionIndex(index);
    setShowQuestionForm(true);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveQuiz = () => {
    if (!quizData.title || !quizData.subjectId || questions.length === 0) {
      alert('Please fill all required fields and add at least one question');
      return;
    }

    const newQuiz = {
      id: Date.now().toString(),
      ...quizData,
      questions,
      createdBy: user?.id || '',
      createdAt: new Date().toISOString(),
    };

    console.log('Quiz created:', newQuiz);
    alert('Quiz created successfully!');

    // Reset form
    setQuizData({ title: '', subjectId: '', timeLimit: 30, isActive: true });
    setQuestions([]);
  };

  const handleCodingQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      codingProblem: {
        ...prev.codingProblem,
        problemStatement: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        examples: [],
        starterCode: '',
        ...(prev.codingProblem || {}),
        [field]: value,
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Quiz</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Design quizzes with multiple choice and coding questions</p>
      </div>

      {/* Quiz Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quiz Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              value={quizData.title}
              onChange={(e) => handleQuizDataChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject *
            </label>
            <select
              value={quizData.subjectId}
              onChange={(e) => handleQuizDataChange('subjectId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a subject</option>
              {teacherSubjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              value={quizData.timeLimit}
              onChange={(e) => handleQuizDataChange('timeLimit', parseInt(e.target.value))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={quizData.isActive}
              onChange={(e) => handleQuizDataChange('isActive', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Make quiz active immediately
            </label>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Questions ({questions.length})
          </h2>
          <button
            onClick={() => setShowQuestionForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Question</span>
          </button>
        </div>

        {questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Question {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        question.type === 'mcq' 
                          ? 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white' 
                          : 'bg-purple-100 dark:bg-purple-600 text-purple-800 dark:text-white'
                      }`}>
                        {question.type === 'mcq' ? 'Multiple Choice' : 'Coding'}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">{question.question}</h3>
                    
                    {question.type === 'mcq' && question.options && (
                      <div className="space-y-1">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className={`text-sm p-2 rounded ${
                            option === question.correctAnswer 
                              ? 'bg-green-50 dark:bg-green-600/30 text-green-700 dark:text-green-200' 
                              : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => editQuestion(index)}
                      className="p-2 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FileQuestion className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteQuestion(index)}
                      className="p-2 text-red-600 dark:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileQuestion className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-300">No questions added yet. Click "Add Question" to get started.</p>
          </div>
        )}
      </div>

      {/* Question Form Modal */}
      {showQuestionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingQuestionIndex !== null ? 'Edit Question' : 'Add Question'}
              </h3>

              <div className="space-y-4">
                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question Type
                  </label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => handleQuestionChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="mcq">Multiple Choice</option>
                    <option value="coding">Coding Problem</option>
                  </select>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Question *
                  </label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => handleQuestionChange('question', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your question"
                  />
                </div>

                {currentQuestion.type === 'mcq' ? (
                  <>
                    {/* MCQ Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Options *
                      </label>
                      <div className="space-y-2">
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500 w-6">
                              {String.fromCharCode(65 + index)}.
                            </span>
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Correct Answer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correct Answer *
                      </label>
                      <select
                        value={currentQuestion.correctAnswer}
                        onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select correct answer</option>
                        {currentQuestion.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {String.fromCharCode(65 + index)}. {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Coding Problem Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        value={currentQuestion.codingProblem?.problemStatement || ''}
                        onChange={(e) => handleCodingQuestionChange('problemStatement', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe the problem in detail"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Input Format
                        </label>
                        <textarea
                          value={currentQuestion.codingProblem?.inputFormat || ''}
                          onChange={(e) => handleCodingQuestionChange('inputFormat', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe input format"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Output Format
                        </label>
                        <textarea
                          value={currentQuestion.codingProblem?.outputFormat || ''}
                          onChange={(e) => handleCodingQuestionChange('outputFormat', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe output format"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Starter Code
                      </label>
                      <textarea
                        value={currentQuestion.codingProblem?.starterCode || ''}
                        onChange={(e) => handleCodingQuestionChange('starterCode', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="function solution() {&#10;    // Your code here&#10;}"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowQuestionForm(false);
                    setEditingQuestionIndex(null);
                    setCurrentQuestion({
                      id: '',
                      type: 'mcq',
                      question: '',
                      options: ['', '', '', ''],
                      correctAnswer: '',
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingQuestionIndex !== null ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Quiz */}
      <div className="flex justify-end">
        <button
          onClick={saveQuiz}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          <span>Save Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherCreateQuiz;
