import React, { useState, useEffect } from 'react';
import { Clock, Trophy, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { mockQuizzes, mockSubjects, mockQuizAttempts } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StudentQuizzes = () => {
  const { user } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Get available quizzes for student
  const availableQuizzes = mockQuizzes.filter(quiz => quiz.isActive);
  const completedAttempts = mockQuizAttempts.filter(attempt => attempt.userId === user?.id);

  // Timer effect
  useEffect(() => {
    let interval;
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, timeLeft, quizCompleted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedQuiz) return;

    let correctAnswers = 0;
    selectedQuiz.questions.forEach(question => {
      if (question.type === 'mcq' && answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
    setQuizStarted(false);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(0);
  };

  if (quizCompleted && selectedQuiz) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quiz Completed!</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{selectedQuiz.title}</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">{score}%</p>
                <p className="text-gray-600 dark:text-gray-300">Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">
                  {Object.keys(answers).length}/{selectedQuiz.questions.length}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Answered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round((selectedQuiz.timeLimit * 60 - timeLeft) / 60)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">Minutes</p>
              </div>
            </div>
          </div>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (quizStarted && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedQuiz.title}</h1>
              <p className="text-gray-600 dark:text-gray-300">Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-xl font-mono font-bold text-red-600">
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                onClick={handleSubmitQuiz}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'mcq' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-200">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'coding' && currentQuestion.codingProblem && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Problem Statement:</h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">{currentQuestion.codingProblem.problemStatement}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Input Format:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-600 p-3 rounded border border-gray-200 dark:border-gray-700">
                        {currentQuestion.codingProblem.inputFormat}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Output Format:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-200 bg-white dark:bg-gray-600 p-3 rounded border border-gray-200 dark:border-gray-700">
                        {currentQuestion.codingProblem.outputFormat}
                      </p>
                    </div>
                  </div>
                </div>

                <textarea
                  value={answers[currentQuestion.id] || currentQuestion.codingProblem.starterCode}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg font-mono text-sm"
                  placeholder="Write your code here..."
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Quizzes</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Test your knowledge with interactive quizzes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Quizzes */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Available Quizzes</h2>
            <div className="space-y-4">
              {availableQuizzes.map(quiz => {
                const subject = mockSubjects.find(s => s.id === quiz.subjectId);
                const attempt = completedAttempts.find(a => a.quizId === quiz.id);
                
                return (
                  <div key={quiz.id} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{quiz.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{subject?.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{quiz.timeLimit} minutes</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4" />
                            <span>{quiz.questions.length} questions</span>
                          </div>
                        </div>
                      </div>
                      
                      {attempt ? (
                        <div className="text-right">
                          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            attempt.score >= 80 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                            attempt.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                            'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                          }`}>
                            {attempt.score}%
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Completed</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => startQuiz(quiz)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>Start Quiz</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quiz History */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Attempts</h2>
            <div className="space-y-3">
              {completedAttempts.slice(0, 5).map(attempt => {
                const quiz = mockQuizzes.find(q => q.id === attempt.quizId);
                return (
                  <div key={attempt.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{quiz?.title}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        attempt.score >= 80 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                        attempt.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                        'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                      }`}>
                        {attempt.score}%
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">{attempt.completedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 mt-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-200">Quiz Tips</h3>
            </div>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li>• Read questions carefully</li>
              <li>• Manage your time wisely</li>
              <li>• Review your answers before submitting</li>
              <li>• Don't refresh the page during quiz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzes;
