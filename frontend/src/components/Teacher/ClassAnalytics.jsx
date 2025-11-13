import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, Award, Target, BookOpen, Clock } from 'lucide-react';
import { mockPerformanceData } from '../../data/mockData';

const TeacherClassAnalytics = () => {
  const { teacher: analyticsData } = mockPerformanceData;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Calculate overall stats
  const totalStudents = analyticsData.studentPerformance.length;
  const averageClassScore = Math.round(
    analyticsData.studentPerformance.reduce((sum, student) => sum + student.avgScore, 0) / 
    totalStudents
  );
  const totalQuizzesCompleted = analyticsData.studentPerformance.reduce(
    (sum, student) => sum + student.quizzesCompleted, 0
  );

  // Performance distribution
  const performanceDistribution = [
    { range: '90-100%', count: analyticsData.studentPerformance.filter(s => s.avgScore >= 90).length },
    { range: '80-89%', count: analyticsData.studentPerformance.filter(s => s.avgScore >= 80 && s.avgScore < 90).length },
    { range: '70-79%', count: analyticsData.studentPerformance.filter(s => s.avgScore >= 70 && s.avgScore < 80).length },
    { range: '60-69%', count: analyticsData.studentPerformance.filter(s => s.avgScore >= 60 && s.avgScore < 70).length },
    { range: 'Below 60%', count: analyticsData.studentPerformance.filter(s => s.avgScore < 60).length },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Class Analytics</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Monitor overall class performance and progress</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageClassScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-300 mt-2">+3% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Quizzes Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuizzesCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.classProgress.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Subject Progress Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.classProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="subject" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgScore" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, count }) => count > 0 ? `${range}: ${count}` : ''}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {performanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Individual Student Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Average Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Quizzes Completed</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Performance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.studentPerformance
                .sort((a, b) => b.avgScore - a.avgScore)
                .map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                          index === 0 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                          index === 1 ? 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white' :
                          index === 2 ? 'bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-white' :
                          'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        student.avgScore >= 90 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                        student.avgScore >= 80 ? 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white' :
                        student.avgScore >= 70 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                        'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                      }`}>
                        {student.avgScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-200">{student.quizzesCompleted}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.avgScore >= 80 ? 'bg-green-600' :
                            student.avgScore >= 60 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}
                          style={{ width: `${student.avgScore}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject-wise Detailed Analysis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Subject-wise Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.classProgress.map((subject, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h3>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  subject.avgScore >= 80 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                  subject.avgScore >= 60 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                  'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                }`}>
                  {subject.avgScore}%
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Students Enrolled:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{subject.studentCount}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      subject.avgScore >= 80 ? 'bg-green-600' :
                      subject.avgScore >= 60 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${subject.avgScore}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {subject.avgScore >= 80 ? 'Excellent class performance' :
                   subject.avgScore >= 60 ? 'Good progress, room for improvement' :
                   'Needs attention and additional support'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">Teaching Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-blue-900 dark:text-blue-200">Strengths</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Strong performance in {analyticsData.classProgress.find(s => s.avgScore === Math.max(...analyticsData.classProgress.map(p => p.avgScore)))?.subject}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {performanceDistribution.find(p => p.range === '90-100%')?.count} students achieving excellence (90%+)
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-blue-900 dark:text-blue-200">Areas for Improvement</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Focus needed in {analyticsData.classProgress.find(s => s.avgScore === Math.min(...analyticsData.classProgress.map(p => p.avgScore)))?.subject}
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Consider additional support for students scoring below 70%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherClassAnalytics;
