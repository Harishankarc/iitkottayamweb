import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from './components/input_output_utils';
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
import ResearchScholars from './screens/people/researchScholars';
import BTechStudents from './screens/people/btechStudents';
import MTechStudents from './screens/people/mtechStudents';
import GenderIndex from './screens/people/genderIndex';
import Hostel from './screens/facilities/hostel';
import Internet from './screens/facilities/internet';
import InnovationCell from './screens/IIC&Clubs/innovationCell';
import FDPWebinar from './screens/IIC&Clubs/fdpWebinar';
import ResearchGroup from './screens/research/researchGroup';


function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
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
          <Route path="/facilities/campus-network" element={<Internet />} />
          <Route path="/iic-clubs/innovation-cell" element={<InnovationCell />} />
          <Route path="/iic-clubs/fdp-webinars" element={<FDPWebinar />} />
          <Route path="/research/research-groups" element={<ResearchGroup />} />

        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App