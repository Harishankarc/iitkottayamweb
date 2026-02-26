import { useTheme } from '../../context/createContext.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';
import API from '../../api/api.jsx';

export default function Media() {
    const { darkMode } = useTheme();
    const { blocks: contentBlocks, loading: contentLoading } = usePageContent('media');
    const visibleBlocks = contentBlocks ? getVisibleBlocks(contentBlocks) : [];
    
    const color1 = API.color1;
    const color2 = API.color2;

    // Separate cards from other blocks
    const cardBlocks = visibleBlocks.filter(block => block.blockType === 'card');
    const otherBlocks = visibleBlocks.filter(block => block.blockType !== 'card');

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <main className="mx-auto py-8 max-w-full" style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
                {contentLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300" style={{ borderTopColor: color1 }}></div>
                    </div>
                ) : visibleBlocks.length > 0 ? (
                    <div className="max-w-full mx-auto">
                        {/* Render hero, paragraph, heading blocks normally */}
                        <div className="space-y-6">
                            {otherBlocks.map((block, index) => (
                                <div key={block.blockId || index}>
                                    {renderContentBlock(block, { darkMode, color1, color2 })}
                                </div>
                            ))}
                        </div>

                        {/* Render cards in a grid */}
                        {cardBlocks.length > 0 && (
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {cardBlocks.map((block, index) => (
                                    <div key={block.blockId || index}>
                                        {renderContentBlock(block, { darkMode, color1, color2 })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto text-center py-12">
                        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Content for this page is being updated. Please check back soon for more information.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}