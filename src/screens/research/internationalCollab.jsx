import { useTheme } from '../../context/createContext.jsx';
import { Globe, Building2, GraduationCap } from 'lucide-react';
import API from '../../api/api.jsx';

export default function InternationalCollab() {
    const { darkMode } = useTheme();

    const collaborations = [
        {
            id: 1,
            logo: '/microsoft-logo.png', // You'll need to add actual logo images
            name: 'Microsoft Research',
            location: 'Redmond, USA',
            description: 'IIIT Kottayam is one of the few institutes from India which is working along with Microsoft for the benefit of common man in the domains of Agriculture, climate change and to make the world a better place to live in. The Data Science research team have been awarded an AI For Earth grant from Microsoft to help further our efforts in scaling newer heights in Artificial Intelligence and to come up with innovative solutions for common man.',
            color: '#00A4EF'
        },
        {
            id: 2,
            logo: '/tum-logo.png',
            name: 'Technische Universität München, TUM, Germany',
            location: '(44th Rank in Times Higher Education World University Rankings 2018)',
            description: 'The institute has signed an MoU with Technische Universität München Germany. The objective of the MoU is to promote latest information technology knowledge and best practices from both countries. This has channelized faculty visits to and from TUM, Germany which boost the research and development activities at the institute. We have also established a collaboration with TUM-Germany for undertaking collaborative teaching of selected courses to UG students. That is, every year, our faculty is conducting credit courses at TUM Germany and German Professors are engaging credit courses at our institute.',
            color: '#0065BD'
        },
        {
            id: 3,
            logo: '/klagenfurt-logo.png',
            name: 'BMWFW, Austria',
            location: 'Universität Klagenfurt',
            description: 'The collaborative research project with University of Klagenfurt, where we are involved in designing energy aware compilers for Heterogeneous systems which aims identifying the bottlenecks of existing workflow applications with more emphasis on energy reduction approaches.',
            color: '#005AA0'
        },
        {
            id: 4,
            logo: '/volkswagen-logo.png',
            name: 'Volkswagen Foundation, Germany',
            location: 'Deutsches Forschungszentrum für Künstliche Intelligenz GmbH',
            description: 'IIIT Kottayam is the official Indian Technical partner for an European Consortium project funded by Volkswagen Foundation and partnered with German Research Center for Artificial Intelligence. The Full Grant will fund a 1.5 million EURO research program for 4 years. This International interface will help in the research of social assessment technologies in Artificial Intelligence.',
            color: '#001E50'
        }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
                        <Globe className="w-3 h-3" style={{ color: API.color1 }} />
                        Global Partnerships
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        INTERNATIONAL COLLABORATIVE ACTIVITIES
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto">

                    <div className="grid md:grid-cols-2 gap-6">
                        {collaborations.map((collab) => (
                            <div 
                                key={collab.id}
                                className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                                    darkMode 
                                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                                        : 'bg-white border-gray-200 hover:border-gray-300'
                                }`}
                                style={{ transition: 'all 0.3s ease' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = API.color1;
                                    e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Logo and Name Section */}
                                <div className={`p-6 flex flex-col items-center text-center space-y-3 border-b ${
                                    darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                                }`}>
                                    {/* Logo Placeholder */}
                                    <div className={`w-24 h-24 rounded-lg flex items-center justify-center ${
                                        darkMode ? 'bg-gray-800' : 'bg-white'
                                    }`}>
                                        <Building2 className="w-12 h-12" style={{ color: API.color1 }} />
                                    </div>
                                    
                                    <div>
                                        <h2 className={`text-base font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
                                            style={{ color: collab.color }}>
                                            {collab.name}
                                        </h2>
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {collab.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Description Section */}
                                <div className="p-6">
                                    <p className={`text-sm leading-relaxed text-justify ${
                                        darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        {collab.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}