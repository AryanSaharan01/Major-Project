import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91 987654321',
    location: user?.location || 'New Delhi, India',
    joinDate: user?.joinDate || 'September 2025',
  });

  const handleSave = () => {
    // Update the user profile in context and localStorage
    updateUserProfile({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      location: profileData.location,
      joinDate: profileData.joinDate,
    });
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to current user data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '+91 987654321',
      location: user?.location || 'New Delhi, India',
      joinDate: user?.joinDate || 'September 2025',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <p className="mt-2 text-gray-300">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white">{profileData.name}</h2>
              <p className="text-gray-300 capitalize">{user?.role}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{profileData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-700 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{profileData.location}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Account Statistics</h3>
        
        {user?.role === 'student' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">3</div>
              <div className="text-sm text-gray-300">Enrolled Subjects</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-gray-300">Quizzes Completed</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">85%</div>
              <div className="text-sm text-gray-300">Average Score</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">2</div>
              <div className="text-sm text-gray-300">Subjects Teaching</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">45</div>
              <div className="text-sm text-gray-300">Total Students</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">8</div>
              <div className="text-sm text-gray-300">Active Quizzes</div>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">82%</div>
              <div className="text-sm text-gray-300">Class Average</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
