'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Upload from './components/upload';
import Profile from './components/profile';
import ModelInfo from './components/modelInfo';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('home');

  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2025',
  });

  const renderSection = () => {
    switch (activeSection) {
      case 'upload':
        return <Upload />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      case 'modelInfo':
        return <ModelInfo />;
      default:
        return (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to the MCDFN Forecasting Dashboard 👋
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your time-series CSV file, view explainable deep learning forecasts,
              and manage your profile — all in one place.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar user={user} activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Section Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl shadow-md p-8">{renderSection()}</div>
      </main>
    </div>
  );
}
