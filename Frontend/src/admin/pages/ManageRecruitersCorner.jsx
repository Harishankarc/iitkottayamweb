import React, { useState, useEffect } from 'react';
import { Upload, FileText, ExternalLink, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api';

export default function ManageRecruitersCorner() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const color1 = API.color1 || '#239244';

  useEffect(() => {
    fetchCurrentSetting();
  }, []);

  const fetchCurrentSetting = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/site-settings/recruiters_corner_pdf');
      if (response.success && response.data?.settingValue) {
        setPdfUrl(response.data.settingValue);
      }
    } catch (err) {
      console.warn('Recruiters Corner PDF setting not found or error loading:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be less than 25MB.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('image', file); // API expects field name 'image'
    formData.append('folder', 'documents');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok && data.success) {
        const uploadedUrl = data.data.url;
        setPdfUrl(uploadedUrl);
        setSuccess('PDF uploaded successfully! Click "Save Configuration" below to apply it.');
      } else {
        setError(data.message || 'Failed to upload PDF.');
      }
    } catch (err) {
      console.error('Error uploading:', err);
      setError('An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSetting = async () => {
    if (!pdfUrl) {
      setError('Please upload a PDF or enter a valid URL.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/api/site-settings', {
        settingKey: 'recruiters_corner_pdf',
        settingValue: pdfUrl,
        settingType: 'text',
        category: 'general',
        description: 'Recruiters Corner PDF Link'
      });

      if (response.success) {
        setSuccess('Recruiters Corner configuration saved successfully! Users will now see this PDF.');
      } else {
        setError(response.message || 'Failed to save configuration.');
      }
    } catch (err) {
      console.error('Error saving configuration:', err);
      setError('An error occurred while saving configuration.');
    } finally {
      setSaving(false);
    }
  };

  const getFullPdfUrl = () => {
    if (!pdfUrl) return '';
    if (pdfUrl.startsWith('http')) return pdfUrl;
    return `${API.baseURL}${pdfUrl}`;
  };

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: color1 }}>
          Manage Recruiters Corner
        </h1>
        <p className="text-gray-600">
          Upload and configure the PDF brochure or document for Recruiter's Corner. When users click this link in the navigation bar, they will be redirected to view this document.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin" style={{ color: color1 }} />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md border p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 text-sm">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Current File Display */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Current PDF Document</label>
            {pdfUrl ? (
              <div className="flex items-center justify-between p-4 bg-slate-50 border rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {pdfUrl.split('/').pop()}
                    </p>
                    <p className="text-xs text-gray-500 truncate font-mono">
                      {pdfUrl}
                    </p>
                  </div>
                </div>
                <a
                  href={getFullPdfUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Preview
                </a>
              </div>
            ) : (
              <div className="p-4 border border-dashed rounded-lg text-center text-gray-500 text-sm">
                No PDF document uploaded yet.
              </div>
            )}
          </div>

          {/* PDF Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Upload New PDF</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {uploading ? (
                <div className="space-y-3">
                  <Loader className="w-10 h-10 animate-spin mx-auto" style={{ color: color1 }} />
                  <p className="text-sm text-gray-600 font-semibold">Uploading PDF document...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-10 h-10 mx-auto text-gray-400" />
                  <div>
                    <span className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-green-700 transition-colors">
                      Select PDF File
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Max size: 25MB • PDF files only</p>
                </div>
              )}
            </div>
          </div>

          {/* Manual URL Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Or Paste Document URL</label>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg text-sm font-mono"
              placeholder="e.g. /uploads/documents/file.pdf"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={handleSaveSetting}
              disabled={saving || uploading}
              className="px-6 py-2.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all shadow hover:shadow-lg disabled:opacity-50"
              style={{ backgroundColor: color1 }}
            >
              {saving && <Loader className="w-4 h-4 animate-spin" />}
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
