/**
 * Utility functions for sanitizing and cleaning HTML content
 */

/**
 * Clean HTML by removing extra dir and style attributes added by RichEditor
 * Keeps only essential formatting tags (strong, em, u, a, ul, ol, li)
 * @param {string} html - Raw HTML with formatting
 * @returns {string} Cleaned HTML
 */
export function cleanHtmlFormatting(html) {
  if (!html) return '';
  
  return html
    // Remove dir="ltr" attributes
    .replace(/\s+dir="ltr"/g, '')
    // Remove style attributes but keep the tags
    .replace(/\s+style="[^"]*direction:\s*ltr[^"]*"/g, '')
    // Remove unicode-bidi related styles
    .replace(/\s+style="[^"]*unicode-bidi:\s*isolate[^"]*"/g, '')
    // Clean up any remaining empty style attributes
    .replace(/\s+style=""/g, '')
    // Remove any remaining style attributes entirely
    .replace(/\s+style="[^"]*"/g, '');
}

/**
 * Get CSS for rendering formatted HTML content
 * @param {string} color1 - Primary theme color
 * @param {boolean} darkMode - Whether dark mode is enabled
 * @returns {string} CSS string
 */
export function getFormattingStyles(color1, darkMode) {
  return `
    ${darkMode ? `
      strong { font-weight: 700; }
      em { font-style: italic; }
      u { text-decoration: underline; }
      a { color: ${color1}; font-weight: 600; text-decoration: underline; cursor: pointer; }
      a:hover { opacity: 0.8; }
      ul { margin: 12px 0; padding-left: 24px; list-style-type: disc; }
      ol { margin: 12px 0; padding-left: 24px; list-style-type: decimal; }
      li { margin: 6px 0; }
    ` : `
      strong { font-weight: 700; }
      em { font-style: italic; }
      u { text-decoration: underline; }
      a { color: ${color1}; font-weight: 600; text-decoration: underline; cursor: pointer; }
      a:hover { opacity: 0.8; }
      ul { margin: 12px 0; padding-left: 24px; list-style-type: disc; }
      ol { margin: 12px 0; padding-left: 24px; list-style-type: decimal; }
      li { margin: 6px 0; }
    `}
  `;
}
