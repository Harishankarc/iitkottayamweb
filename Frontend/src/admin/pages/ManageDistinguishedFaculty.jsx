import React, { useEffect, useState } from 'react';
import { Search, Star, Award, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/api';

export default function ManageDistinguishedFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/faculty`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!response.ok) throw new Error('Failed to load faculty list');
      const data = await response.json();
      setFaculty(data.data || []);
    } catch (err) {
      console.error('Error fetching faculty:', err);
      setError(err.message || 'Unable to load faculty list.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDistinguished = async (member) => {
    const updatedStatus = !member.isDistinguished;

    // Optimistic UI update
    setFaculty((prev) =>
      prev.map((f) => (f.id === member.id ? { ...f, isDistinguished: updatedStatus } : f))
    );

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/faculty/${member.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ isDistinguished: updatedStatus })
      });

      if (!response.ok) throw new Error('Failed to update status');
      const data = await response.json();
      if (!data.success) throw new Error('Failed to update status');
    } catch (err) {
      console.error('Error updating distinguished status:', err);
      alert('Could not update status. Reverting change.');
      // Revert UI update
      setFaculty((prev) =>
        prev.map((f) => (f.id === member.id ? { ...f, isDistinguished: member.isDistinguished } : f))
      );
    }
  };

  const filteredFaculty = faculty.filter((member) => {
    const term = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(term) ||
      member.designation.toLowerCase().includes(term) ||
      member.department.toLowerCase().includes(term)
    );
  });

  const distinguishedCount = faculty.filter((f) => f.isDistinguished && f.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Distinguished Faculty</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-600" />
            Distinguished Faculty Selector
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Toggle which active faculty members are showcased in the "Distinguished Faculty" section on the public homepage.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <div className="bg-emerald-600 text-white rounded-full p-2">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Featured Count</div>
            <div className="text-xl font-bold text-emerald-950">{distinguishedCount} Selected</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search faculty members by name, designation, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm text-slate-800"
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-medium animate-fadeIn">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading faculty directory...</p>
        </div>
      ) : filteredFaculty.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-sm text-slate-500 font-medium">
            {searchTerm ? 'No matching faculty members found.' : 'No faculty records available.'}
          </p>
        </div>
      ) : (
        /* Faculty Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden ${
                member.isDistinguished
                  ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                  : 'border-slate-200'
              } ${!member.isActive ? 'opacity-60 bg-slate-50/50' : ''}`}
            >
              {/* Card Header & Profile */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0 bg-slate-50">
                    <img
                      src={
                        member.photo
                          ? API.getImageUrl(member.photo)
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member.name
                            )}&size=150&background=239244&color=ffffff&bold=true`
                      }
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&size=150&background=239244&color=ffffff&bold=true`;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">{member.designation}</p>
                    <p className="text-[11px] font-semibold text-emerald-700 truncate mt-0.5">
                      {member.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!member.isActive && (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 rounded-md">
                      Inactive
                    </span>
                  )}
                  {member.isDistinguished && (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-md flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-current" /> Distinguished
                    </span>
                  )}
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="bg-slate-50 border-t border-slate-100 px-5 py-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Distinguished Faculty
                </span>
                <button
                  type="button"
                  onClick={() => toggleDistinguished(member)}
                  disabled={!member.isActive}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    member.isDistinguished ? 'bg-emerald-600' : 'bg-slate-200'
                  } ${!member.isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      member.isDistinguished ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
