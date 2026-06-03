import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Mail, MapPin, Phone, BookOpenText, Files } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

const parseDetailList = (value) => {
	if (Array.isArray(value)) return value;
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) return parsed;
		} catch {
			// Fallback to comma/newline-separated parsing when non-JSON strings are received.
		}
		const normalized = value.replace(/\r\n/g, '\n');
		return normalized.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);
	}
	return [];
};

const parseMainSectionPages = (value) => {
	if (Array.isArray(value)) return value.map((item) => String(item || ''));
	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value);
			if (Array.isArray(parsed)) return parsed.map((item) => String(item || ''));
		} catch {
			// Use the raw string as a single page when not JSON.
		}
		return [value];
	}
	return [];
};

const parseDetailEntries = (items) => {
	if (!Array.isArray(items)) return [];
	return items
		.map((item) => (typeof item === 'string' ? item.trim() : ''))
		.filter(Boolean)
		.map((item) => {
			const boldMatch = item.match(/^\*{2}\s*(.+?)\s*\*{2}$/);
			if (boldMatch) {
				return { type: 'bold', text: boldMatch[1].trim() };
			}
			const underlineMatch = item.match(/^__\s*(.+?)\s*__$/);
			if (underlineMatch) {
				return { type: 'underline', text: underlineMatch[1].trim() };
			}
			const htmlUnderlineMatch = item.match(/^<u>\s*([\s\S]+?)\s*<\/u>$/i);
			if (htmlUnderlineMatch) {
				return { type: 'underline', text: htmlUnderlineMatch[1].trim() };
			}
			return { type: 'item', text: item };
		});
};

const escapeHtml = (value) => String(value || '')
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#39;');

const formatMainSectionText = (text) => {
	if (!text) return '';
	const escaped = escapeHtml(text);
	const linkified = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#239244;font-weight:700;text-decoration:none;">$1</a>');
	const bolded = linkified.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
	const italicized = bolded.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
	const lines = italicized.split(/\r?\n/);
	const hasListItems = lines.some((line) => /^\s*-\s+/.test(line));

	if (hasListItems) {
		let html = '';
		let listOpen = false;
		lines.forEach((line) => {
			if (/^\s*-\s+/.test(line)) {
				if (!listOpen) {
					html += '<ul style="margin:12px 0;padding-left:20px;">';
					listOpen = true;
				}
				html += `<li style="margin:6px 0;color:#374151;">${line.replace(/^\s*-\s+/, '')}</li>`;
			} else {
				if (listOpen) {
					html += '</ul>';
					listOpen = false;
				}
				if (line.trim()) {
					html += `<p style="margin:8px 0;line-height:1.75;color:#374151;">${line}</p>`;
				}
			}
		});
		if (listOpen) html += '</ul>';
		return html;
	}

	const paragraphHtml = lines.map((line) => line || '<br/>').join('<br/>');
	return `<div style="line-height:1.75;color:#374151;">${paragraphHtml}</div>`;
};

const slugifyFacultyName = (name, designation = '') => {
	const baseText = `${name || ''} ${designation || ''}`.trim().toLowerCase();
	return baseText
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '') || 'faculty';
};

const DetailSection = ({ title, icon: Icon, items, darkMode, color1 }) => {
	if (!items || items.length === 0) return null;

	return (
		<section className={`rounded-2xl border p-4 sm:p-5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
			<div className="flex items-center gap-2 mb-3">
				<Icon className="w-5 h-5" style={{ color: color1 }} />
				<h2 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{title}</h2>
			</div>
			<div className="space-y-2">
				{items.map((item, index) => (
					item.type === 'bold' ? (
						<p key={`${title}-bold-${index}`} className="text-sm font-bold text-black">
							{item.text}
						</p>
					) : item.type === 'underline' ? (
						<p key={`${title}-underline-${index}`} className={`text-sm underline underline-offset-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
							{item.text}
						</p>
					) : (
						<div key={`${title}-item-${index}`} className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
							{item.text}
						</div>
					)
				))}
			</div>
		</section>
	);
};

