// Lightweight HTML cleaner used before rendering content saved from admin
export default function cleanHtmlFormatting(html) {
  if (!html) return '';

  return html
    // Remove dir="ltr" attributes
    .replace(/\s+dir="ltr"/g, '')
    // Remove style attributes that include direction or unicode-bidi
    .replace(/\s+style="[^"]*direction:\s*ltr[^"]*"/g, '')
    .replace(/\s+style="[^"]*unicode-bidi:\s*isolate[^"]*"/g, '')
    // Clean up any remaining empty style attributes
    .replace(/\s+style=""/g, '')
    // Remove any remaining style attributes entirely
    .replace(/\s+style="[^"]*"/g, '');
}
