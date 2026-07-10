import React, { useEffect, useState } from 'react';
import { Search, Star, Building2, Loader2, ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/api';

export default function ManageRecruitmentPartners() {
  const [logos, setLogos] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/content-blocks/page/placements`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!response.ok) throw new Error('Failed to load placement content');
      const data = await response.json();

      const blocks = Array.isArray(data.data) ? data.data : (data.data?.data || []);
      const logoBlock = blocks.find(b => b.blockType === 'logo' || b.blockId === 'company-logos');

      if (!logoBlock) {
        setError('No recruitment partners block found. Please add a Company Logo block on the Placements page first.');
        return;
      }

      let parsedContent = logoBlock.content;
      if (typeof parsedContent === 'string') {
        try { parsedContent = JSON.parse(parsedContent); } catch { parsedContent = {}; }
      }

      setBlockId(logoBlock.id);
      setLogos(Array.isArray(parsedContent.logos) ? parsedContent.logos : []);
    } catch (err) {
      console.error('Error fetching logos:', err);
      setError(err.message || 'Unable to load recruitment partners.');
    } finally {
      setLoading(false);
    }
  };

  const toggleHomepage = async (idx) => {
    const prev = logos;
    const updated = logos.map((l, i) =>
      i === idx ? { ...l, showOnHomepage: !l.showOnHomepage } : l
    );
    setLogos(updated);

    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const saveRes = await fetch(`${API.baseURL}/api/content-blocks/${blockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ content: { logos: updated } })
      });

      const result = await saveRes.json();
      if (!saveRes.ok || !result.success) throw new Error(result.message || 'Failed to save');
    } catch (err) {
      console.error('Error saving:', err);
      setLogos(prev);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };


  const filteredLogos = logos.filter(logo =>
    (logo.alt || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = logos.filter(l => l.showOnHomepage).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Link to="/admin" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">Recruitment Partners</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            Recruitment Partners Selector
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Toggle which company logos are showcased in the "Recruitment Partners" section on the public homepage.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <div className="bg-emerald-600 text-white rounded-full p-2">
            <Star className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Featured</div>
            <div className="text-xl font-bold text-emerald-950">
              {selectedCount === 0 ? `All ${logos.length}` : `${selectedCount} Selected`}
            </div>
            {selectedCount === 0 && logos.length > 0 && (
              <div className="text-[10px] text-emerald-700 font-medium">Fallback: showing all</div>
            )}
          </div>
        </div>
      </div>

      {/* Saving indicator */}
      {saving && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl w-fit">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving...
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search company logos by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition text-sm text-slate-800"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-10 w-10 text-emerald-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Loading recruitment partners...</p>
        </div>
      ) : filteredLogos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <Building2 className="h-10 w-10 mx-auto mb-3 text-slate-300" />
          <p className="text-sm text-slate-500 font-medium">
            {searchTerm ? 'No matching companies found.' : 'No company logos found. Add them from the Placements page.'}
          </p>
          {!searchTerm && (
            <Link
              to="/admin/content?page=placements"
              className="inline-block mt-4 text-xs font-semibold text-emerald-600 hover:underline"
            >
              Go to Placements Page →
            </Link>
          )}
        </div>
      ) : (
        /* Logo Cards Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filteredLogos.map((logo, idx) => {
            const realIdx = logos.indexOf(logo);
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center overflow-hidden ${
                  logo.showOnHomepage
                    ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Logo Image */}
                <div className="w-full flex items-center justify-center p-5 bg-slate-50 min-h-[110px]">
                  <img
                    src={API.getImageUrl(logo.url)}
                    alt={logo.alt || 'Logo'}
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = `<div class="text-2xl font-black text-slate-300">${(logo.alt || '?').charAt(0).toUpperCase()}</div>`;
                    }}
                  />
                </div>

                {/* Name + optional link */}
                <div className="px-3 pb-3 pt-2 text-center w-full">
                  <p className="text-xs font-bold text-slate-800 truncate">{logo.alt || '—'}</p>
                  {logo.description && (
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">{logo.description}</p>
                  )}
                </div>

                {/* Toggle Footer */}
                <div className="bg-slate-50 border-t border-slate-100 px-3 py-3 w-full flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Homepage</span>
                  <button
                    type="button"
                    onClick={() => toggleHomepage(realIdx)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      logo.showOnHomepage ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        logo.showOnHomepage ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      {!loading && logos.length > 0 && (
        <p className="text-xs text-slate-400 text-center pb-2">
          {selectedCount === 0
            ? 'No logos selected — all will be shown as a fallback.'
            : `${selectedCount} logo${selectedCount > 1 ? 's' : ''} will appear on the homepage.`}
          &nbsp; Changes save instantly.
        </p>
      )}
    </div>
  );
}
