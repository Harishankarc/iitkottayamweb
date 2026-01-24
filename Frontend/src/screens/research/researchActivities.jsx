import { useTheme } from '../../context/createContext.jsx';
import { Presentation, Calendar, Building2, User } from 'lucide-react';
import API from '../../api/api.jsx';
import React, { useState, useEffect } from 'react';

export default function ResearchActivities() {
    const { darkMode } = useTheme();
    const [invitedTalks, setInvitedTalks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch research activities from API
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await API.get('/api/research-activities?type=invited-talk');
                if (response.success && response.data) {
                    // Transform API data to match component structure
                    const transformedData = response.data.map(activity => ({
                        sl: activity.serialNumber || activity.id,
                        faculty: activity.faculty,
                        topic: activity.topic,
                        institution: activity.institution,
                        date: new Date(activity.activityDate).toLocaleDateString('en-GB')
                    }));
                    setInvitedTalks(transformedData);
                }
            } catch (error) {
                console.error('Error fetching research activities:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
                        <Presentation className="w-3 h-3" style={{ color: API.color1 }} />
                        Research Events
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        RESEARCH AND TRAINING EVENTS
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto space-y-6">

                    {/* Section Title */}
                    <div className={`text-center py-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        <h2 className="text-lg font-bold">
                            Invited Talks by faculty of IIIT Kottayam
                        </h2>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }}></div>
                        </div>
                    )}

                    {/* Invited Talks Table */}
                    {!loading && invitedTalks.length > 0 && (
                    <div className={`rounded-lg border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '60px' }}>
                                            SL.No.
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '200px' }}>
                                            Faculty
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '280px' }}>
                                            Topic
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Name of Institution/Organization
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '120px' }}>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invitedTalks.map((talk) => (
                                        <tr 
                                            key={talk.sl}
                                            className={`border-t transition-all duration-300 ${
                                                darkMode 
                                                    ? 'border-gray-700 hover:bg-gray-750' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                            style={{ transition: 'all 0.3s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderBottomColor = API.color1;
                                                e.currentTarget.style.borderBottomWidth = '2px';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderBottomColor = darkMode ? '#374151' : '#e5e7eb';
                                                e.currentTarget.style.borderBottomWidth = '1px';
                                            }}
                                        >
                                            <td className={`px-3 py-3 text-sm font-medium text-center ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                                {talk.sl}
                                            </td>
                                            <td className={`px-3 py-3 text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4" style={{ color: API.color1 }} />
                                                    {talk.faculty}
                                                </div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {talk.topic}
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: API.color1 }} />
                                                    <span>{talk.institution}</span>
                                                </div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" style={{ color: API.color1 }} />
                                                    {talk.date}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {/* No Data State */}
                    {!loading && invitedTalks.length === 0 && (
                        <div className="text-center py-12">
                            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                No research activities found.
                            </p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}