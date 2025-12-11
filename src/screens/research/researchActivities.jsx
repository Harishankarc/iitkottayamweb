import { useTheme } from '../../context/createContext';
import { Presentation, Calendar, Building2, User } from 'lucide-react';
import api from '../../api/api';

export default function ResearchActivities() {
    const { darkMode } = useTheme();

    const invitedTalks = [
        { sl: 1, faculty: 'Dr. Ebin Deni Raj', topic: 'Social Big Data', institution: 'AICTE Sponsored FDP - Sri Ramakrishna Engineering College, Coimbatore', date: '13.11.2017' },
        { sl: 2, faculty: 'Dr. Bakkyaraj T', topic: 'Applications of Mathematics in Engineering', institution: 'Kongu Engineering College, Erode', date: '26.03.2018' },
        { sl: 3, faculty: 'Dr. Shajulin Benedict', topic: 'Cloud Computing', institution: 'Marian Engineering College, Trivandrum', date: '24.07.2018' },
        { sl: 4, faculty: 'Dr. Shajulin Benedict', topic: 'IoT Cloud solutions', institution: 'BEC-Ghaziabad', date: '10.8.2018' },
        { sl: 5, faculty: 'Dr. Shajulin Benedict', topic: 'Cloud Computing', institution: 'Technical University Munich, Germany', date: '12 to 24 Oct 2018' },
        { sl: 6, faculty: 'Dr. Arun Cyril Jose', topic: 'Computer Forensic Methodologies', institution: 'Mahatma Gandhi University, Kottayam', date: '22.01.2019' },
        { sl: 7, faculty: 'Dr. Shajulin Benedict', topic: 'IoT Cloud Computing', institution: 'University of Klagenfurt, Austria', date: '23.5.2019' },
        { sl: 8, faculty: 'Dr. Panchami V', topic: 'IoT Security', institution: 'Sree Chitra Thirunal College of Engineering, Thiruvananthapuram', date: '23.07.2019' },
        { sl: 9, faculty: 'Dr. Ebin Deni Raj', topic: 'Data Science and PCA', institution: 'AICTE Sponsored FDP - St.Gits College of Engineering Kottayam', date: '16.10.2019' },
        { sl: 10, faculty: 'Dr. Bakkyaraj T', topic: 'Probabilistic PCA', institution: 'AICTE Sponsored FDP - St.Gits College of Engineering Kottayam', date: '16.10.2019' },
        { sl: 11, faculty: 'Dr. Bakkyaraj T', topic: 'Differential Equations and Its Applications', institution: 'Queen Mary\'s College, Chennai', date: '06.9.2019' },
        { sl: 12, faculty: 'Dr. Bakkyaraj T', topic: 'Invariant of Differential Equations under one parameter Lie Transformation Groups', institution: 'National Seminar on Advances in Algebra and Analysis at Queen Mary\'s College, Chennai', date: '30.01.2020' },
        { sl: 13, faculty: 'Dr. Bakkyaraj T', topic: 'On Exact Solutions Of Certain Fractional Partial Differential And Differential- Difference Equations By Using Invariant Subspace Method', institution: 'National conference on Partial Differential Equations and its applications at Periyar University, Salem, Tamil Nadu', date: '05.03.2020' },
        { sl: 14, faculty: 'Dr. P Victor Paul', topic: 'How to become a successful CS graduate', institution: 'Madanapalle Institute of Technology & Science, Madanapalle', date: '16.08.2020' },
        { sl: 15, faculty: 'Dr. P Victor Paul', topic: 'Research Paper Publication Process', institution: 'Mangalam College of Engineering, Kottayam', date: '06.05.2022' },
        { sl: 16, faculty: 'Dr. P Victor Paul', topic: 'Research Publication Types and Literature Survey', institution: 'SERB - Accelerate Vigyan sponsored Workshop at IIIT Kottayam', date: '19.07.2022' },
        { sl: 17, faculty: 'Dr. P Victor Paul', topic: 'Data Analytics and Research Opportunities', institution: 'Pondicherry Central University', date: '20.10.2022' },
        { sl: 18, faculty: 'Dr. P Victor Paul', topic: 'Genetic Algorithm Variants Research Overview', institution: 'IIIT Kottayam', date: '23.05.2023' },
        { sl: 19, faculty: 'Dr. Lidhya LillyThampi', topic: 'Advancements in Image Processing Applications on Medical Imaging and Underwater Imaging', institution: 'ICMS, Muttom', date: '30.08.2022' }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
                        <Presentation className="w-3 h-3" style={{ color: api.color1 }} />
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

                    {/* Invited Talks Table */}
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
                                                e.currentTarget.style.borderBottomColor = api.color1;
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
                                                    <User className="w-4 h-4" style={{ color: api.color1 }} />
                                                    {talk.faculty}
                                                </div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {talk.topic}
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="w-4 h-4 flex-shrink-0" style={{ color: api.color1 }} />
                                                    <span>{talk.institution}</span>
                                                </div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" style={{ color: api.color1 }} />
                                                    {talk.date}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}