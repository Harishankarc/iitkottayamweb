import React, { useState, useRef } from 'react';
import { Upload, X, Plus, GripVertical, Loader } from 'lucide-react';
import API from '../../api/api';

export default function MultiImageUploader({ 
  value = [], 
  onChange, 
  label = "Images",
  folder = "images",
  maxImages = 20,
  maxSize = 5,
  aspectRatio = "16/9",
  required = false
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Ensure value is always an array
  const images = Array.isArray(value) ? value : (value ? [value] : []);

  const handleFileUpload = async (files) => {
    console.log('[MultiImageUploader] handleFileUpload called with files:', files);
    if (!files || files.length === 0) {
      console.log('[MultiImageUploader] No files provided');
      return;
    }
    
    // Check if adding these files would exceed max images
    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed. You can upload ${maxImages - images.length} more.`);
      return;
    }

    console.log('[MultiImageUploader] Starting upload. Current images count:', images.length);
    setUploading(true);
    const token = localStorage.getItem('token');
    const uploadedUrls = [];

    try {
      for (const file of files) {
        console.log('[MultiImageUploader] Processing file:', file.name, 'Type:', file.type, 'Size:', file.size);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          console.warn('[MultiImageUploader] Invalid file type:', file.type);
          alert(`${file.name} is not an image file`);
          continue;
        }

        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          console.warn('[MultiImageUploader] File too large:', file.size);
          alert(`${file.name} is too large. Maximum size is ${maxSize}MB`);
          continue;
        }

        // Upload file
        const formData = new FormData();
        formData.append('image', file);
        formData.append('folder', folder);

        console.log('[MultiImageUploader] Uploading to:', `${API.baseURL}/api/upload`);
        const response = await fetch(`${API.baseURL}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        console.log('[MultiImageUploader] Upload response status:', response.status);
        const data = await response.json();
        console.log('[MultiImageUploader] Upload response data:', data);
        
        // Backend returns { success: true, data: { url: '/uploads/...' } }
        if (data.success && data.data && data.data.url) {
          uploadedUrls.push(data.data.url);
          console.log('[MultiImageUploader] Successfully uploaded:', data.data.url);
        } else if (data.success && data.imageUrl) {
          // Fallback for different backend response format
          uploadedUrls.push(data.imageUrl);
          console.log('[MultiImageUploader] Successfully uploaded:', data.imageUrl);
        } else {
          console.error('[MultiImageUploader] Upload failed for:', file.name, 'Response:', data);
        }
      }

      // Add uploaded images to existing array
      if (uploadedUrls.length > 0) {
        console.log('[MultiImageUploader] Calling onChange with new images:', [...images, ...uploadedUrls]);
        onChange([...images, ...uploadedUrls]);
      } else {
        console.warn('[MultiImageUploader] No images were successfully uploaded');
      }
    } catch (error) {
      console.error('[MultiImageUploader] Upload error:', error);
      alert('Failed to upload images: ' + error.message);
    } finally {
      setUploading(false);
      console.log('[MultiImageUploader] Upload process complete');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDelete = (index) => {
    if (window.confirm('Delete this image?')) {
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverImage = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    
    setDraggedIndex(index);
    onChange(newImages);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
        <span className="text-xs text-gray-500 ml-2">
          ({images.length}/{maxImages})
        </span>
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
          {images.map((imageUrl, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOverImage(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-move ${
                draggedIndex === index 
                  ? 'border-blue-500 opacity-50 scale-95' 
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              style={{ aspectRatio }}
            >
              {/* Drag Handle */}
              <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded p-1 shadow-lg">
                  <GripVertical className="w-4 h-4 text-gray-600" />
                </div>
              </div>

              {/* Image Number Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute bottom-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Delete image"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <img
                src={API.getImageUrl(imageUrl)}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found';
                }}
              />

              {/* Drag Overlay */}
              {draggedIndex === index && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <GripVertical className="w-8 h-8 text-blue-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          } ${uploading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(Array.from(e.target.files || []))}
            className="hidden"
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader className="w-8 h-8 animate-spin" style={{ color: API.color1 }} />
              <p className="text-sm text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {images.length === 0 ? (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    Drop images here or click to upload
                  </p>
                  <p className="text-xs text-gray-500">
                    Maximum {maxImages} images, up to {maxSize}MB each
                  </p>
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    Add more images
                  </p>
                  <p className="text-xs text-gray-500">
                    {maxImages - images.length} remaining
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Helper Text */}
      <div className="flex items-start gap-2 text-xs text-gray-500">
        <div className="flex-shrink-0 mt-0.5">💡</div>
        <div>
          <strong>Tips:</strong> Drag images to reorder • Click X to delete • Upload multiple at once
        </div>
      </div>
    </div>
  );
}
