import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader } from 'lucide-react';
import API from '../../api/api';

export default function ImageUploader({ 
  value, 
  onChange, 
  label = "Image",
  required = false,
  folder = "images",
  aspectRatio = null,
  maxSize = 5, // MB
  showUrlInput = true
}) {
  const [uploading, setUploading] = useState(false);
  const [showUrlMode, setShowUrlMode] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const response = await fetch(`${API.baseURL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        onChange(data.imageUrl);
      } else {
        alert(data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) handleFileUpload(file);
        break;
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this image?')) {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value && !showUrlMode ? (
        // Image Preview with Actions
        <div className="border-2 border-gray-300 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-start gap-4">
            <div className="relative group">
              <img 
                src={API.getImageUrl(value)} 
                alt={label}
                className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300 shadow-md"
                style={aspectRatio ? { aspectRatio } : {}}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/128?text=Error';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                <label className="opacity-0 group-hover:opacity-100 cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition-all transform hover:scale-105">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 mb-3 break-all font-mono bg-white px-3 py-2 rounded-lg border-2 border-gray-200">
                {value}
              </p>
              <div className="flex flex-wrap gap-2">
                <label className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 cursor-pointer inline-flex items-center shadow-md hover:shadow-lg transition-all transform hover:scale-105" title="Replace">
                  <Upload className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                {showUrlInput && (
                  <button
                    type="button"
                    onClick={() => setShowUrlMode(true)}
                    className="p-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 inline-flex items-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                    title="Enter URL"
                  >
                    <LinkIcon className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDelete}
                  className="p-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 inline-flex items-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  title="Delete"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Upload Zone
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onPaste={handlePaste}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors bg-gray-50 hover:bg-green-50"
          >
            {uploading ? (
              <div className="space-y-3">
                <Loader className="w-12 h-12 text-green-600 mx-auto animate-spin" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <label className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer inline-block">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  or drag & drop, paste from clipboard
                </p>
                <p className="text-xs text-gray-400">
                  Max size: {maxSize}MB • Formats: JPG, PNG, GIF, WebP
                </p>
              </div>
            )}
          </div>

          {showUrlInput && (
            <div className="mt-4">
              <input
                type="url"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                onBlur={() => value && setShowUrlMode(false)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Or paste image URL (https://... or /uploads/...)"
                required={required && !value}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
