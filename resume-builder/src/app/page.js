'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiPlus,
  FiFileText,
  FiDownload,
  FiSun,
  FiMoon,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiAward,
  FiTrash2,
  FiEye,
  FiEdit2,
  FiCheck
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Components
import Button from '@/components/ui/Button';
import ResumePreview from '@/components/resume/ResumePreview';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import CertificationsForm from '@/components/forms/CertificationsForm';

// Utils
// import { templates } from '@/constants/templates';

// Redux actions
import { resetResume, setTemplate } from '@/store/resumeSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('personal');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Get resume data from Redux store
  const resume = useSelector((state) => state.resume);

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the resume data
    console.log('Resume data:', resume);
  };

  // Handle reset form
  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      dispatch(resetResume());
    }
  };

  // Handle download resume
  const handleDownload = () => {
    // This will be implemented later with react-to-print
    console.log('Downloading resume...');
  };

  // Navigation items
  const navItems = [
    { id: 'personal', label: 'Personal Info', icon: <FiUser className="w-5 h-5" /> },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase className="w-5 h-5" /> },
    { id: 'education', label: 'Education', icon: <FiBookOpen className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills', icon: <FiCode className="w-5 h-5" /> },
    { id: 'projects', label: 'Projects', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'certifications', label: 'Certifications', icon: <FiAward className="w-5 h-5" /> },
  ];

  // Render the appropriate form based on active tab
  const renderForm = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  // Only render on client-side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">Resume Builder</h1>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => {
                // Toggle dark mode
                const html = document.documentElement;
                if (html.classList.contains('dark')) {
                  html.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                } else {
                  html.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
            >
              <span className="sr-only">Toggle dark mode</span>
              <FiSun className="w-5 h-5 dark:hidden" />
              <FiMoon className="w-5 h-5 hidden dark:block" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="hidden md:flex items-center gap-2"
            >
              {isPreviewMode ? 'Edit Resume' : 'Preview Resume'}
              {isPreviewMode ? <FiEdit2 className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleDownload}
              className="hidden md:flex items-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isPreviewMode ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <ResumePreview />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <nav className="space-y-1">
                {navItems?.map((item) => (
                  <button
                    key={item?.id}
                    onClick={() => setActiveTab(item?.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === item?.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                  >
                    <span className="mr-3">{item?.icon}</span>
                    {item?.label}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleReset}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <FiTrash2 className="w-5 h-5 mr-3" />
                    Reset All Data
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Form Area */}
            <div className="flex-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {navItems?.find(item => item?.id === activeTab)?.label || 'Resume Builder'}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Fill in your {activeTab === 'personal' ? 'personal' : activeTab} information to build your resume.
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {renderForm()}

                    <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleReset}
                        className="text-sm"
                      >
                        Reset Section
                      </Button>

                      <div className="flex space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsPreviewMode(true)}
                          className="md:hidden"
                        >
                          Preview
                        </Button>

                        <Button
                          type="button"
                          variant="primary"
                          onClick={handleDownload}
                          className="md:hidden"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Preview Button */}
              <div className="mt-6 md:hidden">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsPreviewMode(true)}
                >
                  <FiEye className="w-4 h-4" />
                  Preview Resume
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">

              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}