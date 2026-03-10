import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/api.jsx';
import { useTheme } from '../../context/createContext.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';
import {
  Sparkles,
  GraduationCap,
  ArrowRight,
  Edit2,
} from 'lucide-react';

export default function WhyIIIT() {
  
  const { darkMode } = useTheme();
  
  // Fetch dynamic content from database
  const { content: pageContent, blocks: contentBlocks, loading: contentLoading, refetch } = usePageContent('why-iiitk');

  const color1 = API.color1; // #239244 (Dark Green)
  const color2 = API.color2; // #e8f5f0 (Light Mint)
  const color3 = API.color3; // #F1F3F3 (Light Gray)

  // Check if admin is logged in
  const isAdmin = localStorage.getItem('token');

  // Check if we have dynamic content
  const hasDynamicContent = contentBlocks && contentBlocks.length > 0;
  const visibleBlocks = hasDynamicContent ? getVisibleBlocks(contentBlocks) : [];
  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Main Content */}
        <main className="mx-auto py-8 max-w-full" style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
          {/* Always show dynamic content from database */}
          {contentLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300" style={{ borderTopColor: color1 }}></div>
            </div>
          ) : visibleBlocks.length > 0 ? (
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
                No content available. Please add content blocks from the admin panel.
              </p>
              {isAdmin && (
                <a 
                  href="/admin/content-blocks?page=why-iiitk" 
                  className="inline-block mt-4 px-6 py-3 rounded-lg text-white font-semibold"
                  style={{ backgroundColor: color1 }}
                >
                  Add Content Blocks
                </a>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
