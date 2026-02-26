import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';

export default function FacultyResearchPaper() {
  const { darkMode } = useTheme();
  const { blocks: contentBlocks, loading: contentLoading } = usePageContent('faculty-research-papers');
  const visibleBlocks = contentBlocks ? getVisibleBlocks(contentBlocks) : [];
  
  const color1 = API.color1;
  const color2 = API.color2;

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
                  {renderContentBlock(block, { darkMode, color1, color2 })}
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center py-12">
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No content available. Please add content blocks from the admin panel.
              </p>
              {localStorage.getItem('token') && (
                <a
                  href="/admin/content"
                  className="inline-block mt-4 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: color1 }}
                >
                  Add Content in Admin Panel
                </a>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
