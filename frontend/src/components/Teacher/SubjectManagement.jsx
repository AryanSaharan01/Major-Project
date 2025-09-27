import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Users, FileText } from 'lucide-react';
import { mockSubjects } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const TeacherSubjectManagement = () => {
  const { user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjects, setSubjects] = useState(
    mockSubjects.filter(subject => subject.teacherId === user?.id)
  );

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    syllabus: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSubject) {
      // Update existing subject
      const updatedSubjects = subjects.map(subject =>
        subject.id === editingSubject.id
          ? { ...subject, ...formData }
          : subject
      );
      setSubjects(updatedSubjects);
      setEditingSubject(null);
    } else {
      // Create new subject
      const newSubject = {
        id: Date.now().toString(),
        ...formData,
        teacherId: user?.id || '',
        studentIds: [],
        resources: [],
        quizzes: [],
      };
      setSubjects([...subjects, newSubject]);
      setShowCreateForm(false);
    }

    setFormData({ name: '', description: '', syllabus: '' });
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description,
      syllabus: '',
    });
    setShowCreateForm(true);
  };

  const handleDelete = (subjectId) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== subjectId));
    }
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingSubject(null);
    setFormData({ name: '', description: '', syllabus: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subject Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Manage your teaching subjects and curriculum</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Subject</span>
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingSubject ? 'Edit Subject' : 'Create New Subject'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter subject description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Syllabus Outline
              </label>
              <textarea
                value={formData.syllabus}
                onChange={(e) => setFormData(prev => ({ ...prev, syllabus: e.target.value }))}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter syllabus outline (modules, topics, duration)"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingSubject ? 'Update Subject' : 'Create Subject'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{subject.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(subject)}
                  className="p-2 text-gray-400 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(subject.id)}
                  className="p-2 text-gray-400 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{subject.studentIds.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Students</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{subject.resources.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Resources</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{subject.quizzes.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quizzes</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                <Users className="w-4 h-4" />
                <span>Manage Students</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Resources</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-200 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Quizzes</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {subjects.length === 0 && !showCreateForm && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects yet</h3>
          <p className="text-gray-600 mb-6">Create your first subject to start teaching</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Create Subject</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectManagement;
