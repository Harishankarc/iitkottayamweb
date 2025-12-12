 import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Heart, Stethoscope, Clock, Phone, Shield, Users, Camera, Pill, Activity, AlertTriangle } from 'lucide-react';

// Medical Service Card Component
const MedicalServiceCard = ({ service, color1, darkMode }) => {
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
        {/* Service Icon */}
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <service.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>

        {/* Service Details */}
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {service.name}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {service.description}
        </p>
      </div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ color1, darkMode }) => {
  const imageSlots = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              Medical Facility {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function MedicalCentre() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  // Medical services data
  const medicalServices = [
    {
      id: 1,
      name: 'General Consultation',
      description: 'Primary healthcare consultation services',
      icon: Stethoscope
    },
    {
      id: 2,
      name: 'Emergency Care',
      description: '24/7 emergency medical assistance',
      icon: AlertTriangle
    },
    {
      id: 3,
      name: 'Health Checkups',
      description: 'Regular health monitoring and checkups',
      icon: Activity
    },
    {
      id: 4,
      name: 'Medicine Dispensary',
      description: 'Essential medicines and prescriptions',
      icon: Pill
    },
    {
      id: 5,
      name: 'First Aid',
      description: 'Immediate first aid treatment',
      icon: Shield
    },
    {
      id: 6,
      name: 'Ambulance Service',
      description: 'Fully equipped ambulance for emergencies',
      icon: Heart
    }
  ];

  // Medical features
  const medicalFeatures = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round the clock medical facility access'
    },
    {
      icon: Phone,
      title: 'Help Desk',
      description: 'Contact: 0482 2202705 for assistance'
    },
    {
      icon: Shield,
      title: 'Complete Care',
      description: 'Comprehensive medical care for all students'
    },
    {
      icon: Heart,
      title: 'Emergency Ready',
      description: 'Fully equipped for emergency cases'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Heart className="w-4 h-4" style={{ color: color1 }} />
            Health & Wellness
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Medical Centre
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Round-the-clock medical facility providing comprehensive healthcare services for the entire campus community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Medical Centre */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Our Medical Centre
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            IIIT-K students have access to round the clock medical facility. A fully equipped ambulance handles emergency cases. Medical facilities are given vital importance and each student is given complete care. Our medical centre ensures the health and well-being of all campus residents with professional healthcare services.
          </p>

          {/* Medical Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {medicalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color1}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: color1 }} />
                  </div>
                  <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medical Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Available Medical Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalServices.map((service) => (
              <MedicalServiceCard key={service.id} service={service} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Emergency Contact & Help Desk */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Phone className="w-8 h-8" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: color1 }}>
              Emergency Contact & Help Desk
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              For any medical emergency or assistance, contact our help desk immediately. Our medical team is available 24/7 to provide immediate care and support.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Help Desk Contact
                </h3>
                <p className={`text-2xl font-bold mb-2`} style={{ color: color1 }}>
                  0482 2202705
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Available 24/7 for medical assistance
                </p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Emergency Services
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Fully equipped ambulance service available for emergency transportation and critical care
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Medical Centre Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}