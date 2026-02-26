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

// Translation helper
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') return;
      try {
        console.log('Fetching translations for why-iiitk page:', language);
        const response = await API.post('/api/translate-bulk', {
          texts: [
            'Established 2015 • Institution of National Importance',
            'Why',
            'IIIT Kottayam',
            'Pioneering excellence in Information Technology education and research',
            'About Our Institute',
            'Interested in Joining IIIT Kottayam?',
            'Explore our admission process, eligibility criteria, and application deadlines',
            'Learn More',
            'PPP Model',
            '53 Acre Campus',
            'AIC Certified',
            'National Importance'
          ],
          targetLang: language
        });

        if (response.success && response.data?.data?.translations) {
          const translationMap = {};
          response.data.data.translations.forEach((item) => {
            translationMap[item.originalText] = item.translatedText;
          });
          setTranslations(translationMap);
        }
      } catch (error) {
        console.error('Translation error:', error);
        setTranslations({});
      }
    };
    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  return { t };
};

export default function WhyIIIT() {
  const { t } = useTranslation();
  // Fetch dynamic content from database
  const { blocks: contentBlocks, loading: contentLoading } = usePageContent('why-iiitk');

  const { darkMode } = useTheme();

  const color1 = API.color1; // #239244 (Dark Green)
  const color2 = API.color2; // #e8f5f0 (Light Mint)
   // #F1F3F3 (Light Gray)

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
                  {renderContentBlock(block, { darkMode, color1, color2, t })}
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