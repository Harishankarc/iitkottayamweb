import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeftRight, CalendarDays, Sparkles, BookOpenText, Eye, EyeOff } from 'lucide-react';
import API from '../../api/api';

const SECTION_META = {
  announcement: {
    title: 'Announcement',
    subtitle: 'Formal notices and official updates',
    accent: 'from-emerald-600 via-teal-600 to-cyan-600',
    chip: 'Official',
    icon: Sparkles,
    card: 'bg-white border-emerald-200 shadow-emerald-50'
  },
  'campus-update': {
    title: 'Campus Update',
    subtitle: 'Daily happenings and campus stories',
    accent: 'from-sky-600 via-blue-600 to-indigo-600',
    chip: 'Campus',
    icon: BookOpenText,
    card: 'bg-white border-sky-200 shadow-sky-50'
  },
  'quick-update': {
    title: 'Quick Update',
    subtitle: 'Short, fast, and attention-grabbing updates',
    accent: 'from-amber-500 via-orange-500 to-rose-500',
    chip: 'Quick',
    icon: ArrowLeftRight,
    card: 'bg-white border-amber-200 shadow-amber-50'
  }
};

const FALLBACK_META = {
  title: 'Latest News Section',
  subtitle: 'Manage updates for this subsection',
  accent: 'from-emerald-600 via-teal-600 to-cyan-600',
  chip: 'Update',
  icon: Sparkles,
  card: 'bg-white border-emerald-200 shadow-emerald-50'
};

const normalizeKey = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');

const getMetaForSubsection = (subsection) => {
  const key = normalizeKey(subsection?.id || subsection?.title);
  const base = SECTION_META[key] || FALLBACK_META;
  return {
    ...base,
    title: subsection?.title || base.title
  };
};

const createSectionDefault = (sectionName) => ({
  sectionTitle: 'Latest News & Updates',
  sectionName: 'latest-news-updates',
  id: null,
  subsections: [
    { id: 'announcement', title: 'Announcement', icon: '📢', order: 0, items: [] },
    { id: 'campus-update', title: 'Campus Update', icon: '📰', order: 1, items: [] },
    { id: 'quick-update', title: 'Quick Update', icon: '⚡', order: 2, items: [] }
  ]
});

