import React from "react";
import { MyDiv } from "../../components/input_output_utils";
import API from "../../api/api";
import Contentheader from "../../components/contentheader";
import ContentBox from "../../components/contentbox";
import placementdetailimg from '../../assets/images/placementstatisticsiiit.jpeg'
import aiclogo from '../../assets/images/aiclogo.png'
import gyanlogo from '../../assets/images/gyanlogo.png'
import msmelogo from '../../assets/images/msmelogo.jpg'
import cyberlogo from '../../assets/images/cyberlogo.png'
import i2cslogo from '../../assets/images/12cslogo.png'
import dadblogo from '../../assets/images/dadblogo.jpeg'
import factlogo from '../../assets/images/factlogo.jpeg'
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';

import { useTheme } from "../../context/createContext";
import ImageSlider from "../../components/imageslider";
import AnnouncementBanner from "../../components/announcementbanner";

const HomePage = () => {

  const { darkMode } = useTheme()

  const newsList = [
    {
      title: "Admission to Ph.D. Programme - January 2026",
      date: "2025-10-15",
      isNew: true,
      link: "#"
    },
    {
      title: "Recruitment of Contract Faculty - CSE dated 17.10.2025",
      date: "2025-10-17",
      isNew: true,
      link: "#"
    },
    {
      title: "Result of Mess Manager (On Contract) dated 29.09.2025",
      date: "2025-09-29",
      isNew: true,
      link: "#"
    },
    {
      title: "Result of Technician (On Contract) dated 08.09.2025",
      date: "2025-09-08",
      isNew: false,
      link: "#"
    },
    {
      title: "Result of Psychologist (On Contract) dated 08.09.2025",
      date: "2025-09-08",
      isNew: false,
      link: "#"
    }
  ];

  const companyList = [
    {
      logo: aiclogo,
      name: "Incubation Centre (AIC)",
      link: "https://icentre.iiitkottayam.ac.in/"
    },
    {
      logo: gyanlogo,
      name: "Gyaan Lab",
      link: "https://gyaan.iiitkottayam.ac.in/"
    }, {
      logo: i2cslogo,
      name: "I2CS",
      link: "https://i2cs.iiitkottayam.ac.in/"
    }, {
      logo: msmelogo,
      name: "MSME Buisness Incubation Centre",
      link: "https://msme.iiitkottayam.ac.in/"
    }, {
      logo: cyberlogo,
      name: "CyberLabs",
      link: "https://cyberlabs.iiitkottayam.ac.in/"
    },
    {
      logo: dadblogo,
      name: "DADB",
      link: "https://dadb.com/in/?lang=en"
    },
    {
      logo: factlogo,
      name: "FACTS-H Lab",
      link: "https://factsh.iiitkottayam.ac.in/home"
    }

  ]

  return (
    <>
      <AnnouncementBanner />

      <ImageSlider
        images={[img1, img2, img3]}
      />
      <ContentBox color={darkMode ? "#111827" : "#f4f0eb"}>
        <Contentheader title={"About IIIT Kottayam"} />
        <p>The Indian Institute of Information Technology Kottayam (IIIT Kottayam) was established in the year 2015 as one among the IIITs established under the administrative control of the Government of India and later declared as an “Institution of National Importance” by an Act of Parliament enacted in 2017. The initial cost for the infrastructure development was shared in the ratio of 50:35:15 among the Central Government, State Government and the industry partners namely M/s CIAL Cochin, and M/s Rolta Foundation Mumbai. The institute is located on a picturesque lush green 53-acre campus in Pala, Kottayam, Kerala.</p>
        <p>IIIT Kottayam imparts top-notch technological education at the undergraduate, post graduate and doctoral levels and currently occupies the leading position as a highly sought-after destination for students inclined to indulge in the intricacies of Computer Science and allied fields. The Institute is committed to impart premium technical education in the country and the preeminent IIITK faculty are keenly focussed on facilitating the sculpting of bright minds into professionally balanced individuals, capable enough to take up challenges of nature, of the society and of the marketplace. The institute facilitates knowledge transfer while ensuring the adoption of the latest technological developments and pedagogy practices. Students are exposed to the contemporary developments in various disciplines of engineering by means of the meticulously crafted au-courant curriculum.</p>
        <p>By adopting an entrepreneurial approach, utilizing contemporary teaching techniques, bringing major societal issues to the attention of our students, and fostering an environment of active learning, we produce graduates who are not only technically proficient but also socially conscious. Our courses are designed to prepare students to pave their own routes rather than merely following others. Our educational program aids the development of a scientific temperament and focuses on equipping students for a lifetime of learning and knowledge application in practical circumstances.</p>
        <p>As part of providing unrivalled holistic education, the institute provides the student cohort with ample opportunities to pursue societal needs by undertaking critical problems and transforming ideas into actions for the betterment of the society. In a quest to cultivate creative and innovation skills, the institute offers platforms for co-creating technological solutions with premier academic and research institutes both within and outside the country. The institute also encourages active participation in various extracurricular activities providing a forum for students to hone their communication and interpersonal skills. Since necessity is the mother of inventions, our students have participated in every corner of need and took the chaos of early years as an opportunity to grow with self-determination and innovation.</p>
      </ContentBox>
      <ContentBox color={darkMode ? "#111827" : ""}>
        <div className="flex items-start justify-between">
          <Contentheader title={"Latest News"} />
          <p className="hover:underline cursor-pointer hover:opacity-80 !m-0">More</p>
        </div>
        {newsList.map((news, index) => (
          <NewsCard key={index} {...news} />
        ))}
      </ContentBox>

      <div className="flex md:flex-row flex-col">
        <ContentBox color={darkMode ? "#111827" : "#f4f0eb"} className={"md:basis-[40%] w-full"}>
          <Contentheader title={"Vision"} />
          <p>"Generating knowledge for the future" is IIIT Kottayam's motto in the fields of IT and IT-enabled research. In a short period of time, the institute has transformed into a hub for knowledge development, emphasizing ideas that address both local and global concerns. The mission of IIIT Kottayam includes the following essential elements:</p>
          <ul className="list-disc pl-6 mt-3 space-y-3">
            <li>Become a top-tier, research-driven organization in a variety of development and research domains.</li>
            <li>Converting bright young academics and researchers into Technoprenuers.</li>
            <li>Excelling in information technology, conducting cutting-edge research, and providing important resources to the business and societal sectors, all while making major contributions to India and the global community.</li>
          </ul>
          <p>IIIT Kottayam is a notable example of an Indian IIIT that is developing quickly. The institute encourages instructors and students to work with businesses to realize their creative ideas. The students get knowledge of cutting-edge technology, practical coding experience, and exposure to the real world of business from a global standpoint.</p>
        </ContentBox>
        <ContentBox color={darkMode ? "#111827" : "#faf7f2"} className={"md:basis-[60%] w-full"}>
          <Contentheader title={"Mission"} />
          <ul className="list-disc ml-6 mt-3 space-y-3">
            <li>To produce graduates who are competent in their profession, creative in solving real-world problems, and exhibit professional ethics with a caring attitude towards the society.</li>
            <li>To solve local problems using global technologies and solve global problems using local technologies across disciplines.</li>
            <li>To promote the significance of ethics and integrity in technical education further fostering the learning with respect for individual human rights and an unyielding commitment to the principles of equal opportunity, equity, and justice.</li>
            <li>To provide academic excellence in Engineering and Technology by imparting quality as well as value-based education, and foster a collaborative environment open to the free exchange of ideas, where research capabilities could be leveraged to address the challenges of the present scenario.</li>
            <li>To project the nation to the forefront of information technology research and development.</li>
          </ul>
        </ContentBox>

      </div>
      <div className="flex md:flex-row flex-col">
        <ContentBox color={darkMode ? "#111827" : "#faf7f2"}>
          <Contentheader title={"Placement Details"} />
          <img src={placementdetailimg} width={700} />
          <p>* Source of Information:-As informed by IIIT Kottayam students placement committee</p>
        </ContentBox>
        <ContentBox color={darkMode ? "#111827" : "#f4f0eb"} className={'flex flex-col justify-between gap-10 pr-0'}>
          <div>
            <Contentheader title={"Innovative Initiatives of IIITK"} />
            <div className="flex flex-wrap gap-6 justify-center">
              {companyList.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-40">
                  <div className="h-20 w-32 flex items-center justify-center">
                    <img
                      src={item.logo}
                      className="h-full w-full object-contain"
                      alt={item.name}
                    />
                  </div>
                  <p className="text-green-700 cursor-pointer mt-2 text-center">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  </p>
                </div>
              ))}
            </div>

          </div>
          <div>
            <Contentheader title={"MOU"} />
            <p>IIIT Kottayam has signed MOU with various organizations for incubation centers, T&P activities, Coding Clubs and Research Collaborations.<span className="underline cursor-pointer">Know More</span></p>
          </div>

        </ContentBox>
      </div>

    </>
  );
};

export default HomePage;


const NewsCard = ({ title, date, isNew, link }) => {
  const { darkMode } = useTheme()
  return (
    <>
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      <a
        href={link}
        className={`block bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md rounded-lg px-4 py-3 border border-gray-200 mb-2 ${darkMode ? "!bg-[#111827]" : ''}`}
      >
        <div className={`flex justify-between items-center `}>
          <h3 className="text-[15px] md:text-base font-medium text-gray-800">
            {title}
          </h3>

          {isNew && (
            <span
              className="text-[13px] bg-red-500 text-white px-2 py-0.5 rounded-md"
              style={{
                animation: "glowPulse 1.2s ease-in-out infinite"
              }}
            >
              New
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </a>
    </>
  );
};