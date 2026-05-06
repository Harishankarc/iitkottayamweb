import React, { useEffect, useState } from 'react';
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
  const [localPreview, setLocalPreview] = useState('');
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith('blob:')) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  useEffect(() => {
    setPreviewError(false);
  }, [value, localPreview]);

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

    const reader = new FileReader();
    reader.onload = () => {
      setLocalPreview(typeof reader.result === 'string' ? reader.result : '');
      setPreviewError(false);
      setShowUrlMode(false);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      console.log('Uploading to:', `${API.baseURL}/api/upload`);
      console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
      
      const response = await fetch(`${API.baseURL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Upload Response:', data);
      
      if (response.ok && data.success) {
        onChange(data.data.url);
        alert('Image uploaded successfully!');
      } else {
        const errorMsg = data.message || data.error || 'Failed to upload image';
        console.error('Upload failed:', errorMsg);
        alert(`Upload failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error uploading image: ${error.message}`);
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
      setLocalPreview('');
      setPreviewError(false);
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {(value || localPreview) && !showUrlMode ? (
        // Image Preview with Actions
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-5 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
            <div className="relative mx-auto lg:mx-0 flex h-44 w-44 items-center justify-center rounded-full border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-3 shadow-inner">
              <div className="absolute inset-3 rounded-full bg-slate-100" />
              <img 
                src={localPreview || API.getImageUrl(value) || value} 
                alt={label}
                className="relative z-10 h-full w-full rounded-full border-4 border-white object-cover shadow-lg"
                style={aspectRatio ? { aspectRatio } : {}}
                onError={(e) => {
                  if (!previewError) {
                    setPreviewError(true);
                  }
                }}
              />
              {previewError && (
                <div className="absolute inset-3 z-20 flex items-center justify-center rounded-full bg-slate-50 text-xs text-slate-500 px-4 text-center">
                  Preview unavailable
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Current photo</p>
                <p className="text-xs text-slate-500 break-all font-mono mt-1 bg-white/90 px-3 py-2 rounded-lg border border-gray-200">
                  {value}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800" title="Replace">
                  <Upload className="w-4 h-4" />
                  Replace Photo
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
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-slate-700 hover:to-slate-800"
                    title="Enter URL"
                  >
                    <LinkIcon className="w-4 h-4" />
                    Use URL
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-red-700 hover:to-red-800"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                  Remove
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
            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-green-500 transition-colors bg-slate-50 hover:bg-green-50"
          >
            {uploading ? (
              <div className="space-y-3">
                <Loader className="w-12 h-12 text-green-600 mx-auto animate-spin" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
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
