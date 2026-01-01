import { useTheme } from '../../context/createContext.jsx';
import { Briefcase, TrendingUp, Users, Award, Building2 } from 'lucide-react';
import API from '../../api/api.jsx';
import { useState, useEffect } from 'react';

export default function Placement() {
    const { darkMode } = useTheme();
    const [placementData, setPlacementData] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlacements = async () => {
            try {
                const response = await fetch(`${API.baseURL}/api/placements`);
                const data = await response.json();
                
                if (data.success) {
                    const formattedPlacements = data.data
                        .filter(item => item.isPublished)
                        .map(item => ({
                            year: item.academicYear || item.year,
                            date: item.updatedAt ? `(as on ${new Date(item.updatedAt).toLocaleDateString()})` : '',
                            highestCTC: item.highestPackage || 'N/A',
                            avgCTC: item.averagePackage || 'N/A',
                            placements: item.totalPlacements || 0,
                            offers: item.totalOffers || 0
                        }));
                    setPlacementData(formattedPlacements);
                }
                
                // Fetch company logos for sponsors
                const companiesRes = await fetch(`${API.baseURL}/api/company-logos`);
                const companiesData = await companiesRes.json();
                if (companiesData.success) {
                    const recruitmentCompanies = companiesData.data
                        .filter(item => item.isActive && item.category === 'recruitment')
                        .sort((a, b) => a.displayOrder - b.displayOrder);
                    setSponsors(recruitmentCompanies);
                }
            } catch (error) {
                console.error('Error fetching placement data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlacements();
    }, []);

    const api = API;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
                        <Briefcase className="w-3 h-3" style={{ color: api.color1 }} />
                        Career Success
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        IIIT KOTTAYAM PLACEMENTS
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto space-y-8">

                    {/* Placement Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {placementData.map((data, index) => (
                            <div 
                                key={index}
                                className={`rounded-lg border p-4 transition-all duration-300 ${
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
                                <div className="text-center space-y-3">
                                    <h3 className={`text-base font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        IIIT Kottayam Placements {data.year}
                                    </h3>
                                    {data.date && (
                                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {data.date}
                                        </p>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <div className={`py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Highest CTC
                                            </div>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {data.highestCTC}
                                            </div>
                                        </div>
                                        
                                        <div className={`py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Average
                                            </div>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {data.avgCTC}
                                            </div>
                                        </div>
                                        
                                        <div className={`py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Individual Placements
                                            </div>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {data.placements}
                                            </div>
                                        </div>
                                        
                                        <div className="py-2">
                                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                No. of Offers
                                            </div>
                                            <div className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {data.offers}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Internship Sponsors Section */}
                    <div className="mt-12">
                        <div className="text-center mb-6">
                            <h2 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                Our Recruitment Partners
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {sponsors.map((sponsor, index) => (
                                <a 
                                    key={index}
                                    href={sponsor.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`rounded-lg border p-5 transition-all duration-300 flex flex-col items-center gap-3 text-center ${
                                        darkMode 
                                            ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                    }`}
                                    style={{ transition: 'all 0.3s ease' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = api.color1;
                                        e.currentTarget.style.boxShadow = `0 0 15px ${api.color1}25`;
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    }}
                                >
                                    {/* Logo */}
                                    <div className={`w-24 h-24 rounded-lg flex items-center justify-center p-3 ${
                                        darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                    }`} style={{ backgroundColor: `${api.color1}10` }}>
                                        <img 
                                            src={API.getImageUrl(sponsor.logo)} 
                                            alt={sponsor.name}
                                            className="max-h-20 max-w-20 object-contain"
                                        />
                                    </div>
                                    
                                    {/* Company Name */}
                                    <h3 className={`font-semibold text-sm leading-tight line-clamp-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                        {sponsor.name}
                                    </h3>
                                </a>
                            ))}
                        </div>
                    </div>


                </div>
            </section>
        </div>
    );
}