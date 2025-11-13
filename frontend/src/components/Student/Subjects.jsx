import React, { useState } from 'react';
import { BookOpen, Download, Play, FileText } from 'lucide-react';
import { mockSubjects } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const StudentSubjects = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('syllabus');

  // Get student's subjects
  const studentSubjects = mockSubjects.filter(subject => 
    subject.studentIds.includes(user?.id || '')
  );

  const selectedSubjectData = selectedSubject 
    ? studentSubjects.find(s => s.id === selectedSubject)
    : null;

  const syllabusContent = {
    '1': {
      modules: [
        {
          title: 'Module 1: Arrays and Strings',
          topics: ['Array basics', 'Two-pointer technique', 'String manipulation', 'Sliding window'],
          duration: '2 weeks'
        },
        {
          title: 'Module 2: Linked Lists',
          topics: ['Singly linked lists', 'Doubly linked lists', 'Circular linked lists', 'List operations'],
          duration: '2 weeks'
        },
        {
          title: 'Module 3: Stacks and Queues',
          topics: ['Stack operations', 'Queue operations', 'Deque', 'Applications'],
          duration: '1 week'
        },
        {
          title: 'Module 4: Trees',
          topics: ['Binary trees', 'Binary search trees', 'Tree traversals', 'Balanced trees'],
          duration: '3 weeks'
        }
      ]
    },
    '2': {
      modules: [
        {
          title: 'Module 1: HTML & CSS Fundamentals',
          topics: ['HTML5 structure', 'CSS styling', 'Responsive design', 'Flexbox and Grid'],
          duration: '2 weeks'
        },
        {
          title: 'Module 2: JavaScript Basics',
          topics: ['Variables and functions', 'DOM manipulation', 'Events', 'Async programming'],
          duration: '3 weeks'
        },
        {
          title: 'Module 3: React Framework',
          topics: ['Components', 'Props and State', 'Hooks', 'Context API'],
          duration: '4 weeks'
        },
        {
          title: 'Module 4: Backend Development',
          topics: ['Node.js', 'Express.js', 'Database integration', 'API development'],
          duration: '3 weeks'
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Subjects</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Explore your enrolled subjects and access learning materials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Enrolled Subjects</h2>
            <div className="space-y-3">
              {studentSubjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedSubject === subject.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-gray-700'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{subject.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{subject.resources.length} resources</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Details */}
        <div className="lg:col-span-2">
          {selectedSubjectData ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSubjectData.name}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{selectedSubjectData.description}</p>
              </div>

              {/* Tabs */}
              <div className="px-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-8">
                  {[
                    { key: 'syllabus', label: 'Syllabus' },
                    { key: 'resources', label: 'Resources' },
                    { key: 'quizzes', label: 'Quizzes' },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.key
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'syllabus' && (
                  <div className="space-y-6">
                    {syllabusContent[selectedSubject]?.modules.map((module, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                          <span className="text-sm text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                            {module.duration}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-700 dark:text-gray-200">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    {selectedSubjectData.resources.map(resource => (
                      <div key={resource.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            {resource.type === 'pdf' && <FileText className="w-5 h-5 text-red-600 dark:text-red-200" />}
                            {resource.type === 'video' && <Play className="w-5 h-5 text-purple-600 dark:text-purple-200" />}
                            {resource.type === 'document' && <Download className="w-5 h-5 text-blue-600 dark:text-blue-200" />}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Uploaded on {resource.uploadDate} • {resource.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Download className="w-4 h-4" />
                          <span>Access</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'quizzes' && (
                  <div className="space-y-4">
                    {selectedSubjectData.quizzes.map(quizId => {
                      // This would normally fetch quiz data, using mock for now
                      return (
                        <div key={quizId} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-green-600 dark:text-green-200" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Quiz {quizId}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">Multiple choice questions</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Take Quiz
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Select a Subject</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose a subject from the left panel to view its content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects;
