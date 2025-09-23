import React from 'react';
import { Users, BookOpen, FileQuestion, TrendingUp, Clock, Award } from 'lucide-react';
import { mockSubjects, mockUsers, mockQuizzes, mockPerformanceData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  
  // Get teacher's subjects
  const teacherSubjects = mockSubjects.filter(subject => 
    subject.teacherId === user?.id
  );

  // Get total students across all subjects
  const totalStudents = new Set(
    teacherSubjects.flatMap(subject => subject.studentIds)
  ).size;

  // Get teacher's quizzes
  const teacherQuizzes = mockQuizzes.filter(quiz => 
    quiz.createdBy === user?.id
  );

  const activeQuizzes = teacherQuizzes.filter(quiz => quiz.isActive);

  const recentActivities = [
    { id: 1, action: 'New student enrolled', subject: 'Data Structures & Algorithms', time: '2 hours ago' },
    { id: 2, action: 'Quiz completed by John Doe', subject: 'Web Development', time: '4 hours ago' },
    { id: 3, action: 'Resource uploaded', subject: 'Data Structures & Algorithms', time: '1 day ago' },
    { id: 4, action: 'New quiz created', subject: 'Web Development', time: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="mt-2 text-gray-600">Here's your teaching overview for today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Subjects Teaching</p>
              <p className="text-2xl font-bold text-gray-900">{teacherSubjects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">{activeQuizzes.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">82%</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subjects Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Subjects</h2>
          <div className="space-y-4">
            {teacherSubjects.map(subject => (
              <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-600">{subject.studentIds.length} students enrolled</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{subject.resources.length} Resources</p>
                  <p className="text-sm text-gray-600">{subject.quizzes.length} Quizzes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Quizzes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Quizzes</h2>
          <div className="space-y-4">
            {activeQuizzes.map(quiz => {
              const subject = mockSubjects.find(s => s.id === quiz.subjectId);
              return (
                <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileQuestion className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">{subject?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {quiz.timeLimit} mins
                    </div>
                    <p className="text-sm text-gray-600">{quiz.questions.length} questions</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Students */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Performers</h2>
          <div className="space-y-4">
            {mockPerformanceData.teacher.studentPerformance.slice(0, 4).map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.quizzesCompleted} quizzes</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm font-medium ${
                  student.avgScore >= 90 ? 'bg-green-100 text-green-800' :
                  student.avgScore >= 80 ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {student.avgScore}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileQuestion className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Create New Quiz</p>
              <p className="text-sm text-gray-600">Add questions and set timing</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Upload Resource</p>
              <p className="text-sm text-gray-600">Add study materials</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Check class performance</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
