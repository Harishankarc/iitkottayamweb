/**
 * Utility to handle paste events and strip background colors globally
 */

export const stripBackgroundColors = (html) => {
  if (!html || typeof html !== 'string') return html;
  
  let cleaned = html;
  
  // Remove background-color from inline styles
  cleaned = cleaned.replace(/background-color\s*:\s*[^;]+;?/gi, '');
  cleaned = cleaned.replace(/backgroundColor\s*:\s*[^;]+;?/gi, '');
  
  // Remove background from inline styles
  cleaned = cleaned.replace(/background\s*:\s*[^;]+;?/gi, '');
  
  // Clean up empty style attributes
  cleaned = cleaned.replace(/\s+style\s*=\s*(['"])(\s*;*\s*)\1/gi, '');
  cleaned = cleaned.replace(/\s+style\s*=\s*(['"])\s*\1/gi, '');
  
  // Remove background HTML attributes
  cleaned = cleaned.replace(/\s+background\s*=\s*(['"][^'"]*?['"])/gi, '');
  
  // Remove bgcolor attribute (old HTML)
  cleaned = cleaned.replace(/\s+bgcolor\s*=\s*(['"][^'"]*?['"])/gi, '');
  
  return cleaned;
};

export const createPasteHandler = (onChange) => {
  return (e) => {
    e.preventDefault();
    try {
      // Get HTML first, fallback to plain text
      const html = e.clipboardData?.getData('text/html');
      const plainText = e.clipboardData?.getData('text/plain');
      
      const textToPaste = html || plainText;
      if (!textToPaste) return;
      
      // Strip background colors
      const cleanedText = stripBackgroundColors(textToPaste);
      
      // Insert into textarea or contentEditable
      const target = e.target;
      if (target.tagName === 'TEXTAREA') {
        // For textarea, insert as plain text
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const before = target.value.substring(0, start);
        const after = target.value.substring(end);
        const newText = plainText || textToPaste;
        target.value = before + newText + after;
        target.selectionStart = target.selectionEnd = start + newText.length;
        onChange && onChange(target.value);
      } else if (target.contentEditable === 'true') {
        // For contentEditable elements
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) {
          target.insertAdjacentHTML('beforeend', cleanedText);
        } else {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          try {
            const frag = range.createContextualFragment(cleanedText);
            range.insertNode(frag);
          } catch (err) {
            // Fallback to text insertion
            range.insertNode(document.createTextNode(cleanedText));
          }
        }
        onChange && onChange(target.innerHTML);
      }
    } catch (err) {
      console.error('Paste handler error:', err);
    }
  };
};

/**
 * Apply paste handler to all textareas and contentEditable elements in a container
 */
export const enablePasteFiltering = (containerRef, onChange) => {
  if (!containerRef) return;
  
  const container = typeof containerRef === 'object' ? containerRef.current : containerRef;
  if (!container) return;
  
  // Add handlers to all textareas
  const textareas = container.querySelectorAll('textarea');
  textareas.forEach((textarea) => {
    textarea.addEventListener('paste', createPasteHandler(onChange));
  });
  
  // Add handlers to all contentEditable elements
  const editables = container.querySelectorAll('[contenteditable="true"]');
  editables.forEach((editable) => {
    editable.addEventListener('paste', createPasteHandler(onChange));
  });
};
