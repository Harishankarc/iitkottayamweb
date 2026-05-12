import React from 'react';

const SubsectionWrapper = ({ title, icon, color1, darkMode, children }) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all duration-200 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="p-5" style={{ borderColor: color1 + '20' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color1 }}>
            <span className="text-xl">{icon}</span>
          </div>
          <h4 className="font-bold text-lg" style={{ color: color1 }}>{title}</h4>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SubsectionWrapper;
