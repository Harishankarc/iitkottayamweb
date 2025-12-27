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
import ResearchGroup from './screens/research/researchGroup';
import Security from './screens/facilities/security';
import Gym from './screens/facilities/gym';
import Sports from './screens/facilities/sports';
import MedicalCentre from './screens/facilities/medicalCentre';
import StudentMess from './screens/facilities/studentMess';
import Gallery from './screens/IIC&Clubs/gallery';
import ClubCarnival from './screens/IIC&Clubs/culturalClub';
import TechnicalClub from './screens/IIC&Clubs/technicalClub';
import TrendlesClub from './screens/IIC&Clubs/trendlesClub';
import SportsClub from './screens/IIC&Clubs/sportsClub';
import SecurityClub from './screens/IIC&Clubs/securityClub';
import MindQuest from './screens/IIC&Clubs/mindQuest';
import IEEEStudentBranch from './screens/IIC&Clubs/IeeeStudentBranch';
import ACM from './screens/IIC&Clubs/acm';
import FacultyResearchPaper from './screens/research/facultyResearchPaper';
import ResearchScholars from './screens/people/researchScholars';
import UgResearchStudents from './screens/research/ugResearchStudents';
import ResearchFunding from './screens/research/researchFunding';
import AwardRecognition from './screens/research/awardRecognition';
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
          </Route>

          {/* Public Routes - With NavBar/Footer */}
          <Route path="/*" element={
            <>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
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
                <Route path="/iic-clubs/innovation-cell" element={<InnovationCell />} />
                <Route path="/iic-clubs/fdp-webinars" element={<FDPWebinar />} />
                <Route path="/iic-clubs/gallery" element={<Gallery />} />
                <Route path="/iic-clubs/cultural-club" element={<ClubCarnival />} />
                <Route path="/iic-clubs/technical-club" element={<TechnicalClub />} />
                <Route path="/iic-clubs/sports-club" element={<SportsClub />} />
                <Route path="/iic-clubs/trendles-club" element={<TrendlesClub />} />
                <Route path="/iic-clubs/cyber-security-club" element={<SecurityClub />} />
                <Route path="/iic-clubs/mind-quest" element={<MindQuest />} />
                <Route path="/iic-clubs/ieee-student-branch" element={<IEEEStudentBranch />} />
                <Route path="/iic-clubs/acm" element={<ACM />} />
                <Route path="/research/research-group" element={<ResearchGroup />} />
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