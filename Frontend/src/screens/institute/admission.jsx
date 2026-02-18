import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpenText, Microscope, DollarSign, ChevronRight, FileText, Info } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';

// Translation helper - fetches translations from backend
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') {
        // No translation needed for English
        setTranslations({});
        return;
      }

      try {
        console.log('Fetching translations for admission page:', language);
        const response = await API.post('/api/translate-bulk', {
          texts: [
            'No content available. Please add content blocks from the admin panel.'
          ],
          targetLang: language
        });

        console.log('Translation API Response:', response);

        if (response.success && response.data?.data?.translations) {
          const translationMap = {};
          response.data.data.translations.forEach((item) => {
            translationMap[item.originalText] = item.translatedText;
          });
          console.log('Translation Map:', translationMap);
          setTranslations(translationMap);
        }
      } catch (error) {
        console.error('Translation fetch error:', error);
        setTranslations({});
      }
    };

    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  
  return { t, language };
};

export default function Admission() {
  const { darkMode } = useTheme();
  const { t } = useTranslation(); // Translation function
  const color1 = API.color1;
  const color2 = API.color2;
  const color3 = API.color3;

  // Fetch dynamic content from database
  const { content: pageContent, blocks: contentBlocks, loading: contentLoading } = usePageContent('admission');
  const visibleBlocks = contentBlocks ? getVisibleBlocks(contentBlocks) : [];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Main Content */}
        <main className="mx-auto py-8 max-w-full" style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
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
                {t('No content available. Please add content blocks from the admin panel.')}
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}