export default function FacultyDetails() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const { darkMode } = useTheme();
	const color1 = API.color1;
	const [faculty, setFaculty] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchFaculty = async () => {
			try {
				setLoading(true);
				setError('');
				// Add timestamp to bypass browser cache
				const response = await fetch(`${API.baseURL}/api/faculty?t=${Date.now()}`);
				if (!response.ok) {
					throw new Error('Unable to load faculty details');
				}
				const data = await response.json();
				const facultyList = data.data || [];
				const resolvedSlug = String(slug || '').trim().toLowerCase();
				const matchedFaculty = facultyList.find((item) => {
					const itemSlug = slugifyFacultyName(item.name, item.designation);
					return itemSlug === resolvedSlug || String(item.id) === resolvedSlug;
				});

				if (!matchedFaculty) {
					throw new Error('Faculty details not found');
				}

				console.log('✅ Faculty fetched successfully:', {
					id: matchedFaculty.id,
					name: matchedFaculty.name,
					mainSectionRaw: matchedFaculty.mainSection,
					mainSectionType: typeof matchedFaculty.mainSection,
					mainSectionIsArray: Array.isArray(matchedFaculty.mainSection)
				});

				setFaculty(matchedFaculty);
			} catch (fetchError) {
				setError(fetchError.message || 'Unable to load faculty details');
				console.error('❌ Error fetching faculty:', fetchError);
			} finally {
				setLoading(false);
			}
		};

		if (slug) {
			fetchFaculty();
		}
	}, [slug]);

	// Debug: Log faculty data and mainSection parsing
	useEffect(() => {
		if (faculty) {
			console.log('📋 Faculty loaded:', faculty.name);
			console.log('🔍 Raw mainSection:', faculty.mainSection);
			console.log('📄 Parsed mainSectionPages:', mainSectionPages);
			console.log('📊 Page count:', mainSectionPages.length);
		}
	}, [faculty]);

	const fullDetailEntries = parseDetailEntries((faculty?.fullDetails && faculty.fullDetails.length > 0) ? faculty.fullDetails : (faculty?.rightSideDetails || []));
	const normalizeHtmlImageSrc = (html) => {
		if (!html || typeof html !== 'string') return '';
		return html.replace(/<img\s+([^>]*?)src=\"([^\"]+)\"([^>]*?)>/gi, (m, pre, src, post) => {
			const trimmed = String(src || '').trim();
			if (!trimmed) return m;
			if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
				return `<img ${pre}src=\"${trimmed}\"${post}>`;
			}
			const resolved = API.getImageUrl(trimmed) || trimmed;
			return `<img ${pre}src=\"${resolved}\"${post}>`;
		});
	};

	const fullDetailsHtml = normalizeHtmlImageSrc(faculty?.fullDetailsHtml || '');
	const mainSectionPages = useMemo(() => parseMainSectionPages(faculty?.mainSection), [faculty?.mainSection]);
	const researchInterests = parseDetailList(faculty?.researchInterests);
	const publications = parseDetailList(faculty?.publications);

	const [currentMainSectionPage, setCurrentMainSectionPage] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		setCurrentMainSectionPage(0);
		setFadeOut(false);
	}, [faculty?.mainSection]);

	useEffect(() => {
		// Only set up rotation if there are multiple pages
		if (mainSectionPages.length <= 1) {
			return undefined;
		}

		// Fade out after 6.5 seconds
		const fadeOutTimer = setTimeout(() => {
			setFadeOut(true);
		}, 6500);

		// Switch page at 7 seconds
		const nextPageTimer = setTimeout(() => {
			setCurrentMainSectionPage((prev) => (prev + 1) % mainSectionPages.length);
			setFadeOut(false);
		}, 7000);

		return () => {
			clearTimeout(fadeOutTimer);
			clearTimeout(nextPageTimer);
		};
	}, [currentMainSectionPage, mainSectionPages.length]);

	const mainSection = mainSectionPages[currentMainSectionPage] || '';

	return (
		<div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
			<div className={`border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
					<div className="flex gap-3">
						<button
							type="button"
							onClick={() => navigate(-1)}
							className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Faculty
						</button>
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
				{loading ? (
					<div className="flex items-center justify-center py-20">
						<div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300" style={{ borderTopColor: color1 }} />
					</div>
				) : error ? (
					<div className={`mx-auto max-w-2xl rounded-2xl border p-6 text-center ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`}>
						<p className="text-lg font-semibold">{error}</p>
						<button
							type="button"
							onClick={() => navigate('/people/faculty')}
							className="mt-4 inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
							style={{ backgroundColor: color1 }}
						>
							Go Back
						</button>
					</div>
				) : faculty ? (
					<div className="space-y-6">
						<section className={`overflow-hidden rounded-3xl border shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
							<div className="flex flex-col gap-4 p-3 sm:flex-row sm:items-start sm:gap-5 sm:p-4 lg:p-5">
								<div className="relative mx-auto w-28 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm sm:mx-0 sm:w-32 lg:w-36 aspect-square">
									<img
										src={API.getImageUrl(faculty.photo) || `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name || 'Faculty')}&size=800&background=239244&color=ffffff&bold=true`}
										alt={faculty.name}
										className="h-full w-full object-cover"
										title={faculty.name}
									/>
								</div>

								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div>
											<div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ backgroundColor: `${color1}14`, color: color1 }}>
												<GraduationCap className="h-3 w-3" />
												Faculty Details
											</div>
											<h1 className={`mt-2 text-xl font-bold sm:text-2xl ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
												{faculty.name}
											</h1>
											{faculty.designation && (
												<p className={`mt-1 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
													{faculty.designation}
												</p>
											)}
										</div>
									</div>

									<div className="mt-4 grid gap-2 sm:grid-cols-2">
										{faculty.department && (
											<div className={`rounded-lg border px-3 py-2 ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
												<p className="text-[10px] uppercase tracking-wide text-gray-500">Department</p>
												<p className="mt-0.5 text-sm font-semibold">{faculty.department}</p>
											</div>
										)}
										{faculty.specialization && (
											<div className={`rounded-lg border px-3 py-2 ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
												<p className="text-[10px] uppercase tracking-wide text-gray-500">Specialization</p>
												<p className="mt-0.5 text-sm font-semibold">{faculty.specialization}</p>
											</div>
										)}
										{faculty.email && (
											<div className={`rounded-lg border px-3 py-2 ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
												<div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
													<Mail className="h-3.5 w-3.5" />
													Email
												</div>
												<p className="mt-0.5 text-sm font-semibold break-all">{faculty.email}</p>
											</div>
										)}
										{faculty.phone && (
											<div className={`rounded-lg border px-3 py-2 ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'}`}>
												<div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
													<Phone className="h-3.5 w-3.5" />
													Phone
												</div>
												<p className="mt-0.5 text-sm font-semibold">{faculty.phone}</p>
											</div>
										)}
										{faculty.department && (
											<div className={`rounded-lg border px-3 py-2 ${darkMode ? 'border-gray-700 bg-gray-900/40' : 'border-gray-200 bg-gray-50'} sm:col-span-2`}>
												<div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-500">
													<MapPin className="h-3.5 w-3.5" />
													Department / Office
												</div>
												<p className="mt-0.5 text-sm font-semibold">{faculty.department}</p>
											</div>
										)}
									</div>

									{faculty.bio && (
										<div className="mt-4">
											<h2 className={`text-sm font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Bio</h2>
											<p className={`mt-1 text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
												{faculty.bio}
											</p>
										</div>
									)}
								</div>
							</div>
						</section>

						<section className={`rounded-2xl border p-4 sm:p-5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
							<div className="flex items-center gap-2 mb-3">
								<Files className="w-5 h-5" style={{ color: color1 }} />
								<h2 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Main Section</h2>
							</div>

							{mainSection ? (
								/<[^>]+>/.test(mainSection) ? (
									<div
										className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-opacity duration-500`}
										dangerouslySetInnerHTML={{ __html: mainSection }}
										style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', opacity: fadeOut ? 0 : 1 }}
									/>
								) : (
									<div
										className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-opacity duration-500`}
										dangerouslySetInnerHTML={{ __html: formatMainSectionText(mainSection) }}
										style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', opacity: fadeOut ? 0 : 1 }}
									/>
								)
							) : (
								<p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
									No main section content available.
								</p>
							)}

							{mainSectionPages.length > 1 && (
								<div className="mt-4 flex justify-center gap-2">
									{mainSectionPages.map((_, index) => (
										<span
											key={`detail-dot-${index}`}
											className={`h-2.5 w-2.5 rounded-full transition-all ${index === currentMainSectionPage ? 'bg-green-600' : 'bg-gray-300'}`}
											style={index === currentMainSectionPage ? { backgroundColor: color1 } : {}}
										/>
									))}
								</div>
							)}
						</section>

						{fullDetailsHtml ? (
							<section className={`rounded-2xl border p-4 sm:p-5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
								<div className="flex items-center gap-2 mb-3">
									<BookOpenText className="w-5 h-5" style={{ color: color1 }} />
									<h2 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Full Details</h2>
								</div>
								<div className="space-y-4" dangerouslySetInnerHTML={{ __html: fullDetailsHtml }} />
							</section>
						) : (
							<DetailSection title="Full Details" icon={BookOpenText} items={fullDetailEntries} darkMode={darkMode} color1={color1} />
						)}

						<div className="grid gap-6 lg:grid-cols-2">
							<section className={`rounded-2xl border p-4 sm:p-5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
								<div className="flex items-center gap-2 mb-3">
									<BookOpenText className="w-5 h-5" style={{ color: color1 }} />
									<h2 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Research Interests</h2>
								</div>
								{researchInterests.length > 0 ? (
									<ul className="space-y-2">
										{researchInterests.map((item, index) => (
											<li key={`research-${index}`} className={`rounded-lg px-3 py-2 text-sm ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
												{item}
											</li>
										))}
									</ul>
								) : (
									<p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No research interests available.</p>
								)}
							</section>

							<section className={`rounded-2xl border p-4 sm:p-5 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
								<div className="flex items-center gap-2 mb-3">
									<BookOpenText className="w-5 h-5" style={{ color: color1 }} />
									<h2 className={`text-lg font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Publications</h2>
								</div>
								{publications.length > 0 ? (
									<ul className="space-y-2">
										{publications.map((item, index) => (
											<li key={`publication-${index}`} className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-50 text-gray-700'}`}>
												{item}
											</li>
										))}
									</ul>
								) : (
									<p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No publications available.</p>
								)}
							</section>
						</div>
						<div className="flex justify-center">
							<Link
								to="/people/faculty"
								className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
								style={{ backgroundColor: color1 }}
							>
								View all faculty
								<ArrowLeft className="h-4 w-4 rotate-180" />
							</Link>
						</div>
					</div>
				) : null}
			</main>
		</div>
	);
}