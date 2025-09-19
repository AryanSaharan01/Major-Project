import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Code, 
  FileQuestion, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Github,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();
  
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Subject Management",
      description: "Organize and track all your academic subjects with detailed progress monitoring."
    },
    {
      icon: <FileQuestion className="w-6 h-6" />,
      title: "Interactive Quizzes",
      description: "Take weekly quizzes and get instant feedback on your performance."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Coding Practice",
      description: "Practice coding with real-world problems and improve your programming skills."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Track your progress with detailed analytics and performance insights."
    }
  ];

  const stats = [
    { number: "2,500+", label: "Students Active" },
    { number: "50+", label: "Universities" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const githubProfiles = [
    {
      name: "Sachidanand Tiwari",
      username: "TiSac24",
      avatar: "https://avatars.githubusercontent.com/u/124254763?s=400&u=c16644a831d5fd7104c10c3ef111e309dea4443f&v=4",
    },
    {
      name: "Aryan Saharan", 
      username: "AryanSaharan01",
      avatar: "https://cdn.projexa.ai/user/profile-pictures/9b4484eea9b144bea528c5d252f9dd07/profile.jpg",
    }
  ];

  const handleGithubClick = (username) => {
    window.open(`https://github.com/${username}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gray-800 dark:text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">EduTrack</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">How It Works</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">About</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <Link 
                to="/login"
                className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">
                <Star className="w-4 h-4 mr-2" />
                Track, Learn, and Excel
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Your Complete{' '}
                <span className="text-gray-600 dark:text-gray-300">Academic Performance Platform</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              EduTrack brings learning and performance together.
Students get subject-wise resources, quizzes, and coding practice,
while teachers track progress with powerful analytics.
One smart platform for growth, clarity, and success.
              </p>
              
              
            </div>

            {/* Right Content - Dashboard Card */}
            <div className="relative">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              
                
                {/* GitHub Profiles */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Meet Our Team</h4>
                  <div className="flex space-x-4">
                    {githubProfiles.map((profile, index) => (
                      <div 
                        key={index}
                        onClick={() => handleGithubClick(profile.username)}
                        className="flex-1 bg-white dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={profile.avatar} 
                              alt={profile.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h5 className="text-gray-900 dark:text-white font-medium">{profile.name}</h5>
                              <Github className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{profile.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose EduTrack?</h2>
            <p className="text-xl text-gray-300">Powerful features designed for modern education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Get started in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Sign In</h3>
              <p className="text-gray-300">Sign in to your account using your email and password</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Explore</h3>
              <p className="text-gray-300">Browse subjects, take quizzes, and track your academic progress</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Excel</h3>
              <p className="text-gray-300">Use analytics and insights to improve your academic performance</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <Link 
            to="/login"
            className="inline-flex items-center bg-gray-700 text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition-colors font-medium text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduTrack</span>
            </div>
            <p className="text-gray-400">© 2025 EduTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
