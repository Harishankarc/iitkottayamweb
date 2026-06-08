import React, { useState, useEffect } from 'react';
import { Mail, Phone, BookOpenText, Briefcase, Award, Building2 } from 'lucide-react';

export default function RotatingDetails({ person, color1, darkMode }) {
  const [detailGroupIndex, setDetailGroupIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Debug logging
  console.log('RotatingDetails person:', person.name, 'Phone1:', person.phone, 'Phone2:', person.phone2);

  // Define a list of all potential details in the requested order
  const potentialDetails = [
    { icon: Mail, label: 'Email', value: person.email, key: 'email' },
    { icon: Phone, label: 'Phone 1', value: person.phone, key: 'phone' },
    ...(person.phone2 && person.phone2 !== 'N/A' && String(person.phone2).trim() !== '' 
      ? [{ icon: Phone, label: 'Phone 2', value: person.phone2, key: 'phone2' }] 
      : []),
    { icon: Building2, label: 'Department', value: person.department || person.roles?.[0], key: 'department' },
    { icon: Briefcase, label: 'Room No:', value: person.experience, key: 'experience' },
    { icon: BookOpenText, label: 'Qualification', value: person.qualification || person.room, key: 'qualification' },
    { icon: Award, label: 'Specialization', value: person.specialization || person.roles?.[1], key: 'specialization' }
  ];

  // Filter out invalid/empty/N/A details
  const validDetails = potentialDetails.filter(detail => 
    detail.value && detail.value !== 'N/A' && String(detail.value).trim() !== ''
  );

  // Group details: chunk valid details into groups of exactly 3
  const rawActiveGroups = [];
  if (validDetails.length === 0) {
    rawActiveGroups.push([
      { icon: Mail, label: 'Email', value: person.email || 'N/A', key: 'email' },
      { icon: Phone, label: 'Phone', value: person.phone || 'N/A', key: 'phone' }
    ]);
  } else {
    for (let i = 0; i < validDetails.length; i += 3) {
      rawActiveGroups.push(validDetails.slice(i, i + 3));
    }
  }

  const activeGroups = rawActiveGroups;

  useEffect(() => {
    if (activeGroups.length <= 1) return; // Don't rotate if only one group

    const fadeOutTimer = setTimeout(() => setFadeOut(true), 4500); // Start fading at 4.5s
    const nextGroupTimer = setTimeout(() => {
      setDetailGroupIndex((prev) => (prev + 1) % activeGroups.length);
      setFadeOut(false);
    }, 5000); // Switch at 5s

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(nextGroupTimer);
    };
  }, [detailGroupIndex, activeGroups.length]);

  const currentGroup = activeGroups[detailGroupIndex];

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Details list (fading container) */}
      <div className={`space-y-1.5 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        {currentGroup.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div
              key={`${detail.key}-${detailGroupIndex}`}
              className={`flex items-start gap-2 p-1.5 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
            >
              <div
                className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center"
                style={{ backgroundColor: `${color1}20` }}
              >
                <Icon className="w-3 h-3" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {detail.label}
                </p>
                {detail.key.startsWith('email') ? (
                  <div className="flex flex-col">
                    {detail.value ? (
                      detail.value.split(',').map((email, eIdx) => (
                        <a
                          key={eIdx}
                          href={`mailto:${email.trim()}`}
                          className={`text-xs break-all hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {email.trim()}
                        </a>
                      ))
                    ) : (
                      <span className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>N/A</span>
                    )}
                  </div>
                ) : (
                  <p className={`text-xs whitespace-pre-line ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    {detail.value || 'N/A'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rotation indicator dots (if more than one group) */}
      {activeGroups.length > 1 && (
        <div className="flex justify-center gap-1.5 pt-3 mt-auto">
          {activeGroups.map((_, index) => (
            <div
              key={index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === detailGroupIndex ? '20px' : '6px',
                backgroundColor: index === detailGroupIndex ? color1 : `${color1}40`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
