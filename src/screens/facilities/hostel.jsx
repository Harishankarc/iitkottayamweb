import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Home, Mail, Phone, MapPin, Users, Shield, Wifi, Utensils, Bed, FileText } from 'lucide-react';

// Warden Card Component
const WardenCard = ({ warden, color1, darkMode }) => {
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
      <div className="flex items-start gap-4">
        {/* Profile Image */}
        <div 
          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
          style={{
            border: `3px solid ${color1}`
          }}
        >
          <img
            src={warden.image}
            alt={warden.name}
            className="w-full h-full object-cover"
            onError={(e) => e.currentTarget.src = `https://placehold.co/80x80/e8f5f0/239244?text=${warden.name.charAt(0)}`}
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {warden.name}
          </h3>
          <p 
            className="text-sm font-semibold mb-2"
            style={{ color: color1 }}
          >
            {warden.role}
          </p>
          
          {warden.designation && (
            <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {warden.designation}
            </p>
          )}

          <div className="space-y-1">
            {warden.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
                <a 
                  href={`tel:${warden.phone}`}
                  className={`text-xs hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {warden.phone}
                </a>
              </div>
            )}
            
            {warden.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
                <a 
                  href={`mailto:${warden.email}`}
                  className={`text-xs hover:underline truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {warden.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hostel Hall Card Component
const HallCard = ({ hall, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      {/* Hall Name Header */}
      <div 
        className="p-4 text-center"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
        }}
      >
        <h3 className="text-lg font-bold text-white">{hall.name}</h3>
      </div>

      {/* Hall Details */}
      <div className="p-6">
        <div className="grid grid-cols-2  gap-4 mb-4">
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Users className="w-6 h-6" style={{ color: color1 }} />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Type</p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {hall.gender}
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Bed className="w-6 h-6" style={{ color: color1 }} />
            </div>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Warden</p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {hall.wardenType}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {hall.contact}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {hall.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hostel() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;

  // Hostel Information
  const hostelInfo = {
    description: "Separate hostel accommodation is provided for boys and girls. There are six-year hostel for boys and three hostel for girls. All the hostels have common rooms. 24 hour WiFi connectivity and recreational games, where newspapers, magazines and TVs are available. Round the clock water and electricity is provided. Laundry equipments are also available in the hostels."
  };

  // Wardens Data
  const wardensData = [
    {
      id: 1,
      name: 'Dr Rajkumar P',
      role: 'Associate Dean (Hostel Affairs & Student Events)',
      designation: 'Contact Number: +91 482 2202104 | Contact Email: dean.hostel@iiitkottayam.ac.in',
      image: 'https://placehold.co/80x80/e8f5f0/239244?text=RP',
      phone: '+91 482 2202104',
      email: 'dean.hostel@iiitkottayam.ac.in'
    },
    {
      id: 2,
      name: 'Capt. Bijumon P Nair',
      role: 'Security Officer',
      designation: 'Contact Number: +91 9446256196, 04822447273',
      image: 'https://placehold.co/80x80/e8f5f0/239244?text=BN',
      phone: '+91 9446256196',
      email: 'securityofficer@iiitkottayam.ac.in'
    },
    {
      id: 3,
      name: 'Anoop Kumar T V',
      role: 'Asst.Registrar | Hostel Manager',
      designation: 'Mobile: 9447042676 | hostel.in@iiitkottayam.ac.in | Email: aroffice@iiitkottayam.ac.in to the Hostel/campus',
      image: 'https://placehold.co/80x80/e8f5f0/239244?text=AK',
      phone: '9447042676',
      email: 'hostel.in@iiitkottayam.ac.in'
    },
    {
      id: 4,
      name: 'Dr John Paul Martin',
      role: 'Faculty in Charge(GIIT) Hostel Coordinator',
      designation: 'Email: johnpm at iiitkottayam dot ac.in | Mr call on contact number (+ 91 9946332068)at',
      image: 'https://placehold.co/80x80/e8f5f0/239244?text=JP',
      phone: '+91 9946332068',
      email: 'johnpm at iiitkottayam dot ac.in'
    },
    {
      id: 5,
      name: 'Dr Chullikkattil Padinjarekkutti',
      role: 'Associate FC',
      designation: 'Email: chullikkattu at iiitkottayam dot ac.in | Phone: +91 482 2202255',
      image: 'https://placehold.co/80x80/e8f5f0/239244?text=CP',
      phone: '+91 482 2202255',
      email: 'chullikkattu at iiitkottayam dot ac.in'
    }
  ];

  // Halls of Residence Data
  const hallsData = [
    {
      id: 1,
      name: 'Dr. Rajendra Garge',
      gender: 'Boys',
      wardenType: 'Resident Warden',
      contact: 'No: +91 482-2202218, 9446374928',
      email: 'muralisridhar.m at iiitkottayam dot ac.in'
    },
    {
      id: 2,
      name: 'Dr. Elon Vincent George',
      gender: 'Boys',
      wardenType: 'Resident Warden',
      contact: 'No: +91 482-2202235, 9446374929',
      email: 'elonvincent at iiitkottayam dot ac.in'
    },
    {
      id: 3,
      name: 'Dr. Alvin P Baby',
      gender: 'Boys',
      wardenType: 'Assistant Warden',
      contact: 'No: +91 482-2202218, 9074476604',
      email: 'alvinpb at iiitkottayam dot ac.in'
    },
    {
      id: 4,
      name: 'Dr. Krishnashree P',
      gender: 'Girls',
      wardenType: 'Assistant Warden',
      contact: 'No: +91 482-2202235, 9781823468',
      email: 'krishnashree at iiitkottayam dot ac.in'
    },
    {
      id: 5,
      name: 'Gm. Ankit Varadarajulu',
      gender: 'Boys',
      wardenType: 'Assistant Warden',
      contact: 'No: +91 482-2202218, 9087913625',
      email: 'avaradarajulu at iiitkottayam dot ac.in'
    },
    {
      id: 6,
      name: 'Dr. Saima Thomas',
      gender: 'Girls',
      wardenType: 'Assistant Warden',
      contact: 'No: +91 482-2202218, 9495682244',
      email: 'saimathomas at iiitkottayam dot ac.in'
    }
  ];

  // Facilities List
  const facilities = [
    { icon: Wifi, text: '24-hour WiFi connectivity' },
    { icon: Utensils, text: 'Common dining facilities' },
    { icon: Home, text: 'Recreation rooms with TV' },
    { icon: FileText, text: 'Newspapers and magazines' },
    { icon: Shield, text: '24/7 security' },
    { icon: Bed, text: 'Laundry equipment available' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Home className="w-4 h-4" style={{ color: color1 }} />
            Campus Living
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Hostel
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Comfortable and secure accommodation for all students.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Hostel Description */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl     ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20`, '--hover-border-color': color1 }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Our Hostels
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {hostelInfo.description}
          </p>

          {/* Facilities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color1}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: color1 }} />
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {facility.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wardens Section */}
        <div className="max-w-full mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Hostel Administration
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {wardensData.map((warden) => (
              <WardenCard key={warden.id} warden={warden} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Hostel Rules Link */}
        <div className={`max-w-full mx-auto mb-12 p-8 rounded-2xl text-center transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: color1 }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: color1 }}>
            Hostel Rules & Regulations
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            March 2022
          </p>
          <a 
            href="#" 
            className="inline-block px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
            style={{ backgroundColor: color1 }}
          >
            Download PDF
          </a>
        </div>

        {/* Halls of Residence */}
        <div className="max-w-full mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Halls of Residence (Girls) - Anamudi Hostel, Chaver Hostel, Munimala Hostel Block A
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hallsData.map((hall) => (
              <HallCard key={hall.id} hall={hall} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}