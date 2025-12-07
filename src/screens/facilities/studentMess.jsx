import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Utensils, Users, Star, Clock, Phone, Mail, Camera, ChefHat, Shield, Award } from 'lucide-react';

// Mess Feature Card Component
const MessFeatureCard = ({ feature, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <div className="text-center">
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <feature.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {feature.title}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {feature.description}
        </p>
      </div>
    </div>
  );
};

// Faculty Card Component
const FacultyCard = ({ faculty, color1, darkMode }) => {
  return (
    <div className={`p-6 rounded-lg border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {faculty.name}
      </h3>
      <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {faculty.position}
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" style={{ color: color1 }} />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {faculty.email}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" style={{ color: color1 }} />
          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {faculty.phone}
          </span>
        </div>
      </div>
    </div>
  );
};

// Office Bearer Card Component
const OfficeBearerCard = ({ bearer, color1, darkMode }) => {
  return (
    <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
      <h4 className={`text-md font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {bearer.name}
      </h4>
      <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {bearer.position}
      </p>
      {bearer.email && (
        <div className="flex items-center gap-2">
          <Mail className="w-3 h-3" style={{ color: color1 }} />
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {bearer.email}
          </span>
        </div>
      )}
      {bearer.phone && (
        <div className="flex items-center gap-2 mt-1">
          <Phone className="w-3 h-3" style={{ color: color1 }} />
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {bearer.phone}
          </span>
        </div>
      )}
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ color1, darkMode }) => {
  const imageSlots = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {imageSlots.map((slot) => (
        <div
          key={slot}
          className={`aspect-video rounded-xl border-2 border-dashed flex items-center justify-center transition-all duration-300 hover:shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
          style={{
            borderColor: `${color1}40`
          }}
        >
          <div className="text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" style={{ color: color1 }} />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Mess Facility {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function StudentMess() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;

  // Mess features
  const messFeatures = [
    {
      icon: Utensils,
      title: 'Affordable Dining',
      description: 'High-quality meals at affordable prices for all students'
    },
    {
      icon: Users,
      title: 'Student Management',
      description: 'Managed by elected student representatives'
    },
    {
      icon: Star,
      title: 'Nutritious Meals',
      description: 'Balanced vegetarian and non-vegetarian options'
    },
    {
      icon: Shield,
      title: 'Hygiene Standards',
      description: 'Strict quality checks and safety guidelines'
    }
  ];

  // Faculty in charge
  const facultyInCharge = [
    {
      name: 'Dr. John Paul Martin',
      position: 'Faculty In Charge (FIC) Mess Committee',
      email: 'fic_messcommittee@iitkottayam.ac.in',
      phone: '+91 482-2202202'
    },
    {
      name: 'Dr. Chakradhar Padamuthum',
      position: 'Associate FIC',
      email: 'chakradhar@iitkottayam.ac.in',
      phone: '+91 482-2202263'
    },
    {
      name: 'Dr. Emy Mariam George',
      position: 'Associate FIC',
      email: 'emy@iitkottayam.ac.in',
      phone: '+91 482-2202270'
    }
  ];

  // Mess supervisors
  const messSupervisors = [
    {
      name: 'Mr. Raja Mohanan',
      email: 'me1@iitkottayam.ac.in'
    },
    {
      name: 'Mr. Raju G',
      email: 'me2@iitkottayam.ac.in'
    }
  ];

  // Office bearers
  const officeBearers = {
    secretaries: [
      {
        name: 'Basant Santhan Reddy',
        email: 'santhan27dec20@iitkottayam.ac.in',
        phone: '+91 93472 90560'
      },
      {
        name: 'Akash Nair',
        email: 'akash21rec04@iitkottayam.ac.in',
        phone: '+91 95001 46264'
      }
    ],
    jointSecretaries: [
      {
        name: 'Srinatha K'
      },
      {
        name: 'Ayush Saipal'
      }
    ],
    financeHeads: [
      {
        name: 'MD Sameer Pasha'
      }
    ],
    qualityHeads: [
      {
        name: 'Raghavan Dev'
      },
      {
        name: 'Keshavadh Gayathri'
      }
    ]
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <ChefHat className="w-4 h-4" style={{ color: color1 }} />
            Dining & Nutrition
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Student Co-operative Mess
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Student-run initiative providing nutritious, hygienic, and affordable meals to the campus community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Student Mess */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Student Co-operative Mess
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The Student Co-operative Mess is a student-run initiative committed to providing nutritious, hygienic, and affordable meals to the campus community. It operates on a non-profit basis, aiming to create a welcoming dining environment where students can enjoy a variety of cuisines catering to different tastes and dietary needs.
          </p>

          {/* Contact Information */}
          <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5" style={{ color: color1 }} />
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Email ID: 
              </span>
              <a href="mailto:studentmess@iitkottayam.ac.in" className="text-blue-600 hover:underline">
                studentmess@iitkottayam.ac.in
              </a>
            </div>
          </div>

          {/* Mess Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {messFeatures.map((feature, index) => (
              <MessFeatureCard key={index} feature={feature} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Faculty In Charge */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Faculty In Charge
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyInCharge.map((faculty, index) => (
              <FacultyCard key={index} faculty={faculty} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Mess Supervisors */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            Mess Supervisors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {messSupervisors.map((supervisor, index) => (
              <div key={index} className={`p-6 rounded-lg border ${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {supervisor.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: color1 }} />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {supervisor.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Bearers */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Office Bearers
          </h2>
          
          <div className="space-y-8">
            {/* Secretaries */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Secretaries
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {officeBearers.secretaries.map((secretary, index) => (
                  <OfficeBearerCard key={index} bearer={{...secretary, position: 'Secretary'}} color1={color1} darkMode={darkMode} />
                ))}
              </div>
            </div>

            {/* Joint Secretaries */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Joint Secretaries
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {officeBearers.jointSecretaries.map((secretary, index) => (
                  <OfficeBearerCard key={index} bearer={{...secretary, position: 'Joint Secretary'}} color1={color1} darkMode={darkMode} />
                ))}
              </div>
            </div>

            {/* Finance and Quality Heads */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Finance Head
                </h3>
                <div className="space-y-4">
                  {officeBearers.financeHeads.map((head, index) => (
                    <OfficeBearerCard key={index} bearer={{...head, position: 'Finance Head'}} color1={color1} darkMode={darkMode} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Quality Assurance Heads
                </h3>
                <div className="space-y-4">
                  {officeBearers.qualityHeads.map((head, index) => (
                    <OfficeBearerCard key={index} bearer={{...head, position: 'Quality Assurance Head'}} color1={color1} darkMode={darkMode} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Involvement */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Users className="w-8 h-8" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: color1 }}>
              Student Involvement
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              The mess emphasizes active student participation, giving students a voice in decisions related to menu changes, service improvements, and operational policies. Regular feedback sessions are held to gather suggestions and address concerns, making the mess a truly cooperative effort.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Mess Facilities Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}