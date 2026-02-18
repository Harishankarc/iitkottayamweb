import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { CreditCard, Clock, Shield, Building2, Banknote, CheckCircle } from 'lucide-react';

// Translation helper - fetches translations from backend
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') {
        setTranslations({});
        return;
      }

      try {
        const response = await API.post('/api/translate-bulk', {
          texts: [
            'Banking Services',
            'Failed to load content',
            'No content available',
            'ATM Facility'
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
        console.error('Translation fetch error:', error);
        setTranslations({});
      }
    };

    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  return { t, language };
};

// Feature Card Component
const FeatureCard = ({ feature, color1, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const icons = {
    'clock': Clock,
    'shield': Shield,
    'building': Building2,
    'banknote': Banknote,
    'check': CheckCircle,
    'card': CreditCard
  };

  // Extract icon type from feature text or use default
  const getIcon = () => {
    if (feature.toLowerCase().includes('24/7') || feature.toLowerCase().includes('round')) return Clock;
    if (feature.toLowerCase().includes('secure') || feature.toLowerCase().includes('safe')) return Shield;
    if (feature.toLowerCase().includes('bank')) return Building2;
    if (feature.toLowerCase().includes('balance') || feature.toLowerCase().includes('inquiry')) return Banknote;
    if (feature.toLowerCase().includes('quick') || feature.toLowerCase().includes('fast')) return CheckCircle;
    return CreditCard;
  };

  const IconComponent = getIcon();

  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl transform -translate-y-1' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <IconComponent className="w-6 h-6" style={{ color: color1 }} />
        </div>
        <div className="flex-1">
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {feature}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function BankATM() {
  const { darkMode } = useTheme();
  const { t, language } = useTranslation();
  const color1 = API.color1;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/content-blocks/page/bank-atm`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const blocks = data.data;
          
          // Parse content blocks
          const heroBlock = blocks.find(b => b.blockType === 'hero');
          const imageBlocks = blocks.filter(b => b.blockType === 'image');
          const paragraphBlock = blocks.find(b => b.blockType === 'paragraph');
          const listBlock = blocks.find(b => b.blockType === 'list');

          const parsedContent = {
            hero: heroBlock ? (typeof heroBlock.content === 'string' ? JSON.parse(heroBlock.content) : heroBlock.content) : null,
            images: imageBlocks.map(block => {
              const imgContent = typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
              return imgContent;
            }),
            paragraph: paragraphBlock ? (typeof paragraphBlock.content === 'string' ? JSON.parse(paragraphBlock.content) : paragraphBlock.content) : null,
            features: listBlock ? (typeof listBlock.content === 'string' ? JSON.parse(listBlock.content) : listBlock.content) : null
          };

          setContent(parsedContent);
        }
      } catch (error) {
        console.error('Error fetching Bank/ATM content:', error);
        setError(t('Failed to load content'));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [language]);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {error || t('No content available')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      {content.hero && (
        <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <CreditCard className="w-4 h-4" style={{ color: color1 }} />
              {content.hero.subtitle || t('Banking Services')}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {content.hero.title}
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {content.hero.description}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Images Section */}
        {content.images && content.images.length > 0 && (
          <div className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            <div className={`grid gap-8 ${content.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
              {content.images.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img 
                    src={API.getImageUrl(image.src || image.url)} 
                    alt={image.alt || `${t('ATM Facility')} ${index + 1}`}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="24"%3EATM Facility Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {image.caption && (
                    <div className="mt-2">
                      <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        {content.paragraph && (
          <div 
            className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {content.paragraph.text}
            </p>
          </div>
        )}

        {/* Features Section */}
        {content.features && content.features.items && content.features.items.length > 0 && (
          <div 
            className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            {content.features.title && (
              <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
                {content.features.title}
              </h2>
            )}
            <div className="space-y-3">
              {content.features.items.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                  style={{ borderLeftColor: `${color1}40` }}
                  onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = color1}
                  onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = `${color1}40`}
                >
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
