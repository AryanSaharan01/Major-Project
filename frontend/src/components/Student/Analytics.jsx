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
import { TrendingUp, Target, Award, AlertTriangle } from 'lucide-react';
import { mockPerformanceData } from '../../data/mockData';

const StudentAnalytics = () => {
  const { student: performanceData } = mockPerformanceData;

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // Calculate overall stats
  const overallProgress = Math.round(
    performanceData.subjectProgress.reduce((sum, subject) => sum + subject.progress, 0) / 
    performanceData.subjectProgress.length
  );

  const averageWeeklyScore = Math.round(
    performanceData.weeklyScores.reduce((sum, week) => sum + week.score, 0) / 
    performanceData.weeklyScores.length
  );

  const weakestTopic = performanceData.topicWeakness.reduce((min, topic) => 
    topic.score < min.score ? topic : min
  );

  const strongestTopic = performanceData.topicWeakness.reduce((max, topic) => 
    topic.score > max.score ? topic : max
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analytics</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Track your progress and identify areas for improvement</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageWeeklyScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <p className="text-sm text-green-600 dark:text-green-300 mt-2">+5% from last month</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Strongest Topic</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{strongestTopic.topic}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
          <p className="text-sm text-purple-600 dark:text-purple-300 mt-2">{strongestTopic.score}% mastery</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Needs Improvement</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{weakestTopic.topic}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
          <p className="text-sm text-orange-600 dark:text-orange-300 mt-2">{weakestTopic.score}% mastery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Subject Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData.subjectProgress}>
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
              <Bar dataKey="progress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Performance Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Weekly Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData.weeklyScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Topic Weakness Analysis */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Topic Mastery Analysis</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={performanceData.topicWeakness} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="topic" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="score" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Progress Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData.subjectProgress}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ subject, progress }) => `${subject.split(' ')[0]}: ${progress}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="progress"
              >
                {performanceData.subjectProgress.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Subject Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Detailed Subject Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceData.subjectProgress.map((subject, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h3>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  subject.progress >= 80 ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-white' :
                  subject.progress >= 60 ? 'bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white' :
                  'bg-red-100 dark:bg-red-600 text-red-800 dark:text-white'
                }`}>
                  {subject.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full ${
                    subject.progress >= 80 ? 'bg-green-600' :
                    subject.progress >= 60 ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {subject.progress >= 80 ? 'Excellent progress! Keep it up.' :
                 subject.progress >= 60 ? 'Good progress. Focus on weak areas.' :
                 'Needs attention. Consider additional practice.'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-4">Personalized Recommendations</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-blue-800 dark:text-blue-200">
              Focus on <strong>{weakestTopic.topic}</strong> - your current mastery is {weakestTopic.score}%. 
              Try solving more practice problems in this area.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-blue-800 dark:text-blue-200">
              Your weekly performance shows an upward trend. Maintain consistent study habits to keep improving.
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-blue-800 dark:text-blue-200">
              Consider scheduling more time for subjects where your progress is below 70%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAnalytics;

