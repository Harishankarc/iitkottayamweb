import { useTheme } from '../../context/createContext.jsx';
import { Newspaper, Video, ExternalLink } from 'lucide-react';
import API from '../../api/api.jsx';

export default function Media() {
    const { darkMode } = useTheme();

    const mediaArticles = [
        {
            source: 'Mathrubhumi Daily',
            type: 'news',
            title: 'Read News 7th Convocation',
            image: '/media/mathrubhumi-convocation.jpg',
            link: '#',
            color: '#FF6B35'
        },
        {
            source: 'Manorama Online',
            type: 'news',
            title: 'Read News PIN VIKAS skill development programme launched at IIIT Kotta...',
            image: '/media/manorama-vikas.jpg',
            link: '#',
            color: '#E63946'
        },
        {
            source: 'Youtube',
            type: 'video',
            title: 'View Video',
            image: '/media/youtube-skill-dev.jpg',
            link: '#',
            color: '#FF0000'
        },
        {
            source: 'X.com',
            type: 'video',
            title: 'View Video',
            image: '/media/x-skill-dev.jpg',
            link: '#',
            color: '#000000'
        },
        {
            source: 'The Hindu',
            type: 'news',
            title: 'Read News PIN VIKAS skill development programme launched at IIIT Kotta...',
            image: '/media/hindu-vikas.jpg',
            link: '#',
            color: '#000000'
        },
        {
            source: 'Deepika Daily',
            type: 'news',
            title: 'Read News One Nation One Election',
            image: '/media/deepika-election.jpg',
            link: '#',
            color: '#8B4513'
        },
        {
            source: 'Youtube',
            type: 'video',
            title: 'View Video',
            image: '/media/youtube-cyber.jpg',
            link: '#',
            color: '#FF0000'
        },
        {
            source: 'The New Indian Express',
            type: 'news',
            title: 'Read News 1st batch of cyber commandos completes training at IIIT Kottayam in...',
            image: '/media/indian-express-cyber.jpg',
            link: '#',
            color: '#1E3A8A'
        },
        {
            source: 'Manorama Online',
            type: 'news',
            title: 'Read News 1st batch of cyber commandos completes training, set for deploy...',
            image: '/media/manorama-cyber.jpg',
            link: '#',
            color: '#E63946'
        },
        {
            source: 'Malayala Manorama Daily',
            type: 'news',
            title: 'Read News First batch of cyber commandos completes training at IIIT Kot...',
            image: '/media/manorama-daily-cyber.jpg',
            link: '#',
            color: '#D32F2F'
        },
        {
            source: 'The Hindu',
            type: 'news',
            title: 'Read News First batch of cyber commandos completes training at IIIT Kot...',
            image: '/media/hindu-cyber.jpg',
            link: '#',
            color: '#000000'
        },
        {
            source: 'Deepika Daily',
            type: 'news',
            title: 'Read News First batch of cyber commandos completes training at IIIT Kot...',
            image: '/media/deepika-cyber.jpg',
            link: '#',
            color: '#8B4513'
        }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
                        <Newspaper className="w-3 h-3" style={{ color: api.color1 }} />
                        Media Coverage
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        IIIT KOTTAYAM IN THE MEDIA
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto">

                    {/* Media Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mediaArticles.map((article, index) => (
                            <div 
                                key={index}
                                className={`rounded-lg border overflow-hidden transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}
                                style={{ transition: 'all 0.3s ease' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = api.color1;
                                    e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Source Header */}
                                <div className={`px-4 py-3 border-b ${
                                    darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                        style={{ color: darkMode ? article.color : article.color }}>
                                        {article.source}
                                    </h3>
                                </div>

                                {/* Image Placeholder */}
                                <div className={`relative w-full h-48 ${
                                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                                }`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {article.type === 'video' ? (
                                            <Video className="w-16 h-16" style={{ color: api.color1, opacity: 0.5 }} />
                                        ) : (
                                            <Newspaper className="w-16 h-16" style={{ color: api.color1, opacity: 0.5 }} />
                                        )}
                                    </div>
                                    {/* You can replace this with actual images using <img src={article.image} /> */}
                                </div>

                                {/* Link Section */}
                                <div className="p-4">
                                    <a 
                                        href={article.link}
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                        }`}
                                    >
                                        {article.type === 'video' ? (
                                            <Video className="w-4 h-4" />
                                        ) : (
                                            <Newspaper className="w-4 h-4" />
                                        )}
                                        <span className="truncate">{article.title}</span>
                                        <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}