import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WhyIIIT from './screens/whyiiit/whyIIIT';
import { ThemeProvider } from './context/createContext';
import HomePage from './screens/home/homepage'
import React, { useState, useEffect } from "react";
import Nirf from './screens/nirf/nirf';
import NavBar from './components/navbar';
import AppFooter from './components/footer';
import Admission from './screens/institute/admission';
import Governance from './screens/institute/governance';
import Academics from './screens/institute/academics';
import ScholarshipLoan from './screens/institute/ScholarshipLoans';
import BTechCSE from './screens/course/btechCse';
import BTechECE from './screens/course/btechEce';
import BTechCyberSecurity from './screens/course/btechCyberSecurity';
import BTechCseAI_DS from './screens/course/btechCse(AI&DS)';
import Administration from './screens/people/administration';
import HeadofDepartment from './screens/people/hod';
import Faculty from './screens/people/faculty';
import Technical from './screens/people/technical';
import ProfessionalSupportStaff from './screens/people/ProfessionalSupportStaff';
import BTechStudents from './screens/people/btechStudents';
import MTechStudents from './screens/people/mtechStudents';
import GenderIndex from './screens/people/genderIndex';
import Hostel from './screens/facilities/hostel';
import Internet from './screens/facilities/internet';
import InnovationCell from './screens/IIC&Clubs/innovationCell';
import FDPWebinar from './screens/IIC&Clubs/fdpWebinar';
import Fdp from './screens/IIC&Clubs/fdp';
import ResearchGroup from './screens/research/researchGroup';
import Security from './screens/facilities/security';
import Gym from './screens/facilities/gym';
import Sports from './screens/facilities/sports';
import MedicalCentre from './screens/facilities/medicalCentre';
import StudentMess from './screens/facilities/studentMess';
import BankATM from './screens/facilities/atm';
import Gallery from './screens/IIC&Clubs/gallery';
import ClubCarnival from './screens/IIC&Clubs/culturalClub';
import TechnicalClub from './screens/IIC&Clubs/technicalClub';
import TrendlesClub from './screens/IIC&Clubs/trendlesClub';
import SportsClub from './screens/IIC&Clubs/sportsClub';
import SecurityClub from './screens/IIC&Clubs/securityClub';
import MindQuest from './screens/IIC&Clubs/mindQuest';
import IEEEStudentBranch from './screens/IIC&Clubs/IeeeStudentBranch';
import ACM from './screens/IIC&Clubs/acm';
import FacultyResearchPaper from './screens/research/facultyResearchPaper_dynamic';
import ResearchScholars from './screens/people/researchScholars';
import UgResearchStudents from './screens/research/ugResearchStudents_dynamic';
import ResearchFunding from './screens/research/researchFunding_dynamic';
import AwardRecognition from './screens/research/awardRecognition_dynamic';
import InternationalCollab from './screens/research/internationalCollab';
import ResearchActivities from './screens/research/researchActivities';
import Placement from './screens/placement/placement';
import Media from './screens/media/media';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ManageNews from './admin/pages/ManageNews';
import ManageEvents from './admin/pages/ManageEvents';
import ManageFaculty from './admin/pages/ManageFaculty';
import ManageStudents from './admin/pages/ManageStudents';
import ManagePlacements from './admin/pages/ManagePlacements';
import ManageAnnouncements from './admin/pages/ManageAnnouncements';
import ManageGallery from './admin/pages/ManageGallery';
import ManageMedia from './admin/pages/ManageMedia';
import ManageCourses from './admin/pages/ManageCourses';
import ManageResearchPublications from './admin/pages/ManageResearchPublications';
import ManageHeroSliders from './admin/pages/ManageHeroSliders';
import ManageCompanyLogos from './admin/pages/ManageCompanyLogos';
import ManageNIRF from './admin/pages/ManageNIRF';
import ManageFooter from './admin/pages/ManageFooter';
import ManageNavigation from './admin/pages/ManageNavigation';
import ManageSiteSettings from './admin/pages/ManageSiteSettings';
import Settings from './admin/pages/Settings';
import UnifiedContentManager from './admin/pages/UnifiedContentManager';
import NavbarManager from './admin/pages/NavbarManager';
import FooterLinksManager from './admin/pages/FooterLinksManager';
import HostelManagement from './screens/admin/HostelManagement';
import ManageAdministration from './admin/pages/ManageAdministration';
import ManageHOD from './admin/pages/ManageHOD';
import ManageTechnicalStaff from './admin/pages/ManageTechnicalStaff';
import ManageSupportStaff from './admin/pages/ManageSupportStaff';
import ManageResearchScholars from './admin/pages/ManageResearchScholars';
import ManageBTechStudents from './admin/pages/ManageBTechStudents';
import ManageMTechStudents from './admin/pages/ManageMTechStudents';
import ManageGenderIndex from './admin/pages/ManageGenderIndex';
import ManageFacilities from './admin/pages/ManageFacilities';
import ManageFdpPrograms from './admin/pages/ManageFdpPrograms';
import ManageClubs from './screens/admin/ManageClubs';
import ManageResearchActivities from './screens/admin/ManageResearchActivities';
import LMSLinks from './screens/footer/lmsLinks';
import IDY2022 from './screens/footer/idy-2022';
import SiteMap from './screens/footer/siteMap';
import Events from './screens/footer/events';
import Tenders from './screens/footer/tenders';
import Contact from './screens/footer/contact';
import RTI from './screens/footer/rti';
import ICC from './screens/footer/icc';
import AntiRagging from './screens/footer/antiRagging';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes - No NavBar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="news" element={<ManageNews />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="placements" element={<ManagePlacements />} />
            <Route path="announcements" element={<ManageAnnouncements />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="media" element={<ManageMedia />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="research-publications" element={<ManageResearchPublications />} />
            <Route path="hero-sliders" element={<ManageHeroSliders />} />
            <Route path="company-logos" element={<ManageCompanyLogos />} />
            <Route path="nirf" element={<ManageNIRF />} />
            <Route path="footer" element={<ManageFooter />} />
            <Route path="footer-links" element={<FooterLinksManager />} />
            <Route path="navigation" element={<ManageNavigation />} />
            <Route path="navbar" element={<NavbarManager />} />
            <Route path="content" element={<UnifiedContentManager />} />
            <Route path="hostel" element={<HostelManagement />} />
            <Route path="administration" element={<ManageAdministration />} />
            <Route path="hod" element={<ManageHOD />} />
            <Route path="technical-staff" element={<ManageTechnicalStaff />} />
            <Route path="support-staff" element={<ManageSupportStaff />} />
            <Route path="research-scholars" element={<ManageResearchScholars />} />
            <Route path="btech-students" element={<ManageBTechStudents />} />
            <Route path="mtech-students" element={<ManageMTechStudents />} />
            <Route path="gender-index" element={<ManageGenderIndex />} />
            <Route path="facilities" element={<ManageFacilities />} />
            <Route path="clubs" element={<ManageClubs />} />
            <Route path="fdp-programs" element={<ManageFdpPrograms />} />
            <Route path="research-activities" element={<ManageResearchActivities />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Public Routes - With NavBar/Footer */}
          <Route path="/*" element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lms" element={<LMSLinks />} />
                <Route path="/idy-2022" element={<IDY2022 />} />
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="/events" element={<Events />} />
                <Route path="/tenders" element={<Tenders />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/rti" element={<RTI />} />
                <Route path="/icc" element={<ICC />} />
                <Route path="/anti-ragging" element={<AntiRagging />} />
                <Route path="/why-iiitk" element={<WhyIIIT/>} />
                <Route path="/nirf/2025" element={<Nirf />} />
                <Route path="/institute/governance" element={<Governance />} />
                <Route path="/institute/admission" element={<Admission />} />
                <Route path="/institute/academics" element={<Academics />} />
                <Route path="/institute/scholarship" element={<ScholarshipLoan />} />
                <Route path="/course/btech-cse" element={<BTechCSE />} />
                <Route path="/course/btech-ece" element={<BTechECE />} />
                <Route path="/course/btech-cybersecurity" element={<BTechCyberSecurity />} />
                <Route path="/course/btech-ai-ds" element={<BTechCseAI_DS />} />
                <Route path="/people/administration" element={<Administration />} />
                <Route path="/people/hod" element={<HeadofDepartment />} />
                <Route path="/people/faculty" element={<Faculty />} />
                <Route path="/people/technical" element={<Technical />} />
                <Route path="/people/support-staff" element={<ProfessionalSupportStaff />} />
                <Route path="/people/research-scholars" element={<ResearchScholars />} />
                <Route path="/people/btech-students" element={<BTechStudents />} />
                <Route path="/people/mtech-students" element={<MTechStudents />} />
                <Route path="/people/gender-index" element={<GenderIndex />} />
                <Route path="/facilities/hostel" element={<Hostel />} />
                <Route path="/facilities/security" element={<Security />} />
                <Route path="/facilities/gymnasium" element={<Gym />} />
                <Route path="/facilities/sports" element={<Sports />} />
                <Route path="/facilities/campus-network" element={<Internet />} />
                <Route path="/facilities/medical-centre" element={<MedicalCentre />} />
                <Route path="/facilities/student-mess" element={<StudentMess />} />
                <Route path="/facilities/bank-atm" element={<BankATM />} />
                <Route path="/iic-clubs/innovation-cell" element={<InnovationCell />} />
                <Route path="/iic-clubs/fdp-webinars" element={<FDPWebinar />} />
                <Route path="/fdp" element={<Fdp />} />
                <Route path="/iic-clubs/gallery" element={<Gallery />} />
                <Route path="/iic-clubs/cultural-club" element={<ClubCarnival />} />
                <Route path="/iic-clubs/technical-club" element={<TechnicalClub />} />
                <Route path="/iic-clubs/sports-club" element={<SportsClub />} />
                <Route path="/iic-clubs/trendles-club" element={<TrendlesClub />} />
                <Route path="/iic-clubs/cyber-security-club" element={<SecurityClub />} />
                <Route path="/iic-clubs/mind-quest" element={<MindQuest />} />
                <Route path="/iic-clubs/ieee-student-branch" element={<IEEEStudentBranch />} />
                <Route path="/iic-clubs/acm" element={<ACM />} />
                <Route path="/research/research-groups" element={<ResearchGroup />} />
                <Route path="/research/faculty-research-papers" element={<FacultyResearchPaper />} />
                <Route path="/research/ug-research-students" element={<UgResearchStudents />} />
                <Route path="/research/research-funding" element={<ResearchFunding />} />
                <Route path="/research/awards-recognition" element={<AwardRecognition />} />
                <Route path="/research/international-collab" element={<InternationalCollab />} />
                <Route path="/research/research-activities" element={<ResearchActivities />} />
                <Route path="/placement" element={<Placement />} />
                <Route path="/media" element={<Media />} />
              </Routes>
              <AppFooter />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App