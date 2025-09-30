import React from 'react';
import { BookOpen, Trophy, Clock, Bell, TrendingUp } from 'lucide-react';
import { mockSubjects, mockQuizzes, mockQuizAttempts, mockPerformanceData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  
  // Get student's subjects
  const studentSubjects = mockSubjects.filter(subject => 
    subject.studentIds.includes(user?.id || '')
  );

  // Get upcoming quizzes
  const upcomingQuizzes = mockQuizzes.filter(quiz => quiz.isActive).slice(0, 3);

  // Get recent quiz scores
  const recentScores = mockQuizAttempts.filter(attempt => attempt.userId === user?.id).slice(0, 3);

  const notifications = [
    { id: 1, message: 'New quiz available in Data Structures', time: '2 hours ago', type: 'quiz' },
    { id: 2, message: 'Assignment deadline approaching for Web Development', time: '1 day ago', type: 'warning' },
    { id: 3, message: 'Great job on your recent performance!', time: '3 days ago', type: 'success' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Enrolled Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentSubjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gray-600 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quizzes Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{recentScores.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-gray-600 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {recentScores.length > 0 ? Math.round(recentScores.reduce((sum, score) => sum + score.score, 0) / recentScores.length) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gray-600 dark:text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Quizzes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingQuizzes.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-600 dark:text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrolled Subjects */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Enrolled Subjects</h2>
          <div className="space-y-4">
            {studentSubjects.map(subject => (
              <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-gray-600 dark:text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{subject.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{subject.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{subject.resources.length} Resources</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{subject.quizzes.length} Quizzes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Upcoming Quizzes</h2>
          <div className="space-y-4">
            {upcomingQuizzes.map(quiz => {
              const subject = mockSubjects.find(s => s.id === quiz.subjectId);
              return (
                <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-gray-600 dark:text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{subject?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{quiz.timeLimit} mins</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{quiz.questions.length} questions</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Scores */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Quiz Scores</h2>
          <div className="space-y-4">
            {recentScores.map(attempt => {
              const quiz = mockQuizzes.find(q => q.id === attempt.quizId);
              return (
                <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{quiz?.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Completed on {attempt.completedAt}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      attempt.score >= 80 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                      attempt.score >= 60 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                      'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                    }`}>
                      {attempt.score}%
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{attempt.timeSpent} mins</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  notification.type === 'quiz' ? 'bg-blue-100 dark:bg-blue-600' :
                  notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-600' :
                  'bg-green-100 dark:bg-green-600'
                }`}>
                  <Bell className={`w-4 h-4 ${
                    notification.type === 'quiz' ? 'text-blue-600 dark:text-white' :
                    notification.type === 'warning' ? 'text-yellow-600 dark:text-white' :
                    'text-green-600 dark:text-white'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
