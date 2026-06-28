import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, renderContentBlock } from '../../hooks/usePageContent.jsx';

export default function Contact() {
  const { darkMode } = useTheme();
  const color1 = API.color1;

  const { blocks, loading } = usePageContent('contact');

  const getBlockContent = (id, fallback) => {
    const block = blocks.find(b => b.blockId === id);
    if (!block || !block.content) return fallback;
    try {
      return typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
    } catch (e) {
      return block.content || fallback;
    }
  };

  const isBlockVisible = (id, fallbackVisible = true) => {
    const block = blocks.find(b => b.blockId === id);
    if (!block) return fallbackVisible;
    return block.isVisible !== false;
  };

  // Hero block
  const heroContent = getBlockContent('contact-hero', {
    title: 'CONTACT US',
    badge: 'Get In Touch'
  });
  const heroVisible = isBlockVisible('contact-hero');

  // Maps block
  const mapsContent = getBlockContent('contact-maps', {
    title: 'Route Maps',
    maps: [
      {
        heading: 'Railway Station to IIIT Kottayam',
        iframeSrc: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d125751.84257346676!2d76.48847844999999!3d9.591791949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3b062ba971e82e61%3A0x5bc7b70083e5c88b0!2sKottayam%20Railway%20Station!3m2!1d9.5916!2d76.5284743!4m5!1s0x3b062b7e7f0e6e3b%3A0xf4e0b3e3e3e3e3e3!2sIndian%20Institute%20of%20Information%20Technology%20Kottayam!3m2!1d9.4166667!2d76.6333333!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
        description: 'IIIT Kottayam is about 40 km from Kottayam Railway Station (KTYM, KSRTC Vanda State Road Transport Corporation) but services are available from KSRTC Bus Station to Rela. From Rela, you can hire an auto/taxi or gypsy buses to Scooter Junction & then you can hire an auto to IIIT Kottayam campus.'
      },
      {
        heading: 'Cochin International Airport to IIIT Kottayam',
        iframeSrc: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d251503.68514693352!2d76.2884784!3d9.8041666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sCochin%20International%20Airport!3m2!1d10.152008099999999!2d76.401711!4m5!1s0x3b062b7e7f0e6e3b%3A0xf4e0b3e3e3e3e3e3!2sIndian%20Institute%20of%20Information%20Technology%20Kottayam!3m2!1d9.4166667!2d76.6333333!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
        description: 'IIIT Kottayam is about 70 km from the Cochin International Airport, Nedumbassery. A taxi will cost around Rs. 2000/- from Airport to IIIT Kottayam campus.'
      }
    ]
  });
  const mapsVisible = isBlockVisible('contact-maps');
  const mapsList = Array.isArray(mapsContent.maps) ? mapsContent.maps : [];

  // Reach block
  const reachContent = getBlockContent('contact-reach', {
    title: 'Reach IIIT Kottayam',
    distanceKottayam: '30 km',
    distanceValavoor: '18 km',
    busRoute: "IIIT Kottayam's permanent campus is located in Valavoor village, Rejo, Kottayam. The campus is about 18km away from Rela which is en route to IIIT Kottayam campus.",
    airportRoute: 'IIIT Kottayam is about 70 km from the Cochin International Airport, Nedumbassery. A taxi will cost around Rs. 2000/- from Airport to IIIT Kottayam campus.',
    railwayRoute: 'IIIT Kottayam is about 40 km from Kottayam Railway Station (KTYM, KSRTC Vanda State Road Transport Corporation) but services are available from KSRTC Bus Station to Rela. From Rela, you can hire an auto/taxi or gypsy buses to Scooter Junction & then you can hire an auto to IIIT Kottayam campus.'
  });
  const reachVisible = isBlockVisible('contact-reach');

  // Hotels block
  const hotelsContent = getBlockContent('contact-hotels', {
    title: 'Hotels Nearby IIIT Kottayam',
    buttonText: 'Download List of Hotels',
    link: 'https://www.google.com/maps/search/hotels+near+IIIT+Kottayam',
    description: ''
  });
  const hotelsVisible = isBlockVisible('contact-hotels');

  // Phones block
  const phonesContent = getBlockContent('contact-phones', {
    title: 'Reach Us',
    email: 'office@iiitkottayam.ac.in',
    rows: [
      ['General Enquiry', '+91 0482 228210, +91 8075-521128'],
      ['UG Admissions/Academics', '+91 0482 228290, +91 0482 2282136, +91 0482 2282150, +91 0482 2282164'],
      ['PG Admissions/Academics', '+91 7902 606462, +91 0482 2282149'],
      ['Ph.D Admissions/Academics', '+91 6282 082318, +91 0482 2282145, +91 0482 2282158'],
      ['M.Tech Admissions/Academics', '+91 0482 228229, +91 0482 228236, +91 0482 228248'],
      ['Accounts', '+91 0482 2282127, +91 7012 641779']
    ]
  });
  const phonesVisible = isBlockVisible('contact-phones');

  // Address block
  const addressContent = getBlockContent('contact-address', {
    title: 'Communication Address',
    addressLine1: 'Indian Institute of Information Technology Kottayam',
    addressLine2: 'Valavoor PO',
    addressLine3: 'Kottayam, Kerala',
    addressLine4: 'Kerala, India',
    facebook: 'https://www.facebook.com/iiitkottayam',
    twitter: 'https://twitter.com/iiitkottayam',
    linkedin: 'https://www.linkedin.com/school/iiitkottayam',
    youtube: 'https://www.youtube.com/@iiitkottayam'
  });
  const addressVisible = isBlockVisible('contact-address');

  // Other custom blocks
  const otherBlocks = blocks.filter(b =>
    !['contact-hero', 'contact-maps', 'contact-reach', 'contact-hotels', 'contact-phones', 'contact-address'].includes(b.blockId)
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Loading overlay if fetching */}
      {loading && blocks.length === 0 && (
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto mb-4" style={{ borderColor: color1 }}></div>
          <p className="text-gray-500">Loading contact information...</p>
        </div>
      )}

      {/* Hero Section */}
      {heroVisible && (
        <div className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-full mx-auto text-center">
            {heroContent.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <MapPin className="w-3 h-3" style={{ color: color1 }} />
                {heroContent.badge}
              </div>
            )}
            {heroContent.title && (
              <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {heroContent.title}
              </h1>
            )}
          </div>
        </div>
      )}

      <div className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          {/* Maps Section */}
          {mapsVisible && mapsList.length > 0 && (
            <div className="mb-8">
              {mapsContent.title && (
                <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: color1 }}>
                  {mapsContent.title}
                </h2>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {mapsList.map((mapItem, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                    style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
                  >
                    <div className="p-4 border-b" style={{ borderColor: darkMode ? '#374151' : `${color1}30` }}>
                      <h3 className="font-bold text-lg" style={{ color: color1 }}>
                        {mapItem.heading || 'Route Map'}
                      </h3>
                    </div>
                    {mapItem.iframeSrc && (
                      <div className="aspect-video w-full h-64 md:h-80">
                        <iframe
                          src={mapItem.iframeSrc}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className={darkMode ? 'invert-90' : ''}
                        ></iframe>
                      </div>
                    )}
                    {mapItem.description && (
                      <div className={`p-4 text-sm leading-relaxed border-t ${
                        darkMode ? 'border-gray-700 text-gray-300 bg-gray-900/40' : 'border-gray-100 text-gray-700 bg-gray-50'
                      }`}>
                        <p dangerouslySetInnerHTML={{ __html: mapItem.description }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reach IIIT Kottayam Section */}
          {reachVisible && (
            <div
              className={`rounded-xl p-6 mb-8 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
            >
              {reachContent.title && (
                <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: color1 }}>
                  {reachContent.title}
                </h2>
              )}

              <div className="space-y-4">
                {/* Distance Info */}
                {(reachContent.distanceKottayam || reachContent.distanceValavoor) && (
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-8 flex-wrap justify-center">
                      {reachContent.distanceKottayam && (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">KOTTAYAM</span>
                          <span className={`px-4 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {reachContent.distanceKottayam}
                          </span>
                        </div>
                      )}
                      {reachContent.distanceValavoor && (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">VALLA</span>
                          <span className={`px-4 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {reachContent.distanceValavoor}
                          </span>
                        </div>
                      )}
                      <span className="font-bold text-lg">IIIT KOTTAYAM</span>
                    </div>
                  </div>
                )}

                {/* Directions */}
                {reachContent.busRoute && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>From the Bus Station:</strong> {reachContent.busRoute}
                    </p>
                  </div>
                )}

                {reachContent.airportRoute && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>From the Airport:</strong> {reachContent.airportRoute}
                    </p>
                  </div>
                )}

                {reachContent.railwayRoute && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>From the Railway Station:</strong> {reachContent.railwayRoute}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hotels Nearby Section */}
          {hotelsVisible && (
            <div
              className={`rounded-xl p-6 mb-8 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
              style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
            >
              {hotelsContent.title && (
                <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: color1 }}>
                  {hotelsContent.title}
                </h2>
              )}
              {hotelsContent.description && (
                <p className={`text-center text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {hotelsContent.description}
                </p>
              )}
              <div className="text-center">
                <a
                  href={hotelsContent.link || 'https://www.google.com/maps/search/hotels+near+IIIT+Kottayam'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all shadow hover:scale-105 duration-300"
                  style={{ backgroundColor: color1 }}
                >
                  {hotelsContent.buttonText || 'Download List of Hotels'}
                </a>
              </div>
            </div>
          )}

          {/* Contact Details Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Reach Us */}
            {phonesVisible && (
              <div
                className={`rounded-xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
                style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Phone className="w-6 h-6" style={{ color: color1 }} />
                  <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                    {phonesContent.title || 'Reach Us'}
                  </h2>
                </div>

                <div className="space-y-4">
                  {phonesContent.rows && phonesContent.rows.map((row, idx) => {
                    const title = row[0];
                    const phones = typeof row[1] === 'string'
                      ? row[1].split(',').map(p => p.trim())
                      : (Array.isArray(row[1]) ? row[1] : []);

                    return (
                      <div key={idx} className="pb-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {title}:
                        </h3>
                        <div className="space-y-1">
                          {phones.map((phone, pidx) => (
                            <a
                              key={pidx}
                              href={`tel:${phone}`}
                              className={`block text-sm hover:underline ${
                                darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                              }`}
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {phonesContent.email && (
                    <div>
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email:
                      </h3>
                      <a
                        href={`mailto:${phonesContent.email}`}
                        className="text-sm hover:underline font-semibold"
                        style={{ color: color1 }}
                      >
                        {phonesContent.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Communication Address */}
            {addressVisible && (
              <div
                className={`rounded-xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
                style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Mail className="w-6 h-6" style={{ color: color1 }} />
                  <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                    {addressContent.title || 'Communication Address'}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>{addressContent.addressLine1}</strong><br />
                      {addressContent.addressLine2 && <>{addressContent.addressLine2}<br /></>}
                      {addressContent.addressLine3 && <>{addressContent.addressLine3}<br /></>}
                      {addressContent.addressLine4 && <>{addressContent.addressLine4}</>}
                    </p>
                  </div>

                  {/* Social Media */}
                  <div className="space-y-3">
                    <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Follow Us:
                    </h3>
                    <div className="flex gap-4">
                      {addressContent.facebook && (
                        <a
                          href={addressContent.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                          style={{ backgroundColor: '#1877F2' }}
                          aria-label="Facebook"
                        >
                          <Facebook className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {addressContent.twitter && (
                        <a
                          href={addressContent.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                          style={{ backgroundColor: '#1DA1F2' }}
                          aria-label="Twitter"
                        >
                          <Twitter className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {addressContent.linkedin && (
                        <a
                          href={addressContent.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                          style={{ backgroundColor: '#0A66C2' }}
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="w-5 h-5 text-white" />
                        </a>
                      )}
                      {addressContent.youtube && (
                        <a
                          href={addressContent.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                          style={{ backgroundColor: '#FF0000' }}
                          aria-label="YouTube"
                        >
                          <Youtube className="w-5 h-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Any other content blocks dynamically added */}
          {otherBlocks.map((block) => (
            <div key={block.id} className="mt-8">
              {renderContentBlock(block, { darkMode, color1 })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
