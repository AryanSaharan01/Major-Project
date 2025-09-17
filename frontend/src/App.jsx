import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Auth Components
import Login from './components/Auth/Login';

// Landing Page
import LandingPage from './components/LandingPage';

// Layout Components
import DashboardLayout from './components/Layout/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Student Components
import StudentDashboard from './components/Student/Dashboard';
import StudentSubjects from './components/Student/Subjects';
import StudentQuizzes from './components/Student/Quizzes';
import StudentCodingSection from './components/Student/CodingSection';
import StudentAnalytics from './components/Student/Analytics';

// Teacher Components
import TeacherDashboard from './components/Teacher/Dashboard';
import TeacherSubjectManagement from './components/Teacher/SubjectManagement';
import TeacherCreateQuiz from './components/Teacher/CreateQuiz';
import TeacherClassAnalytics from './components/Teacher/ClassAnalytics';

// Shared Components
import Profile from './components/Profile';

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    return user?.role === 'student' ? '/dashboard/student/dashboard' : '/dashboard/teacher/dashboard';
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <LandingPage />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Login />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to={getDefaultRoute()} replace />} />
        
        {/* Student Routes */}
        <Route
          path="student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/subjects"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/quizzes"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentQuizzes />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/coding"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentCodingSection />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/analytics"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="student/profile"
          element={
            <ProtectedRoute requiredRole="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route
          path="teacher/dashboard"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/subjects"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherSubjectManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/upload"
          element={
            <ProtectedRoute requiredRole="teacher">
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upload Resources</h1>
                <p className="text-gray-600 dark:text-gray-300">Resource upload functionality will be implemented here.</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/create-quiz"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherCreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/student-performance"
          element={
            <ProtectedRoute requiredRole="teacher">
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Performance</h1>
                <p className="text-gray-600 dark:text-gray-300">Individual student performance analytics will be implemented here.</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/analytics"
          element={
            <ProtectedRoute requiredRole="teacher">
              <TeacherClassAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="teacher/profile"
          element={
            <ProtectedRoute requiredRole="teacher">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-black">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
