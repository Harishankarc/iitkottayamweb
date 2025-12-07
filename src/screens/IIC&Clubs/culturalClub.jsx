import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Palette, Users, Music, Star, Calendar, Award, Mail, Camera, ExternalLink } from 'lucide-react';

// Faculty/Member Card Component
const MemberCard = ({ member, color1, darkMode, type = 'faculty' }) => {
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
          <Users className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {member.name}
        </h3>
        {member.role && (
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {member.role}
          </p>
        )}
        {member.batch && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {member.batch}
          </p>
        )}
      </div>
    </div>
  );
};

// Activity Card Component
const ActivityCard = ({ activity, color1, darkMode }) => {
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
          <activity.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {activity.title}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {activity.description}
        </p>
      </div>
    </div>
  );
};

// Event Showcase Component
const EventShowcase = ({ event, color1, darkMode }) => {
  return (
    <div className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2`}
         style={{ borderColor: `${color1}33` }}>
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {event.name}
      </h3>
      
      {/* Image Placeholder */}
      <div
        className={`aspect-video rounded-lg border-2 border-dashed flex items-center justify-center mb-4 ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
        }`}
        style={{ borderColor: `${color1}40` }}
      >
        <div className="text-center">
          <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" style={{ color: color1 }} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {event.name} Images
          </p>
        </div>
      </div>
      
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {event.description}
      </p>
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
              Cultural Event {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ClubCarnival() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;

  // Cultural club FIC
  const culturalFIC = {
    name: 'Dr. Gayathri G.R.',
    role: 'Cultural Club Faculty In-Charge'
  };

  // Student mentors
  const studentMentors = [
    {
      name: 'Rajshith Dondapati',
      batch: '2021 Batch'
    },
    {
      name: 'Aaditya',
      batch: '2021 Batch'
    }
  ];

  // Club faculty members
  const clubFaculty = [
    { name: 'Dr. Pancham V' },
    { name: 'Dr. Dhanyamol' },
    { name: 'Dr. Manu Madhavan' },
    { name: 'Dr. Nandini Warrier' },
    { name: 'Dr. Rajesh G' }
  ];

  // Cultural activities
  const culturalActivities = [
    {
      title: 'Traditional Arts',
      description: 'Exploring diverse cultural heritage through art forms',
      icon: Palette
    },
    {
      title: 'Musical Events',
      description: 'Showcasing musical talents and performances',
      icon: Music
    },
    {
      title: 'Dance Performances',
      description: 'Cultural dance performances from different regions',
      icon: Star
    },
    {
      title: 'Drama & Theatre',
      description: 'Theatrical performances and dramatic expressions',
      icon: Users
    },
    {
      title: 'Workshops',
      description: 'Learning sessions about global cultures',
      icon: Award
    },
    {
      title: 'Festivals',
      description: 'Cultural festivals and traditional celebrations',
      icon: Calendar
    }
  ];

  // Featured events
  const featuredEvents = [
    {
      name: 'Mime at School',
      description: 'Creative mime performances showcasing artistic expression and storytelling through silent art.'
    },
    {
      name: 'Deep-O-Dashami',
      description: 'Cultural celebration featuring traditional performances, music, and community participation.'
    }
  ];

  // Club features
  const clubFeatures = [
    {
      icon: Palette,
      title: 'Creative Expression',
      description: 'Platform for artistic and cultural expression'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Bringing together students from diverse backgrounds'
    },
    {
      icon: Star,
      title: 'Talent Development',
      description: 'Nurturing and showcasing creative talents'
    },
    {
      icon: Award,
      title: 'Cultural Awareness',
      description: 'Promoting understanding of different cultures'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Palette className="w-4 h-4" style={{ color: color1 }} />
            Arts & Culture
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Cultural Club - Wildbeats
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Expressing creativity through art, music, dance, drama, and cultural celebrations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Wildbeats */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Wildbeats Cultural Club
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Wildbeats, the Cultural Club of IIIT Kottayam serves as a hub where students from different backgrounds come together to express themselves through art, music, dance, drama, and more. The Club organizes various events throughout the academic year designed to promote cultural exchange and understanding.
          </p>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            From traditional festivals and performances showcasing different regions' cultural heritage to workshops that teach students about global cuisines and dance, the club offers a platform for both learning and celebration. Wildbeats nurtures talent and leadership skills among its members, empowering them to organize cultural events and build confidence through public performances.
          </p>

          {/* Club Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clubFeatures.map((feature, index) => {
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

        {/* Faculty In-Charge */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Faculty In-Charge
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <MemberCard member={culturalFIC} color1={color1} darkMode={darkMode} />
            </div>
          </div>
        </div>

        {/* Student Mentors */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Student Mentors
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {studentMentors.map((mentor, index) => (
              <MemberCard key={index} member={mentor} color1={color1} darkMode={darkMode} type="student" />
            ))}
          </div>
        </div>

        {/* Club Faculty Members */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Club Faculty Members
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {clubFaculty.map((faculty, index) => (
              <MemberCard key={index} member={faculty} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Cultural Activities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Cultural Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalActivities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Featured Events
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <EventShowcase key={index} event={event} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <ExternalLink className="w-8 h-8" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: color1 }}>
              Connect with Wildbeats
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Whether you're passionate about performing arts, interested in learning about different cultures, or simply looking to make lifelong friendships, the Cultural Club invites you to join us on a journey of discovery, creativity, and mutual respect.
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore the vibrant activities of our Cultural Club on Instagram: @wildbeats_iiitkottayamNjg5cNvt5OHtheG0y
            </p>
          </div>
        </div>

        {/* Cultural Events Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Cultural Events Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}