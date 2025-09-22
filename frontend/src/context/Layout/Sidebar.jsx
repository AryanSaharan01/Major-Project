import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileQuestion, 
  Code, 
  BarChart3, 
  User, 
  Upload,
  Users,
  PlusCircle,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ role }) => {
  const { logout } = useAuth();

  const studentNavItems = [
    { path: '/dashboard/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/student/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/dashboard/student/quizzes', icon: FileQuestion, label: 'Weekly Quizzes' },
    { path: '/dashboard/student/coding', icon: Code, label: 'Coding Section' },
    { path: '/dashboard/student/analytics', icon: BarChart3, label: 'Performance Analytics' },
    { path: '/dashboard/student/profile', icon: User, label: 'Profile' },
  ];

  const teacherNavItems = [
    { path: '/dashboard/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/teacher/subjects', icon: BookOpen, label: 'Subjects Management' },
    { path: '/dashboard/teacher/upload', icon: Upload, label: 'Upload Resources' },
    { path: '/dashboard/teacher/create-quiz', icon: PlusCircle, label: 'Create Quiz' },
    { path: '/dashboard/teacher/student-performance', icon: Users, label: 'Student Performance' },
    { path: '/dashboard/teacher/analytics', icon: TrendingUp, label: 'Class Analytics' },
    { path: '/dashboard/teacher/profile', icon: User, label: 'Profile' },
  ];

  const navItems = role === 'student' ? studentNavItems : teacherNavItems;

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-800 dark:text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">EduTrack</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-r-2 border-gray-500'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
