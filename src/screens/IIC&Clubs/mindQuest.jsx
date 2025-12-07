 import { useTheme } from '../../context/createContext';
import { Brain, Users, Mail, Target, Heart, Lightbulb, Camera, Shield, MessageCircle } from 'lucide-react';
import api from '../../api/api';

const MemberCard = ({ name, email, role }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        darkMode
          ? `bg-gray-800 border-gray-700 hover:border-${api.color1} hover:shadow-lg`
          : `bg-white border-gray-200 hover:border-${api.color1} hover:shadow-lg`
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = api.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          {role && (
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {role}
            </p>
          )}
          {email && (
            <p className={`text-sm flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail size={16} />
              {email}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const GoalCard = ({ icon: Icon, title, description }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = api.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="p-3 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${api.color1}20` }}
        >
          <Icon size={24} style={{ color: api.color1 }} />
        </div>
        <div>
          <h4 className={`font-semibold text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h4>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ImageGallery = ({ count = 5 }) => {
  const { darkMode } = useTheme();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
          }`}
          style={{
            borderColor: darkMode ? '#374151' : '#d1d5db',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = api.color1;
            e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = darkMode ? '#374151' : '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Camera className={darkMode ? 'text-gray-600' : 'text-gray-400'} size={32} />
        </div>
      ))}
    </div>
  );
};

export default function MindQuest() {
  const { darkMode } = useTheme();

  const goals = [
    {
      icon: Brain,
      title: 'Mental Wellness Focus',
      description: 'Focusing on the mental wellness of students.'
    },
    {
      icon: Shield,
      title: 'Stigma Reduction',
      description: 'Stigma reduction and breaking barriers to promote help-seeking behavior.'
    },
    {
      icon: Users,
      title: 'Peer Support',
      description: 'Establish a peer support network.'
    },
    {
      icon: Heart,
      title: 'Stress & Anxiety Management',
      description: 'Focusing on reducing stress and anxiety issues among students.'
    },
    {
      icon: Lightbulb,
      title: 'Awareness Programs',
      description: 'Addressing any kind of harassment and Violence. Awareness for using drugs and other substances.'
    },
    {
      icon: Target,
      title: 'Decision Making',
      description: 'Exploring and reducing impulsive decision.'
    },
    {
      icon: Brain,
      title: 'Self Efficacy',
      description: 'Create self-efficacy - be informed, educate yourself on mental health issues.'
    },
    {
      icon: MessageCircle,
      title: 'Communication Skills',
      description: 'Be proactive. Implement protective factors such as yoga, deep breathing, regular physical activity, effective communication, volunteering, and socializing with others for positive expression and creative thinking.'
    },
    {
      icon: Users,
      title: 'Fear Management',
      description: 'Overcome your fears - stage fear, public speaking, conversation with a stranger or a person you always dream to talk to.'
    },
    {
      icon: Heart,
      title: 'Mental Health Support',
      description: 'Provide support and mentorship for anyone suffering from mental health issues and bring the best out of them.'
    },
    {
      icon: Brain,
      title: 'Happy Minds',
      description: 'Build community of happy minds.'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
            <Brain className="w-4 h-4" style={{ color: api.color1 }} />
            Mental Health Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            MindQuest
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            ( TOGETHER FOR MENTAL HEALTH TOGETHER FOR YOU )
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* Club FIC */}
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Club FIC
            </h3>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              MRS RENJITHA T R
            </p>
          </div>

          {/* Student Mentors */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: api.color1 }} />
              Student Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <MemberCard name="SARTHAK GUPTA (2021 BATCH)" />
            </div>
          </div>

          {/* About MindQuest */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Brain size={28} style={{ color: api.color1 }} />
              About Us
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                Mind Quest is the premier platform for curious minds at IIIT KOTTAYAM. We foster an environment where students can challenge conventional thinking, Innovate, and participate in various intellectual pursuits. Whether you are interested in puzzles, quizzes, debates, or just need a group of people to talk with, Mind Quest is the place to be.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Target size={28} style={{ color: api.color1 }} />
              Our Vision
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                Mind Quest is a club that promotes mental well-being, and is a place to let go of all your stress and worries. Our mission is not just promote mental health in the college but is various disciplines. with the help of our mind, patience. Not just do we here promote mental well-being but we also host activities for students to relieve themselves from stress and studies that prove again, can take and relax, students that we are constantly raising up with.
              </p>
              <p className="font-semibold">
                To create a space for all students and foster a stress-free environment
              </p>
            </div>
          </div>

          {/* Our Goals */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Lightbulb size={28} style={{ color: api.color1 }} />
              Our Goals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal, index) => (
                <GoalCard key={index} icon={goal.icon} title={goal.title} description={goal.description} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Upcoming Events
            </h2>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Stay tuned for exciting upcoming events like quizzes, debates, and knowledge-based challenges!
            </p>
            <p className={`text-base mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <strong>Past Events:</strong> Here\'s a look at some of our past successful events: Game on Previous Challenge (Adishya)
            </p>
          </div>

          {/* Contact Information */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Contact Us
            </h2>
            <div className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:mindquest@iiittkottayam.ac.in" style={{ color: api.color1 }} className="hover:underline">
                  mindquest@iiittkottayam.ac.in
                </a>
              </p>
              <p>
                <strong>Social Media Links:</strong>{' '}
                <a 
                  href="https://www.instagram.com/mindquest_iiitkotayam_9HS_rfpANPtGScdPc4OdAwQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: api.color1 }} 
                  className="hover:underline"
                >
                  Instagram
                </a>
              </p>
              <p className={`text-sm italic ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                Reach out to stay updated on our events and activities.
              </p>
            </div>
          </div>

          {/* Freshers Day Gallery */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Camera size={28} style={{ color: api.color1 }} />
              Freshers Day
            </h2>
            <ImageGallery count={5} />
          </div>

        </div>
      </section>
    </div>
  );
}