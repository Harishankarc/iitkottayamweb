import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function Contact() {
  const { darkMode } = useTheme();
    const color1 = API.color1;

  const phoneNumbers = {
    generalEnquiry: ['+91 0482 228210', '+91 8075-521128'],
    ugAdmissions: ['+91 0482 228290', '+91 0482 2282136', '+91 0482 2282150', '+91 0482 2282164'],
    pgAdmissions: ['+91 7902 606462', '+91 0482 2282149'],
    phdAdmissions: ['+91 6282 082318', '+91 0482 2282145', '+91 0482 2282158'],
    mtechAdmissions: ['+91 0482 228229', '+91 0482 228236', '+91 0482 228248'],
    accounts: ['+91 0482 2282127', '+91 7012 641779']
  };

  const sections = [
    { title: 'General Enquiry', phones: phoneNumbers.generalEnquiry },
    { title: 'UG Admissions/Academics', phones: phoneNumbers.ugAdmissions },
    { title: 'PG Admissions/Academics', phones: phoneNumbers.pgAdmissions },
    { title: 'Ph.D Admissions/Academics', phones: phoneNumbers.phdAdmissions },
    { title: 'M.Tech Admissions/Academics', phones: phoneNumbers.mtechAdmissions },
    { title: 'Accounts', phones: phoneNumbers.accounts }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <MapPin className="w-3 h-3" style={{ color: color1 }} />
            Get In Touch
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            CONTACT US
          </h1>
        </div>
      </div>

      {/* Maps Section */}
      <div className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Railway Station Map */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b" style={{ borderColor: `${color1}30` }}>
                <h3 className="font-bold text-lg" style={{ color: color1 }}>
                  Railway Station to IIIT Kottayam
                </h3>
              </div>
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d125751.84257346676!2d76.48847844999999!3d9.591791949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3b062ba971e82e61%3A0x5bc'b70083e5c88b0!2sKottayam%20Railway%20Station!3m2!1d9.5916!2d76.5284743!4m5!1s0x3b062b7e7f0e6e3b%3A0xf4e0b3e3e3e3e3e3!2sIndian%20Institute%20of%20Information%20Technology%20Kottayam!3m2!1d9.4166667!2d76.6333333!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={darkMode ? 'invert-90' : ''}
                ></iframe>
              </div>
            </div>

            {/* Airport Map */}
            <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b" style={{ borderColor: `${color1}30` }}>
                <h3 className="font-bold text-lg" style={{ color: color1 }}>
                  Cochin International Airport to IIIT Kottayam
                </h3>
              </div>
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d251503.68514693352!2d76.2884784!3d9.8041666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sCochin%20International%20Airport!3m2!1d10.152008099999999!2d76.401711!4m5!1s0x3b062b7e7f0e6e3b%3A0xf4e0b3e3e3e3e3e3!2sIndian%20Institute%20of%20Information%20Technology%20Kottayam!3m2!1d9.4166667!2d76.6333333!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={darkMode ? 'invert-90' : ''}
                ></iframe>
              </div>
            </div>
          </div>

          {/* Reach IIIT Kottayam Section */}
          <div className={`rounded-xl p-6 mb-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: color1 }}>
              Reach IIIT Kottayam
            </h2>
            
            <div className="space-y-4">
              {/* Distance Info */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-8 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">KOTTAYAM</span>
                    <span className={`px-4 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      30 km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">VALLA</span>
                    <span className={`px-4 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      18 km
                    </span>
                  </div>
                  <span className="font-bold text-lg">IIIT KOTTAYAM</span>
                </div>
              </div>

              {/* Directions */}
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>From the Bus Station (KSRTC Bus Station):</strong> IIIT Kottayam's permanent campus is located in Valavoor village, Rejo, Kottayam. The campus is about 18km away from Rela which is en route to IIIT Kottayam campus.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>From the Airport:</strong> IIIT Kottayam is about 70 km from the Cochin International Airport, Nedumbassery. A taxi will cost around Rs. 2000/- from Airport to IIIT Kottayam campus.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>From the Railway Station (KSRTC Bus Station):</strong> IIIT Kottayam is about 40 km from Kottayam Railway Station (KTYM, KSRTC Vanda State Road Transport Corporation) but services are available from KSRTC Bus Station to Rela. From Rela, you can hire an auto/taxi or gypsy buses to Scooter Junction & then you can hire an auto to IIIT Kottayam campus.
                </p>
              </div>
            </div>
          </div>

          {/* Hotels Nearby Section */}
          <div className={`rounded-xl p-6 mb-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: color1 }}>
              Hotels Nearby IIIT Kottayam
            </h2>
            <div className="text-center">
              <a 
                href="https://www.google.com/maps/search/hotels+near+IIIT+Kottayam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: color1 }}
              >
                Download List of Hotels
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Reach Us */}
            <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-6">
                <Phone className="w-6 h-6" style={{ color: color1 }} />
                <h2 className="text-2xl font-bold" style={{ color: color1 }}>Reach Us</h2>
              </div>
              
              <div className="space-y-4">
                {sections.map((section, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-700">
                    <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {section.title}:
                    </h3>
                    <div className="space-y-1">
                      {section.phones.map((phone, pidx) => (
                        <a
                          key={pidx}
                          href={`tel:${phone}`}
                          className={`block text-sm hover:underline ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                <div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email:
                  </h3>
                  <a
                    href="mailto:office@iiitkottayam.ac.in"
                    className="text-sm hover:underline"
                    style={{ color: color1 }}
                  >
                    office@iiitkottayam.ac.in
                  </a>
                </div>
              </div>
            </div>

            {/* Communication Address */}
            <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-6 h-6" style={{ color: color1 }} />
                <h2 className="text-2xl font-bold" style={{ color: color1 }}>Communication Address</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <strong>Indian Institute of Information Technology Kottayam</strong><br />
                    Valavoor PO<br />
                    Kottayam, Kerala<br />
                    Kerala, India
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Follow Us:
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/iiitkottayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: '#1877F2' }}
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://twitter.com/iiitkottayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: '#1DA1F2' }}
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.linkedin.com/school/iiitkottayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: '#0A66C2' }}
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.youtube.com/@iiitkottayam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: '#FF0000' }}
                      aria-label="YouTube"
                    >
                      <Youtube className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
