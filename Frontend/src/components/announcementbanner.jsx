import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/createContext';
import API from '../api/api';

export default function AnnouncementBanner() {
  const { darkMode } = useTheme();
  const [announcements, setAnnouncements] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const batchSize = 3; // Show 3 announcements at a time to fit screen

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await API.get('/api/announcements?limit=10');
        
        if (response.success && response.data?.data?.length > 0) {
          const activeAnnouncements = response.data.data
            .map(item => item.title);
          setAnnouncements(activeAnnouncements);
        } else {
          setError('No announcements available');
          setAnnouncements([]);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setError('Failed to load announcements');
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Announcement cycling with fade effect - cycle through batches
  useEffect(() => {
    if (announcements.length === 0) return;
    const totalBatches = Math.ceil(announcements.length / batchSize);
    
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentBatch((prev) => (prev + 1) % totalBatches);
        setFade(false);
      }, 500); // fade duration
    }, 7000); // 10 seconds
    return () => clearTimeout(timer);
  }, [currentBatch, announcements, batchSize]);

  // Get current batch of announcements
  const getCurrentBatch = () => {
    const startIndex = currentBatch * batchSize;
    const endIndex = startIndex + batchSize;
    return announcements.slice(startIndex, endIndex);
  };

  const currentAnnouncements = getCurrentBatch();

  // Show error state
  if (error) {
    return (
      <div
        className={`relative w-full overflow-hidden border-b-2 h-10 ${darkMode
            ? 'bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-red-500 text-white'
            : 'bg-gradient-to-r from-red-100 via-red-200 to-red-100 border-red-400 text-black'
          }`}
      >
        <div className="flex items-center justify-center h-full px-4">
          <span className="font-medium text-xs sm:text-sm">⚠️ {error}</span>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div
        className={`relative w-full overflow-hidden border-b-2 h-10 ${darkMode
            ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-500 text-white'
            : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border-gray-400 text-black'
          }`}
      >
        <div className="flex items-center justify-center h-full px-4">
          <span className="font-medium text-xs sm:text-sm">Loading announcements...</span>
        </div>
      </div>
    );
  }

  // Hide banner if no announcements
  if (announcements.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full overflow-hidden border-b-2 h-10 ${darkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-yellow-500 text-white'
          : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border-yellow-400 text-black'
        }`}
    >
      <style>{`
        .fade-announcement {
          opacity: 1;
          transition: opacity 0.5s;
        }
        .fade-announcement.fade {
          opacity: 0;
        }
        .announcement-horizontal {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
        .announcement-item {
          white-space: nowrap;
        }
      `}</style>
      <div className="flex items-center h-full">
        {/* ANNOUNCEMENTS Label */}
        <div
          className={`absolute left-0 z-10 px-3 sm:px-4 md:px-6 h-full flex items-center ${darkMode ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
        >
          <span className="font-bold tracking-wider text-xs sm:text-sm">
            <span className="hidden sm:inline">ANNOUNCEMENTS</span>
            <span className="inline sm:hidden">NEWS</span>
          </span>
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 ${darkMode
                ? 'bg-gradient-to-r from-transparent to-gray-900'
                : 'bg-gradient-to-r from-transparent to-gray-200'
              }`}
          ></div>
        </div>
        {/* Horizontal Announcement Container */}
        <div className="ml-20 sm:ml-32 md:ml-40 lg:ml-48 flex-1 overflow-hidden flex items-center px-2">
          <div className={`fade-announcement${fade ? ' fade' : ''} announcement-horizontal w-full`}>
            {currentAnnouncements.slice(0, 3).map((announcement, index) => (
              <span key={index} className="font-medium text-xs sm:text-sm announcement-item">
                • {announcement}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode
            ? 'bg-gradient-to-r from-transparent via-yellow-500 to-transparent'
            : 'bg-gradient-to-r from-transparent via-yellow-400 to-transparent'
          }`}
      ></div>
    </div>
  );
}
