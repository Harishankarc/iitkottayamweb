import React, { useState, useEffect } from 'react';
import { Mail, Phone, BookOpenText, Briefcase, Award, Building2 } from 'lucide-react';

export default function RotatingDetails({ person, color1, darkMode }) {
  const [detailGroupIndex, setDetailGroupIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Debug logging
  console.log('RotatingDetails person:', person.name, 'Phone1:', person.phone, 'Phone2:', person.phone2);

  // Define detail groups (3 items each)
  const detailGroups = [
    [
      { icon: Mail, label: 'Email', value: person.email, key: 'email' },
      { icon: Phone, label: 'Phone 1', value: person.phone, key: 'phone' },
      { icon: Phone, label: 'Phone 2', value: person.phone2, key: 'phone2' }
    ],
    [
      { icon: BookOpenText, label: 'Qualification', value: person.qualification || person.room, key: 'qualification' },
      { icon: Briefcase, label: 'Room No:', value: person.experience, key: 'experience' },
      { icon: Building2, label: 'Department', value: person.department || person.roles?.[0], key: 'department' }
    ],
    [
      { icon: Award, label: 'Specialization', value: person.specialization || person.roles?.[1], key: 'specialization' },
      { icon: Phone, label: 'Phone', value: person.phone, key: 'phone_alt' },
      { icon: Mail, label: 'Email', value: person.email, key: 'email_alt' }
    ]
  ];

  // Filter out groups that would be completely empty
  const validGroups = detailGroups.filter(group => 
    group.some(detail => detail.value && detail.value !== 'N/A' && detail.value !== '')
  );

  // If no valid groups, fall back to empty
  const activeGroups = validGroups.length > 0 ? validGroups : [detailGroups[0]];

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
              {detail.key === 'email' ? (
                <a
                  href={`mailto:${detail.value}`}
                  className={`text-xs break-all hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {detail.value}
                </a>
              ) : (
                <p className={`text-xs ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {detail.value || 'N/A'}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Rotation indicator dots (if more than one group) */}
      {activeGroups.length > 1 && (
        <div className="flex justify-center gap-1 pt-1">
          {activeGroups.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: index === detailGroupIndex ? '16px' : '4px',
                backgroundColor: index === detailGroupIndex ? color1 : `${color1}40`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