export default function ManageLatestNewsUpdates() {
  const { subsection } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sectionData, setSectionData] = useState(createSectionDefault());

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await API.get('/api/content-sections/latest-news-updates');
        console.log('📡 FETCH RESPONSE:', res);
        if (res?.success && res?.data) {
          const section = res.data;
          console.log('📦 SECTION DATA:', section);
          console.log('📋 SUBSECTIONS:', section.subsections);
          setSectionData({
            ...createSectionDefault(),
            ...section,
            id: section.id || null,
            subsections: (section.subsections || createSectionDefault().subsections).map((sub, index) => ({
              ...sub,
              id: sub.id || ['announcement', 'campus-update', 'quick-update'][index],
              items: Array.isArray(sub.items) ? sub.items : (Array.isArray(sub.content) ? sub.content : [])
            }))
          });
        }
      } catch (error) {
        console.error('Failed to load latest news section', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, []);

  const availableSubsections = useMemo(() => {
    const source = Array.isArray(sectionData.subsections) && sectionData.subsections.length > 0
      ? sectionData.subsections
      : createSectionDefault().subsections;

    return source.map((sub, index) => ({
      ...sub,
      id: normalizeKey(sub.id || sub.title || `subsection-${index}`),
      title: sub.title || `Subsection ${index + 1}`,
      items: Array.isArray(sub.items) ? sub.items : []
    }));
  }, [sectionData.subsections]);

  const activeSubsection = useMemo(() => {
    const requestedKey = normalizeKey(subsection);
    return (
      availableSubsections.find((sub) => normalizeKey(sub.id) === requestedKey) ||
      availableSubsections[0]
    );
  }, [subsection, availableSubsections]);

  const activeMeta = useMemo(() => getMetaForSubsection(activeSubsection), [activeSubsection]);
  const ActiveIcon = activeMeta.icon;

  const updateItem = (subsectionId, itemIndex, field, value) => {
    setSectionData((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub) => {
        if (sub.id !== subsectionId) return sub;
        const items = [...(sub.items || [])];
        items[itemIndex] = { ...items[itemIndex], [field]: value };
        return { ...sub, items };
      })
    }));
  };

  const addItem = (subsectionId) => {
    setSectionData((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub) => {
        if (sub.id !== subsectionId) return sub;
        const items = [...(sub.items || [])];
        items.push({ id: `item-${Date.now()}`, title: '', date: '', pdfLink: '', isNew: false, isHidden: false, description: '' });
        return { ...sub, items };
      })
    }));
  };

  const toggleHidden = (subsectionId, itemIndex) => {
    setSectionData((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub) => {
        if (sub.id !== subsectionId) return sub;
        const items = [...(sub.items || [])];
        items[itemIndex] = { ...items[itemIndex], isHidden: !items[itemIndex].isHidden };
        return { ...sub, items };
      })
    }));
  };

  const removeItem = (subsectionId, itemIndex) => {
    setSectionData((prev) => ({
      ...prev,
      subsections: prev.subsections.map((sub) => {
        if (sub.id !== subsectionId) return sub;
        const items = (sub.items || []).filter((_, index) => index !== itemIndex);
        return { ...sub, items };
      })
    }));
  };

  const saveSection = async () => {
    setSaving(true);
    try {
      const payload = {
        ...sectionData,
        subsections: sectionData.subsections.map((sub, index) => ({
          ...sub,
          order: index,
          content: sub.items || [],
          id: sub.id || ['announcement', 'campus-update', 'quick-update'][index]
        }))
      };
      console.log('💾 saveSection sending payload:', JSON.stringify(payload, null, 2));

      const endpoint = sectionData.id
        ? `/api/content-sections/${sectionData.id}`
        : '/api/content-sections';
      console.log('📤 Endpoint:', endpoint, 'Method:', sectionData.id ? 'PUT' : 'POST');
      const res = sectionData.id
        ? await API.put(endpoint, payload)
        : await API.post(endpoint, payload);
      console.log('📩 API Response:', res);
      if (!res?.success) {
        throw new Error(res?.error || 'Failed to save latest news updates');
      }
      alert('Latest News & Updates saved successfully.');
    } catch (error) {
      console.error(error);
      alert(error.message || 'Unable to save updates.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-slate-600">Loading latest news editor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-900 to-cyan-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Latest News & Updates</p>
            <h1 className="mt-2 text-3xl font-bold">{activeMeta.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75">{activeMeta.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSubsections.map((sub) => {
              const active = normalizeKey(sub.id) === normalizeKey(activeSubsection?.id);
              return (
                <Link
                  key={sub.id}
                  to={`/admin/latest-news-updates/${normalizeKey(sub.id)}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {sub.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className={`rounded-3xl border ${activeMeta.card} p-5 shadow-xl`}>
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Editing interface</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">{activeMeta.title}</h2>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${activeMeta.accent} px-4 py-2 text-sm font-semibold text-white`}>
              <ActiveIcon className="h-4 w-4" />
              {activeMeta.chip}
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {activeSubsection.items?.length ? activeSubsection.items.map((item, index) => (
              <div key={item.id || index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Title</label>
                    <input
                      value={item.title || ''}
                      onChange={(e) => updateItem(activeSubsection.id, index, 'title', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Date</label>
                    <input
                      type="date"
                      value={item.date ? String(item.date).slice(0, 10) : ''}
                      onChange={(e) => updateItem(activeSubsection.id, index, 'date', e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">PDF File (Upload or Link)</label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <label className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 hover:bg-emerald-100 transition">
                            <span className="text-sm font-semibold text-emerald-700">📁 Upload PDF</span>
                          </div>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={async (e) => {
                              if (e.target.files?.[0]) {
                                const file = e.target.files[0];
                                const formData = new FormData();
                                formData.append('image', file); // Backend expects 'image' field
                                formData.append('folder', 'pdfs');
                                try {
                                  const response = await API.post('/api/upload', formData);
                                  if (response.success) {
                                    const pdfPath = response.data.url;
                                    updateItem(activeSubsection.id, index, 'pdfLink', pdfPath);
                                    console.log('✅ PDF uploaded:', pdfPath);
                                  } else {
                                    console.error('❌ Upload failed:', response.error);
                                    alert('❌ PDF upload failed: ' + (response.error || 'Unknown error'));
                                  }
                                } catch (error) {
                                  console.error('❌ PDF upload error:', error);
                                  alert('❌ PDF upload failed: ' + (error.message || 'Unknown error'));
                                }
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {item.pdfLink && (
                        <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2">
                          <span className="text-lg">✅</span>
                          <span className="text-sm font-medium text-green-700 truncate">{item.pdfLink.split('/').pop()}</span>
                          <button
                            type="button"
                            onClick={() => updateItem(activeSubsection.id, index, 'pdfLink', '')}
                            className="ml-auto text-red-600 hover:text-red-800 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-end gap-3 flex-wrap">
                    <label className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={!!item.isNew}
                        onChange={(e) => updateItem(activeSubsection.id, index, 'isNew', e.target.checked)}
                      />
                      Mark as new
                    </label>
                    <button
                      type="button"
                      onClick={() => toggleHidden(activeSubsection.id, index)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        item.isHidden
                          ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                          : 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {item.isHidden ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Hidden (Show)
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Visible (Hide)
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(activeSubsection.id, index)}
                      className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Description</label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateItem(activeSubsection.id, index, 'description', e.target.value)}
                    className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500"
                    placeholder="Write a short description"
                  />
                </div>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                No items yet for {activeMeta.title}.
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addItem(activeSubsection.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </button>
            <button
              type="button"
              onClick={saveSection}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className={`rounded-3xl border ${activeMeta.card} p-5 shadow-xl`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Preview</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">{activeMeta.title}</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {activeSubsection.items?.length || 0} items
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {(activeSubsection.items || []).map((item, index) => (
              <div key={item.id || index} className="rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.date || 'No date'}</p>
                      {item.isNew && <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700">NEW</span>}
                    </div>
                    <h4 className="mt-2 truncate text-base font-semibold text-slate-900">{item.title || 'Untitled item'}</h4>
                    {item.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{item.description}</p>}
                  </div>
                  <div className={`h-10 w-10 rounded-2xl bg-gradient-to-r ${activeMeta.accent}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
