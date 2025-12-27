import { useTheme } from '../../context/createContext.jsx';
import { GraduationCap, FileText, ExternalLink, User } from 'lucide-react';
import API from '../../api/api.jsx';

export default function UgResearchStudents() {
    const { darkMode } = useTheme();

    const researchPapers = [
        {
            id: 1,
            studentName: 'Shubham Kumar',
            batch: '2015-19 Batch',
            year: 'Final Year B.Tech Student',
            authors: 'Shubham Kumar, Shajulin Benedict, Srilakshmi N.',
            title: 'Application of Natural Language Processing and IoTCloud in Smart Homes',
            conference: 'International IEEE conference "ICCT2019"',
            location: 'Jaipur, India',
            link: 'https://ieeexplore.ieee.org/document/8969066/denied='
        },
        {
            id: 2,
            studentName: 'Mannem Srinivas',
            batch: '2016-20 Batch',
            year: 'Final Year B.Tech Student',
            authors: 'Mannem Srinivas, Shajulin Benedict, Basil C. Sunny',
            title: 'IoT Cloud based Smart Bin for Connected Smart Cities - A Product Design Approach',
            conference: 'International IEEE conference "ICCCNT2019"',
            location: 'IIT-Kanpur, DBLP: 10.1109/ICCCNT45670.2019.8944558, India',
            date: 'July 2019',
            link: 'https://ieeexplore.ieee.org/document/8944558?denied='
        },
        {
            id: 3,
            studentName: 'Mannem Srinivas',
            batch: '2016-20 Batch',
            year: 'Final Year B.Tech Student',
            authors: 'Basil C. Sunny, Shajulin Benedict, Rajan M.P., and Mannem Srinivas',
            title: 'Impact of Printing Parameters on Energy Consumption of 3D Printers Using IoT Cloud Architecture',
            conference: 'International IEEE conference "INDICON 2019"',
            location: 'Marwadi University, Rajkot, India',
            link: 'https://www.youtube.com/watch?v=3Z2ZFEMKxl0'
        }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
                        <GraduationCap className="w-3 h-3" style={{ color: API.color1 }} />
                        B.Tech Research
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        B.TECH STUDENT'S RESEARCH CONTRIBUTIONS
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto space-y-6">

                    {/* Introduction */}
                    <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <h2 className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} 
                            style={{ color: '#8B0000' }}>
                            List of Published Research Papers in Prestigious Peer Reviewed International Journals and in International Conferences
                        </h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Normally Faculty Members, PhD and MTech scholars publish the research papers in Journals and International Conferences. It is not expected from Undergraduate (B.Tech) students. We have adopted Project Based Learning approach by introducing research focus in our Curriculum, which has enhanced the real-time problem solving attitude in the students and resulted in spectacular research contributions from Under Graduate students of IIIT - Kottayam Kerala. This activity indicates that our students are not simply learning from text books or reference books but they are involved in increasing length, breadth and depth of computer science. I mean, involved in knowledge creation process, which is remarkable. Credit goes to Faculty Members, who are taking lot of efforts to develop and enhance the research culture of IIIT- Kottayam. We are proud of them.
                        </p>
                    </div>

                    {/* Research Papers Table */}
                    <div className={`rounded-lg border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
                                        <th className={`px-4 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '80px' }}>
                                            SL.No.
                                        </th>
                                        <th className={`px-4 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Research Paper Details
                                        </th>
                                        <th className={`px-4 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '250px' }}>
                                            Photograph of B.Tech Student
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {researchPapers.map((paper) => (
                                        <tr 
                                            key={paper.sl}
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
                                            <td className={`px-4 py-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                                {paper.id}
                                            </td>
                                            <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="space-y-2">
                                                    <p>
                                                        <span className="font-semibold" style={{ color: API.color1 }}>
                                                            {paper.studentName}
                                                        </span>
                                                        , {paper.authors.replace(paper.studentName + ', ', '')}, 
                                                        "<em>{paper.title}</em>", {paper.conference}, {paper.location}
                                                        {paper.date && `, ${paper.date}`}
                                                    </p>
                                                    <a 
                                                        href={paper.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs hover:underline"
                                                        style={{ color: API.color1 }}
                                                    >
                                                        <ExternalLink size={12} />
                                                        {paper.link}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className={`px-4 py-4 text-center`}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div 
                                                        className="w-24 h-24 rounded-full flex items-center justify-center"
                                                        style={{ backgroundColor: `${API.color1}20` }}
                                                    >
                                                        <User size={40} style={{ color: API.color1 }} />
                                                    </div>
                                                    <div className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                        <div className="font-semibold">Mr. {paper.studentName}</div>
                                                        <div>{paper.year}</div>
                                                        <div>{paper.batch}</div>
                                                    </div>
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