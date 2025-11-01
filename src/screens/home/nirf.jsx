import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.jsx';
import {
  Trophy,
  Award,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  BookOpenText,
  Microscope,
  Users,
  Eye,
  FileText,
  Building,
  Quote
} from 'lucide-react';

export default function Nirf() {
  const color1 = '#239244'; // (Dark Green)
  const color2 = '#e8f5f0'; // (Light Mint)
  const color3 = '#F1F3F3'; // (Light Gray)

  // Placeholder data for NIRF parameters
  const nirfParams = [
    { title: 'Teaching, Learning & Resources', score: '85.2', icon: <BookOpenText /> },
    { title: 'Research & Professional Practice', score: '82.1', icon: <Microscope /> },
    { title: 'Graduation Outcomes', score: '90.5', icon: <GraduationCap /> },
    { title: 'Outreach & Inclusivity', score: '78.9', icon: <Users /> },
    { title: 'Perception', score: '80.0', icon: <Eye /> },
    { title: 'Overall Score', score: '83.4', icon: <TrendingUp /> }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundColor: `${color2}E6` }}></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          </div>
          <div className="relative container mx-auto px-4 py-28 md:py-36">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Trophy className="w-4 h-4" style={{ color: color1 }} />
                Our Latest Achievement
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                NIRF <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>Ranking 2025</span>
              </h1>
              <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-light max-w-4xl mx-auto">
                A Testament to Our Continued Excellence in Education and Research
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-16 -mt-24 md:-mt-32">
          
          {/* Main Ranking Cards Section */}
          <section className="mb-24 relative">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Engineering Ranking Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:-translate-y-2 cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: color2 }}>
                    <Award className="w-8 h-8" style={{ color: color1 }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300" onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    Engineering
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-4">Rank Band</p>
                <div className="text-6xl font-extrabold mb-4" style={{ color: color1 }}>
                  101-150
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  Consistently placed among the top engineering institutions, reflecting our strong focus on technical education and innovation.
                </p>
              </div>

              {/* Overall Ranking Card */}
              <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:-translate-y-2 cursor-pointer" onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: color2 }}>
                    <Building className="w-8 h-8" style={{ color: color1 }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300" onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    Overall
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-4">Rank Band</p>
                <div className="text-6xl font-extrabold mb-4" style={{ color: color1 }}>
                  151-200
                </div>
                <p className="text-base text-gray-700 leading-relaxed">
                  Recognized nationally for our comprehensive academic framework, research output, and holistic development of students.
                </p>
              </div>
            </div>
          </section>

          {/* Director's Message Section */}
          <section className="mb-24">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-3xl p-10 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 cursor-pointer" style={{ backgroundColor: color2, borderColor: `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}33`}>
                <Quote className="absolute top-8 left-8 w-20 h-20 opacity-10" style={{ color: color1 }} />
                <div className="relative z-10 text-center">
                  <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed mb-8">
                    "Our performance in the NIRF 2025 rankings is a direct result of the relentless dedication of our faculty, the innovative spirit of our students, and our collective commitment to academic and research excellence."
                  </p>
                  <div className="text-lg font-bold" style={{ color: color1 }}>
                    — Director, IIIT Kottayam
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Parameter Breakdown Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Our Performance <span style={{ color: color1 }}>Snapshot</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
                NIRF evaluates institutions on several key parameters. Here's how we performed.
              </p>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}CC, ${color1})` }}></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {nirfParams.map((param, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden hover:bg-[#e8f5f0]"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color1 }}></div>
                  <div className="relative flex items-center gap-5">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: color2 }}>
                      {React.cloneElement(param.icon, { className: "w-8 h-8", style: { color: color1 } })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 leading-tight mb-2" onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                        {param.title}
                      </h3>
                      <p className="text-2xl font-bold" style={{ color: color1 }}>
                        {param.score}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <Link to="#" className="block">
                <div className="rounded-3xl p-10 shadow-xl transition-all duration-500 border relative overflow-hidden group" style={{ backgroundColor: color1, borderColor: `${color1}CC` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 transition-colors duration-300">
                        View the Full Report
                      </h3>
                      <p className="text-lg text-gray-50 transition-colors duration-300">
                        Download the detailed NIRF 2025 report for IIIT Kottayam.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                      <span className="text-white group-hover:text-[#239244] font-bold text-lg transition-colors duration-300">Download PDF</span>
                      <FileText className="w-6 h-6 text-white group-hover:text-[#239244] transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

