import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, renderContentBlock } from '../../hooks/usePageContent.jsx';

export default function InnovationCell() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  // Fetch dynamic content from database
  const { blocks: contentBlocks, loading: contentLoading } = usePageContent('innovation-cell');

  if (contentLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  const visibleBlocks = contentBlocks ? contentBlocks.filter(block => block.isVisible !== false) : [];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mx-auto py-8 px-6 max-w-full">
        {visibleBlocks.length > 0 ? (
          <div className="space-y-6 max-w-full mx-auto">
            {visibleBlocks.map((block, index) => (
              <div key={block.blockId || index}>
                {renderContentBlock(block, { darkMode, color1, color2 })}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No content available for Institution Innovation Council.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
