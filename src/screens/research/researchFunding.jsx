import { useTheme } from '../../context/createContext';
import { DollarSign, Building2, Briefcase, TrendingUp } from 'lucide-react';
import api from '../../api/api';

export default function ResearchFunding() {
    const { darkMode } = useTheme();

    const fundingProjects = [
        {
            sl: 1,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'Rolta Foundation',
            project: 'HackICAV\'18 - Rolta Collaborative Event Fund',
            funding: 150000
        },
        {
            sl: 2,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'Indo-Austrian project (OeAD-DST)\nDr. Shajulin had visited Austria 3 times and worked at their research laboratory for more than 4 months.',
            project: 'Energy Aware Scientific Workflow Compiler for Future Heterogeneous Systems Rs. 8,82,740',
            funding: 882740
        },
        {
            sl: 3,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'BEL',
            project: 'Exploration of Blockchain Technology and development of Secure Transaction and Smart Contract solutions',
            funding: 416400
        },
        {
            sl: 4,
            faculty: 'Dr. Shajulin Benedict',
            agency: '3DDivella Technologies ltx',
            project: '3D printing based smart manufacturing',
            funding: 250000
        },
        {
            sl: 5,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'Atal Incubation Centre (AIC) by NITI Aayog',
            project: 'IoT Cloud Societal applications - Incubation Centre. In AIC scheme, the upper limit of funding is Rs. 10 Cr. For AIC IIIT-Kottayam, Rs. 34600000 has been sanctioned for 5 years.',
            funding: 34600000
        },
        {
            sl: 6,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'MSME Business Incubation Centre',
            project: 'Approved as MSME Business Incubator. We could get up to Rs. 1 Cr for establishing the infrastructure and Rs. 15 Lakh per innovative idea. Infrastructure money will be funded after the acceptance of 2 approved ideas. Maximum 10 ideas may be approved per year. The project is for 5 years. Thus, the maximum funding for this project is Rs. 8.5 Cr in 5 years.',
            funding: null
        },
        {
            sl: 7,
            faculty: 'Dr. Ebin Deni Raj',
            agency: 'Microsoft- AI for Earth Grant',
            project: 'Artificial Intelligence for Detection and Classification of Diseases in Rice and wheat',
            funding: 1271288
        },
        {
            sl: 8,
            faculty: 'Dr. Ebin Deni Raj',
            agency: 'Microsoft- AI for Earth Grant',
            project: 'Travel Grant for Conference at Microsoft Headquarter at USA',
            funding: 200000
        },
        {
            sl: 9,
            faculty: 'Dr. M.P Rajan, Dr. Ebin Deni Raj, Dr. Shajulin Benedict, Dr. Jayakrushna Sahoo & Dr. B. Victer Paul',
            agency: 'Volkswagen Germany, German Centre for Artificial Intelligence DFKI',
            project: 'Foundation AI FORA, Joint Collaborative Project of 5 nations (Germany, Estonia, USA, China, India) worth 1.5 million EURO',
            funding: 25000000
        },
        {
            sl: 10,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'DSTNIMAT / TEDP',
            project: 'Technology based Entrepreneurship Development Programme Sanctioned till date Rs. 6 Lakhs (Rs. 3 Lakhs per year)',
            funding: 600000
        },
        {
            sl: 11,
            faculty: 'Dr. Ebin Deni Raj',
            agency: 'Project from Germany - Dr. Petra, 50 K Euro',
            project: 'AI and Social Problems',
            funding: 4200000
        },
        {
            sl: 12,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'AICTE',
            project: 'Training proposal',
            funding: 200000
        },
        {
            sl: 13,
            faculty: 'Dr. Bini A. A.',
            agency: 'AICTE',
            project: 'Training proposal',
            funding: 200000
        },
        {
            sl: 14,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'DST NIMAT',
            project: 'Training Program',
            funding: 350000
        },
        {
            sl: 15,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'BEL, India',
            project: 'Industry Project',
            funding: 1000000
        },
        {
            sl: 16,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'MSME Incubation Center',
            project: 'Start-up grant',
            funding: 1500000
        },
        {
            sl: 17,
            faculty: 'Dr. Kala S',
            agency: 'AICTE ATAL Program FDP',
            project: 'IoT enabled Systems for tomorrow\'s Digital World',
            funding: 200000
        },
        {
            sl: 18,
            faculty: 'Dr. Panchami.V',
            agency: 'AICTE ATAL Program FDP',
            project: 'Cyber Security and Digital Forensics',
            funding: 200000
        },
        {
            sl: 19,
            faculty: 'Dr. Kala S',
            agency: 'SERB Accelerate Vigyan',
            project: 'Deep Learning Architectures',
            funding: 150000
        },
        {
            sl: 20,
            faculty: 'Dr. Shajulin Benedict',
            agency: 'SERB Accelerate Vigyan',
            project: 'IoT Cloud Solutions for Productization - A Step to Entrepreneurship',
            funding: 222750
        }
    ];

    const totalFunding = fundingProjects.reduce((sum, project) => sum + (project.funding || 0), 0);
    const pipelineFunding = 46.65;

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
                        <DollarSign className="w-3 h-3" style={{ color: api.color1 }} />
                        Research Funding
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        FUNDING FOR RESEARCH PROJECTS
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto space-y-6">

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-lg border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                             style={{ transition: 'all 0.3s ease' }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.borderColor = api.color1;
                                 e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                 e.currentTarget.style.boxShadow = 'none';
                             }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                                     style={{ backgroundColor: `${api.color1}20` }}>
                                    <Briefcase className="w-6 h-6" style={{ color: api.color1 }} />
                                </div>
                                <div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Total Projects
                                    </div>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {fundingProjects.length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                             style={{ transition: 'all 0.3s ease' }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.borderColor = api.color1;
                                 e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                 e.currentTarget.style.boxShadow = 'none';
                             }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                                     style={{ backgroundColor: `${api.color1}20` }}>
                                    <DollarSign className="w-6 h-6" style={{ color: api.color1 }} />
                                </div>
                                <div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Total Funding
                                    </div>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ₹{(totalFunding / 10000000).toFixed(2)} Cr
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`p-4 rounded-lg border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                             style={{ transition: 'all 0.3s ease' }}
                             onMouseEnter={(e) => {
                                 e.currentTarget.style.borderColor = api.color1;
                                 e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                             }}
                             onMouseLeave={(e) => {
                                 e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                 e.currentTarget.style.boxShadow = 'none';
                             }}>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                                     style={{ backgroundColor: `${api.color1}20` }}>
                                    <TrendingUp className="w-6 h-6" style={{ color: api.color1 }} />
                                </div>
                                <div>
                                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        In Pipeline
                                    </div>
                                    <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                        ₹{pipelineFunding} Cr
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Funding Table */}
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
                                            style={{ width: '250px' }}>
                                            Name of the Funding Agency
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Project
                                        </th>
                                        <th className={`px-3 py-3 text-right text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '130px' }}>
                                            Funding Rs.
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fundingProjects.map((project) => (
                                        <tr 
                                            key={project.sl}
                                            className={`border-t transition-all duration-300 ${
                                                darkMode 
                                                    ? 'border-gray-700 hover:bg-gray-750' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                            style={{ transition: 'all 0.3s ease' }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = api.color1;
                                                e.currentTarget.style.boxShadow = `0 0 15px ${api.color1}20`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <td className={`px-3 py-3 text-sm font-medium text-center ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                                {project.sl}
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {project.faculty}
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="whitespace-pre-line">{project.agency}</div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {project.project}
                                            </td>
                                            <td className={`px-3 py-3 text-sm font-semibold text-right ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                                {project.funding ? project.funding.toLocaleString('en-IN') : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pipeline Note */}
                    <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5" style={{ color: api.color1 }} />
                            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                +25 more research projects (Rs. {pipelineFunding} Crores) are in pipeline.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}