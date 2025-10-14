'use client';

import { useState } from 'react';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage({ userData }) {
  const [user, setUser] = useState(userData || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2025'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    joinDate: user.joinDate
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
    console.log('Saving profile:', formData);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      joinDate: user.joinDate
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <User className="h-7 w-7 mr-3 text-blue-600" />
            Profile Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-300"
            >
              <Edit2 className="h-4 w-4" />
              <span className="font-medium">Edit Profile</span>
            </button>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 h-8 w-8 bg-green-500 rounded-full border-4 border-white"></div>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
              />
            ) : (
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-gray-800 text-lg">{formData.name}</span>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            ) : (
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-800 text-lg">{formData.email}</span>
              </div>
            )}
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Since
            </label>
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-800 text-lg">{formData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons (Edit Mode) */}
        {isEditing && (
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Save className="h-5 w-5" />
              <span className="font-medium">Save Changes</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              <X className="h-5 w-5" />
              <span className="font-medium">Cancel</span>
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <p className="text-3xl font-bold text-blue-600">12</p>
              <p className="text-sm text-gray-600 mt-1">Forecasts Run</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-sm text-gray-600 mt-1">Datasets Uploaded</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Last Login</span>
              <span className="text-gray-600 font-medium">Today, 10:30 AM</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Last Forecast</span>
              <span className="text-gray-600 font-medium">2 days ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-700">Account Created</span>
              <span className="text-gray-600 font-medium">{formData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
              <span className="text-gray-700 font-medium">Change Password</span>
              <span className="text-blue-600 text-sm">Update</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
              <span className="text-gray-700 font-medium">Email Notifications</span>
              <span className="text-green-600 text-sm">Enabled</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
              <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
              <span className="text-gray-500 text-sm">Disabled</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-6 pt-6 border-t border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-3">
            Danger Zone
          </h3>
          <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 font-medium">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}