import { useTheme } from '../../context/createContext.jsx';
import { Award, Trophy, Medal } from 'lucide-react';
import API from '../../api/api.jsx';

export default function AwardRecognition() {
    const { darkMode } = useTheme();

    const awards = [
        { sl: 1, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Visitor of Osnagie -Abia INITI Awards -Best Individual Programs -INDIA' },
        { sl: 2, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Young Man Recognition Award' },
        { sl: 3, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Student Driver Ph.D. Thesis Four aspiring Ph.D. thesis' },
        { sl: 4, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Indian Research is Groups, Contributed to Research Projects, Paper, and Flying Robot with IBM Young Minds in AI Program.' },
        { sl: 5, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Best Research Paper Award - BSPCE - 2016, Published by IEEE Digital Library' },
        { sl: 6, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Visiting Activities, TUM, Germany - Sponsored by TUM, Germany - June 2021, March 2015, May 2014' },
        { sl: 7, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Paper Presentation - International Conference HiPC 2016 - Hyderabad Sponsored by CMU and TUM, Germany' },
        { sl: 8, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Ragboth Seminar Participated - San Oct. 2014 - Sponsored by the Ragboth, Germany' },
        { sl: 9, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'International travel support for presenting a paper in ICCBSS - Sponsored by DST India, India' },
        { sl: 10, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'Best Paper Award - INNS-2012 - Published by Springer Verlag' },
        { sl: 11, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'IEEE (FDS) - Tokyo Gems Award-Recipient (Faculty Section) - 2012' },
        { sl: 12, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'FDRS (FDS) - Tokyo Gems Award-Recipient (Faculty Section) - 2013' },
        { sl: 13, faculty: 'Dr. Shajulin Benedict', type: 'Award', details: 'German Academic Exchange Service (DAAD) invited as a Guest Researcher for four-six months' },
        { sl: 14, faculty: 'Dr. Balakumar T', type: 'Award', details: 'Guideship for the period 30.01.2015 to 30.07.2015.' },
        { sl: 15, faculty: 'Dr. Balakumar T', type: 'Award', details: 'Post- Doctoral Fellowship at GCI -University of Stuttgart- Germany 29.08.2012-17.05.2012' },
        { sl: 16, faculty: 'Dr. Balakumar T', type: 'Award', details: 'Received DAAD Fellowship, University of Jena, Germany Sept 2015' },
        { sl: 17, faculty: 'Dr. Balakumar T', type: 'Award', details: 'Heraeus Non-Doctoral Fellowship at GSC, Tecnocer -Chennai -Jan 2015' },
        { sl: 18, faculty: 'Dr. Balakumar T', type: 'Award', details: 'KICS, M. Bench. (Received: Supported-Chennai April 2011-15 December- 2014' },
        { sl: 19, faculty: 'Dr. Balakumar T', type: 'Award', details: 'GITA Sponsorship award for Research Project' },
        { sl: 20, faculty: 'Dr. Balakumar T', type: 'Award', details: 'University Third Rank Holder in M.Sc. - GGU' },
        { sl: 21, faculty: 'Dr. Ebin Deni Raj', type: 'Award', details: 'Selected among top five applicants in IEEE European Region/India chapter (OR)s Organized by IEEE as WI' },
        { sl: 22, faculty: 'Dr. Ebin Deni Raj', type: 'Honour', details: 'Selected by Award Council (Father bot Little, USA) for Project InnoWake' },
        { sl: 23, faculty: 'Dr. Ebin Deni Raj', type: 'Award', details: 'Invitation of Travel Support for attending IEEE AGRO 2020 held at Agro AI University' },
        { sl: 24, faculty: 'Dr. Ebin Deni Raj', type: 'Honour', details: 'Research work featured in more than such as www.sciencedaily.com, www.phys.org, scienceblog.com, SCN, www.news.medical.com' },
        { sl: 25, faculty: 'Dr. P. V. Siva Kumar', type: 'Award', details: 'Best Academic Coordinator Award for 3 years at Ramaiah Institute of Indian Service' },
        { sl: 26, faculty: 'Dr. Panchami V', type: 'Award', details: 'Best Teacher Award for the year (2015- 2016) - CSE, Tnc in Institute of Science and Technology' },
        { sl: 27, faculty: 'Dr. Jaikin John', type: 'Award', details: 'Best Researcher Award - CRI India Fellowship - Life, Todayls Safety After' },
        { sl: 28, faculty: 'Dr. Jaikin John', type: 'Award', details: 'Active participation in International conference and events (Around 8 International Best Paper Awards) held on 2013' },
        { sl: 29, faculty: 'Dr. Jaikin John', type: 'Award', details: 'Born Inspiring Student Award at the St. Joseph\'s College, Shogun, Calicut, Kerala - 2009' },
        { sl: 30, faculty: 'Dr. Anqi Carol Jose', type: 'Honour', details: 'Attended Editor for Journal 40th/International Journal of ECOR,10 Publisher: Chinese-Candleston and International' },
        { sl: 31, faculty: 'Dr. Anqi Carol Jose', type: 'Award', details: 'Award Recipient in Technological University Annual Day Celebration-2012' },
        { sl: 32, faculty: 'Dr. Anqi Carol Jose', type: 'Award', details: 'Awarded University of Redland, Redagalen Deolara School Age Tires 2014 - 2015, North B 70,000/-' },
        { sl: 33, faculty: 'Dr. Anqi Carol Jose', type: 'Award', details: 'Best Paper Award at International Conference on Robustness of Infinity Hotel 2014 - 2015, month B 150,000/-' },
        { sl: 34, faculty: 'Dr. Anqi Carol Jose', type: 'Award', details: 'Got First Prize in Academic Excellent Award as Assistant to the Project Seminar 2013-held on Robustness India' },
        { sl: 35, faculty: 'Dr. Anqi Carol Jose', type: 'Award', details: 'Awarded 2017- University of Redlands, Research Support Society for exceptional Fourth year PhD student worth Rs. 15000/-' },
        { sl: 36, faculty: 'Dr. Anqi Carol Jose', type: 'Honour', details: 'Handled 05 Pus India Research Subject under University of Redlands, Redlands' },
        { sl: 37, faculty: 'Dr. P. Victor Paul', type: 'Award', details: 'Best Young Faculty Award for the year 2020' },
        { sl: 38, faculty: 'Dr. P. Victor Paul', type: 'Award', details: 'Gold Recipient in M.Tech. degree under Pondicherry University in 2011+' },
        { sl: 39, faculty: 'Dr. P. Victor Paul', type: 'Award', details: 'Got, 2nd, 3rd "Best Student Award 2016" from the Department of Computer Science, Pondicherry University' },
        { sl: 40, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'University Rank Holder in B.Sc&c. degree under Pondicherry University in 2007' },
        { sl: 41, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'Invited Speakers for Distributed Systems and Information International Journals and Conferences IEEE, Eleviefle, Springler' },
        { sl: 42, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'Delivered Keynote lecture for RTSPDE Symposium 2016' },
        { sl: 43, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'Deliver the Academic Students with "Most beloved Award" in TCS between 2015.' },
        { sl: 44, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'Deliver my own course "Delivered Computing and its the most needs of HEVTS Global 20 in Macau, China 2015' },
        { sl: 45, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: 'Invited Speaker for IEEE Sensors Computing in St. Joc 2015' },
        { sl: 46, faculty: 'Dr. P. Victor Paul', type: 'Honour', details: '45 students obtained International Certification on "Cloud Infrastructure and Services", EMC Academic Associate' },
        { sl: 47, faculty: 'Dr. Jayakrishna Vikas', type: 'Award', details: 'Best Paper Awards for 2 papers presented in International conferences (India awards) 2017 protected' },
        { sl: 48, faculty: 'Dr. Jayakrishna Vikas', type: 'Honour', details: 'Junior Research Fellowship- Department in MHRD, University fellow December 2010-February 2011+' },
        { sl: 49, faculty: 'Dr. Jayakrishna Vikas', type: 'Award', details: 'India Research Excellent Award for the year 2014, Vedalam Department of Mathematics, Madra Institute of' },
        { sl: 50, faculty: 'Dr. Jayakrishna Vikas', type: 'Award', details: 'Delivered invited talk in St. Peters Engineering College, Avadi, Chennai' },
        { sl: 51, faculty: 'Dr. Jayakrishna Vikas', type: 'Award', details: 'Delivered Seminar Scholarship Students 2012-2014, fill 3 years held 2015.' },
        { sl: 52, faculty: 'Dr. Joseph P A', type: 'Award', details: 'Silver M. Tech in M.Sc. Award+' },
        { sl: 53, faculty: 'Dr. Rajesh G A', type: 'Award', details: 'Dean for PG Program of School of Computing Science, and Engg from April 1st 2023- Oct 30th 2024' },
        { sl: 54, faculty: 'Dr. Rajesh G A', type: 'Award', details: 'MSIE Research Group Global Networking Professional, Educational Oracle Institute' },
        { sl: 55, faculty: 'Dr. Rajesh G A', type: 'Honour', details: 'Invited Speakers at National level seminars Associate Life SCLS IC Lab Support+' },
        { sl: 56, faculty: 'Dr. Rajesh G A', type: 'Honour', details: 'Invited Speakers at State level conferences' },
        { sl: 57, faculty: 'Dr. Rajesh G A', type: 'Award', details: 'Alumni of Student Team -IIT Madraslan-web "Silver Award" NACEST 2012 Adv12 2012' },
        { sl: 58, faculty: 'Dr. Rajesh G A', type: 'Award', details: 'Active participational in National and State events (conferences) -Feb/L.N.- 2015' },
        { sl: 59, faculty: 'Dr. Rajesh G A', type: 'Honour', details: 'Core Member Google -Coronary Group -Kerala Media shiftgetables' },
        { sl: 60, faculty: 'Dr. Rupsini P', type: 'Award', details: 'International Research Award from Department of Science and Technology (DST), International Conference on Computational Intelligence. Kochi 2023' },
        { sl: 61, faculty: 'Dr. Rupsini P', type: 'Award', details: 'Best Research Paper Award from Bharatha Digital for Information Security Conference (DISC), 2019' },
        { sl: 62, faculty: 'Dr. Rupsini P', type: 'Honour', details: 'Executive member of IEEE Kerala Sub-section' },
        { sl: 63, faculty: 'Dr. Rupsini P', type: 'Award', details: 'Alumni travel grant at International Communication System' },
        { sl: 64, faculty: 'Dr. Rupsini P', type: 'Honour', details: 'Received keynote addressing Annual Conference of NCCS Kochi' },
        { sl: 65, faculty: 'Dr. Rupsini P', type: 'Honour', details: 'Review Recognition Award from top of conference November 2017, State lab. of various dans per year+' },
        { sl: 66, faculty: 'Dr. Rupsini P', type: 'Award', details: 'BEST faculty Award from the year 2013- 2014 2016-17 from CSE-Maharashtra Institute of Engineering Kolazhi 2017' },
        { sl: 67, faculty: 'Dr. Rupsini P', type: 'Award', details: 'Best Publication Award from the year of 2015 to 2017 for Proceding 22412' },
        { sl: 68, faculty: 'Dr. Rupsini P', type: 'Honour', details: '30th International Health and One Decimal Recent Student' },
        { sl: 69, faculty: 'Dr. Divya Sindhu Lekha', type: 'Award', details: 'Received FOSTER Award 2019 -ITU -IEEE SEU Goa -of India' },
        { sl: 70, faculty: 'Dr. Divya Sindhu Lekha', type: 'Award', details: 'Travel grant from IEEE Kerala Session Professional Chapter and Embedded Technology' },
        { sl: 71, faculty: 'Dr. Divya Sindhu Lekha', type: 'Honour', details: 'Best of Member 2015' }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
                         style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
                        <Trophy className="w-3 h-3" style={{ color: API.color1 }} />
                        Excellence
                    </div>
                    <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        AWARDS & RECOGNITIONS
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-full mx-auto">

                    {/* Awards Table */}
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
                                            style={{ width: '220px' }}>
                                            Name of Faculty
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                            style={{ width: '120px' }}>
                                            Achievement Type
                                        </th>
                                        <th className={`px-3 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {awards.map((award) => (
                                        <tr 
                                            key={award.sl}
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
                                                {award.sl}
                                            </td>
                                            <td className={`px-3 py-3 text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                                {award.faculty}
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                <div className="flex items-center gap-2">
                                                    {award.type === 'Award' ? (
                                                        <Award className="w-4 h-4" style={{ color: API.color1 }} />
                                                    ) : (
                                                        <Medal className="w-4 h-4" style={{ color: API.color1 }} />
                                                    )}
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                        award.type === 'Award'
                                                            ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                                                            : darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        {award.type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={`px-3 py-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                {award.details}
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