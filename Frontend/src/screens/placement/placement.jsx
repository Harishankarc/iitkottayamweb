import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';
import { useState, useEffect } from 'react';

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
                console.log('Fetching translations for placements page:', language);
                const response = await API.post('/api/translate-bulk', {
                    texts: [
                        'No content available. Please add content blocks from the admin panel.',
                        'Add Content in Admin Panel'
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

export default function Placement() {
    const { darkMode } = useTheme();
    const { t } = useTranslation(); // Translation function
    const { content: pageContent, blocks: contentBlocks, loading: contentLoading } = usePageContent('placements');
    const visibleBlocks = contentBlocks ? getVisibleBlocks(contentBlocks) : [];
    
    const color1 = API.color1;
    const color2 = API.color2;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
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
                        {localStorage.getItem('token') && (
                            <a
                                href="/admin/content"
                                className="inline-block mt-4 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                                style={{ backgroundColor: color1 }}
                            >
                                {t('Add Content in Admin Panel')}
                            </a>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}