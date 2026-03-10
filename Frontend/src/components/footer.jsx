import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Linkedin, Youtube, Instagram, Github } from 'lucide-react';
import API from "../api/api";
import { useTheme } from "../context/createContext";

const ICON_MAP = {
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Github
};

const AppFooter = () => {
  const { darkMode } = useTheme();
  const [footerLinks, setFooterLinks] = useState({
    departments: [],
    reports: [],
    social: [],
    links: [],
    legal: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  const fetchFooterLinks = async () => {
    try {
      // Add timestamp to prevent caching
      const response = await API.get(`/api/footer-links?_t=${Date.now()}`);
      console.log('Footer API Response:', response);
      
      if (response.success && response.data) {
        // Handle both nested and direct data structures
        const footerData = response.data.data || response.data;
        console.log('Footer data received:', footerData);
        
        // Ensure we have the correct structure
        if (footerData.departments !== undefined) {
          setFooterLinks(footerData);
        } else {
          console.warn('Invalid footer data structure:', footerData);
        }
      } else {
        console.warn('API response not successful:', response);
      }
    } catch (error) {
      console.error('Error fetching footer links:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group main links by column
  const linksByColumn = (footerLinks.links || []).reduce((acc, link) => {
    const col = link.column_index || 1;
    if (!acc[col]) acc[col] = [];
    acc[col].push(link);
    return acc;
  }, {});

  // Debug: Log footer state
  useEffect(() => {
    console.log('Footer Rendering State:', {
      departments: footerLinks.departments?.length || 0,
      reports: footerLinks.reports?.length || 0,
      social: footerLinks.social?.length || 0,
      links: footerLinks.links?.length || 0,
      legal: footerLinks.legal?.length || 0,
      loading
    });
  }, [footerLinks, loading]);

  const bgMain = darkMode ? 'bg-gray-900/80' : 'bg-gray-50/90';
  const bgCard = darkMode ? 'bg-gray-800/70' : 'bg-white/80';
  const textPrimary = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  if (loading) {
    return (
      <footer className={`${bgMain} backdrop-blur-sm ${textPrimary} py-12`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={textSecondary}>Loading footer...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className={`${bgMain} backdrop-blur-sm ${textPrimary} mt-12`}>
      {/* Departments */}
      {(footerLinks.departments || []).length > 0 && (
        <div className={`${bgCard} backdrop-blur-md border-t-4 border-green-600`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h3 className="text-lg font-bold mb-4">Departments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
              {(footerLinks.departments || []).map((d) => (
                <a 
                  key={d.id} 
                  href={d.url} 
                  className={`${textSecondary} hover:text-green-600 transition`}
                  target={d.openInNewTab ? '_blank' : '_self'}
                  rel={d.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reports */}
      {(footerLinks.reports || []).length > 0 && (
        <div className={`${bgCard} backdrop-blur-md border-t ${borderColor} mt-px`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-4 justify-center text-xs font-medium">
              {(footerLinks.reports || []).map((r) => (
                <a 
                  key={r.id} 
                  href={r.url} 
                  className={`${textSecondary} hover:text-green-600 transition`}
                  target={r.openInNewTab ? '_blank' : '_self'}
                  rel={r.openInNewTab ? 'noopener noreferrer' : undefined}
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Links */}
      <div className={`${bgMain} backdrop-blur-sm py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Social Icons */}
          {(footerLinks.social || []).length > 0 && (
            <div className="flex justify-center gap-3 mb-8">
              {(footerLinks.social || []).map((social) => {
                const Icon = ICON_MAP[social.icon] || Linkedin;
                return (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    target={social.openInNewTab ? '_blank' : '_self'}
                    rel={social.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={`w-10 h-10 ${bgCard} backdrop-blur-md rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition shadow`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}

          {/* Links Grid */}
          {Object.keys(linksByColumn).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {Object.keys(linksByColumn).sort((a, b) => a - b).map((col) => (
                <div key={col}>
                  {linksByColumn[col].map((link) => (
                    <a 
                      key={link.id} 
                      href={link.url} 
                      className={`block py-1 ${textSecondary} hover:text-green-600 transition`}
                      target={link.openInNewTab ? '_blank' : '_self'}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gradient-to-r from-green-700/90 to-green-800/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-100">
            {(footerLinks.legal || []).length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {(footerLinks.legal || []).map((item, i) => (
                  <React.Fragment key={item.id}>
                    <a 
                      href={item.url} 
                      className="hover:text-white transition font-medium"
                      target={item.openInNewTab ? '_blank' : '_self'}
                      rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {item.label}
                    </a>
                    {i < (footerLinks.legal || []).length - 1 && <span className="text-gray-300">|</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <div className="text-center">
              <p className="font-medium">GST: 32AAAAI9154L1ZJ | © 2025 IIIT Kottayam</p>
            </div>
          </div>
          <p className="text-center text-gray-200 text-xs mt-2">
            Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString('en-US', {hour12: false})}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;