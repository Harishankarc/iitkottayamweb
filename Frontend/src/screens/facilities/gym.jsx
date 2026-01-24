import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Dumbbell, Heart, Users, Clock, Trophy, Zap, Camera, Activity } from 'lucide-react';

// Gym Equipment Card Component
const EquipmentCard = ({ equipment, color1, darkMode }) => {
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
        {/* Equipment Icon */}
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <equipment.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>

        {/* Equipment Details */}
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {equipment.name}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {equipment.description}
        </p>
      </div>
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
              Gym Image {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Gym() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [gymData, setGymData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymData = async () => {
      try {
        setError(null);
        const response = await API.get('/api/facilities/slug/gym');
        if (response.data) {
          setGymData(response.data);
        } else {
          setError('Gym information not available at the moment.');
        }
      } catch (error) {
        console.error('Error fetching gym data:', error);
        setError('Failed to load gym information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchGymData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    API.get('/api/facilities/slug/gym')
      .then((response) => {
        if (response.data) {
          setGymData(response.data);
        } else {
          setError('Gym information not available at the moment.');
        }
      })
      .catch((error) => {
        console.error('Error fetching gym data:', error);
        setError('Failed to load gym information. Please try again later.');
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            Try Again
          </button>
          <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Our gym facilities are available on campus. For more information, please contact the sports department.</p>
        </div>
      </div>
    );
  }

  // Gym equipment data
  const gymEquipment = [
    {
      id: 1,
      name: 'Spinning Bike',
      description: 'High-intensity cardio workout',
      icon: Activity
    },
    {
      id: 2,
      name: 'Treadmill',
      description: 'Running and walking exercise',
      icon: Activity
    },
    {
      id: 3,
      name: 'Elliptical Cross Trainer',
      description: 'Low-impact full body workout',
      icon: Activity
    },
    {
      id: 4,
      name: 'Bench Press',
      description: 'Upper body strength training',
      icon: Dumbbell
    },
    {
      id: 5,
      name: 'Incline Chest',
      description: 'Targeted chest muscle development',
      icon: Dumbbell
    },
    {
      id: 6,
      name: 'Seater Shoulder Press',
      description: 'Shoulder and arm strengthening',
      icon: Dumbbell
    },
    {
      id: 7,
      name: 'Cable Cross Over',
      description: 'Versatile resistance training',
      icon: Dumbbell
    },
    {
      id: 8,
      name: 'Straight Bar',
      description: 'Core strength and stability',
      icon: Dumbbell
    },
    {
      id: 9,
      name: 'Leg Curl/Extension',
      description: 'Lower body muscle development',
      icon: Dumbbell
    },
    {
      id: 10,
      name: 'Dumbbells',
      description: 'Free weight training equipment',
      icon: Dumbbell
    }
  ];

  // Gym features
  const gymFeatures = [
    {
      icon: Heart,
      title: 'Fitness Training',
      description: 'Professional guidance for fitness enthusiasts'
    },
    {
      icon: Users,
      title: 'Student Access',
      description: 'Available for all students with proper guidance'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Extended hours for student convenience'
    },
    {
      icon: Trophy,
      title: 'Sports Activities',
      description: 'Supporting various sports and fitness goals'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Dumbbell className="w-4 h-4" style={{ color: color1 }} />
            Fitness & Wellness
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Gymnasium
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            State-of-the-art fitness facility for developing physical health and sports activities.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Gymnasium */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Our Gymnasium
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            A state of art, Gymnasium nourishes several enthusiasts to develop their fitness & sports activities. IIIT Kottayam has a well equipped gymnasium including Spinning Bike, Treadmill and Elliptical Cross Trainer. We also have Benches, Incline Chest, Seater Shoulder Press, Cable Cross Over, Straight Bar, Leg Curl/Leg Extension & Dumbbells. Students can avail the facilities of gym with the proper guidance of Physical Trainer.
          </p>

          {/* Gym Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gymFeatures.map((feature, index) => {
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

        {/* Gym Equipment */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Available Equipment
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gymEquipment.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Physical Trainer Section */}
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
              Professional Guidance
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our experienced Physical Trainer provides proper guidance to ensure students can safely and effectively use all gym facilities. Professional supervision helps maximize workout benefits while maintaining safety standards.
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Gymnasium Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}