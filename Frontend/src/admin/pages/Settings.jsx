import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Save, Eye, EyeOff, Shield, CheckCircle, XCircle } from 'lucide-react';
import API from '../../api/api';

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  // Email change state
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    password: ''
  });
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState({ type: '', text: '' });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await API.get('/api/auth/me');
      if (response.success) {
        setUser(response.data);
        setEmailForm(prev => ({ ...prev, newEmail: response.data.email }));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/auth/change-email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailForm)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEmailMessage({ type: 'success', text: 'Email changed successfully!' });
        
        // Update user data in localStorage
        const updatedUser = { ...user, email: data.data.email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        // Clear password field
        setEmailForm(prev => ({ ...prev, password: '' }));
      } else {
        setEmailMessage({ type: 'error', text: data.message || 'Failed to change email' });
      }
    } catch (error) {
      console.error('Error changing email:', error);
      setEmailMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      setPasswordLoading(false);
      return;
    }

    // Validate password length
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      setPasswordLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        
        // Clear form
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto mb-4" 
               style={{ borderTopColor: API.color1 }}></div>
          <p className="text-gray-600 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white/20 backdrop-blur rounded-2xl">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
            <p className="text-green-50">Manage your email and password</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Current User Info */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: `${API.color1}20` }}>
              <User className="h-8 w-8" style={{ color: API.color1 }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Change Email Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-green-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${API.color1}20` }}>
                <Mail className="h-5 w-5" style={{ color: API.color1 }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Change Email</h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleEmailChange} className="space-y-4">
              
              {/* Email Message */}
              {emailMessage.text && (
                <div className={`p-4 rounded-lg border flex items-start space-x-3 ${
                  emailMessage.type === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  {emailMessage.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm font-medium ${
                    emailMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {emailMessage.text}
                  </p>
                </div>
              )}

              {/* New Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Email Address
                </label>
                <input
                  type="email"
                  value={emailForm.newEmail}
                  onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Password for Verification */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password (for verification)
                </label>
                <div className="relative">
                  <input
                    type={showEmailPassword ? 'text' : 'password'}
                    value={emailForm.password}
                    onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmailPassword(!showEmailPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showEmailPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={emailLoading}
                className="w-full py-3 px-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{ backgroundColor: API.color1 }}
              >
                {emailLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update Email</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              
              {/* Password Message */}
              {passwordMessage.text && (
                <div className={`p-4 rounded-lg border flex items-start space-x-3 ${
                  passwordMessage.type === 'success' 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  {passwordMessage.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm font-medium ${
                    passwordMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {passwordMessage.text}
                  </p>
                </div>
              )}

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1 font-semibold">Password Requirements:</p>
                <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                  <li>At least 6 characters long</li>
                  <li>Must match confirmation</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {passwordLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
