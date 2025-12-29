import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Users, ExternalLink, ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react';
import API from '../../api/api';
import { useTheme } from '../../context/createContext';

const ImageCarousel = ({ images, eventTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg group">
      <img
        src={images[currentIndex]}
        alt={`${eventTitle} - ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-300"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const EventCard = ({ event, darkMode, color1 }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Parse images - could be a single image or multiple images (comma-separated or array)
  const getImages = () => {
    if (!event.image) return [];
    if (Array.isArray(event.image)) return event.image;
    if (typeof event.image === 'string') {
      return event.image.includes(',') ? event.image.split(',').map(img => img.trim()) : [event.image];
    }
    return [];
  };

  const images = getImages();

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{ border: `1px solid ${color1}30` }}
    >
      <ImageCarousel images={images} eventTitle={event.title} />
      
      <div className="p-4 sm:p-5 md:p-6">
        <h3 
          className="text-lg sm:text-xl md:text-2xl font-bold mb-2"
          style={{ color: color1 }}
        >
          {event.title}
        </h3>
        
        <div className={`flex items-center gap-2 mb-3 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Calendar size={16} />
          <span>{formatDate(event.startDate)}</span>
        </div>

        {event.venue && (
          <div className={`flex items-center gap-2 mb-3 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <MapPin size={16} />
            <span>{event.venue}</span>
          </div>
        )}

        <p className={`text-xs sm:text-sm md:text-base mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {event.description}
        </p>

        {event.attendees > 0 && (
          <div className={`flex items-center gap-2 mb-4 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Users size={16} />
            <span>{event.attendees} Attendees</span>
          </div>
        )}

        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold hover:underline"
            style={{ color: color1 }}
          >
            <ExternalLink size={16} />
            Visit Gallery
          </a>
        )}
      </div>
    </div>
  );
};

export default function Events() {
  const { darkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const color1 = API.color1;

  // Default sample events
  const defaultEvents = [
    {
      id: 1,
      title: "IEEE CONFERENCE",
      description: "Annual IEEE conference featuring keynote speakers, technical sessions, and networking opportunities for researchers and industry professionals.",
      startDate: "2020-02-15",
      venue: "Main Auditorium, IIIT Kottayam",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800,https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800,https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      isPublished: true,
      attendees: 250,
      registrationLink: "#gallery"
    },
    {
      id: 2,
      title: "Inter-IIIT20 Jabalpur",
      description: "Inter IIIT Sports Meet (Gusto 2020) at Jabalpur - Annual sports championship bringing together students from all IIITs across India.",
      startDate: "2020-02-20",
      venue: "IIIT Jabalpur Sports Complex",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800,https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800,https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      isPublished: true,
      attendees: 500,
      registrationLink: "#gallery"
    },
    {
      id: 3,
      title: "Republic day 2020",
      description: "Republic day celebrations with flag hoisting ceremony, cultural programs, and patriotic activities organized by the institution.",
      startDate: "2020-01-26",
      venue: "Campus Ground, IIIT Kottayam",
      image: "https://images.unsplash.com/photo-1611416517780-eff3a13b0359?w=800,https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?w=800",
      isPublished: true,
      attendees: 300,
      registrationLink: "#gallery"
    },
    {
      id: 4,
      title: "Dhruva 2019",
      description: "Annual technical and cultural fest featuring competitions, workshops, guest lectures, and entertainment events for students.",
      startDate: "2019-10-15",
      venue: "IIIT Kottayam Campus",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800,https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800,https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
      isPublished: true,
      attendees: 1000,
      registrationLink: "#gallery"
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API.baseURL}/api/events`);
      
      if (!response.ok) {
        // If API fails, use default data
        console.log('Using default events data');
        setEvents(defaultEvents);
        setFilteredEvents(defaultEvents);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      // Filter only published events and sort by date (newest first)
      const publishedEvents = data
        .filter(event => event.isPublished)
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      
      // Use API data if available, otherwise use defaults
      if (publishedEvents.length > 0) {
        setEvents(publishedEvents);
        setFilteredEvents(publishedEvents);
      } else {
        setEvents(defaultEvents);
        setFilteredEvents(defaultEvents);
      }
    } catch (err) {
      console.log('Error fetching events, using default data:', err);
      setEvents(defaultEvents);
      setFilteredEvents(defaultEvents);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <CalendarDays className="w-3 h-3" style={{ color: color1 }} />
            Campus Activities
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            IIIT KOTTAYAM EVENTS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Search Bar */}
          <div className={`rounded-xl shadow-lg p-4 sm:p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-1 w-full">
                <div className="relative">
                  <Search 
                    className="absolute left-4 top-1/2 -translate-y-1/2" 
                    size={20}
                    style={{ color: color1 }}
                  />
                  <input
                    type="text"
                    placeholder="Search events by title, description, or venue..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg text-sm sm:text-base border-2 transition-all focus:outline-none ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-200'
                    }`}
                    style={{
                      borderColor: searchQuery ? color1 : undefined
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                    </button>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setSearchQuery('')}
                disabled={!searchQuery}
                className={`px-6 py-3 sm:py-4 rounded-lg font-semibold text-white transition-all whitespace-nowrap ${
                  searchQuery ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: color1 }}
              >
                Clear All
              </button>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="mt-4 flex items-center justify-between">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Found <span className="font-bold" style={{ color: color1 }}>{filteredEvents.length}</span> {filteredEvents.length === 1 ? 'event' : 'events'}
                </div>
              </div>
            )}
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <CalendarDays size={64} className="mx-auto mb-4 opacity-20" />
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchQuery ? 'No events found matching your search.' : 'No events available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  darkMode={darkMode}
                  color1={color1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}