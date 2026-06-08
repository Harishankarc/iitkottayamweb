import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import API from '../../api/api';

const RichEditor = forwardRef(function RichEditor({ value = '', onChange, showToolbar = true }, refProp) {
  const ref = useRef(null);
  const savedSelection = useRef(null);

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (!sel) return;
    // If the browser already has an active range (user selection still present), keep it.
    if (sel.rangeCount && sel.rangeCount > 0) return;
    if (!savedSelection.current) return;
    try {
      sel.removeAllRanges();
      sel.addRange(savedSelection.current);
    } catch (e) {
      // ignore invalid ranges
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    try {
      const r = sel.getRangeAt(0).cloneRange();
      // lightweight debug info to help trace reversed-typing issues
      try {
        const cs = ref.current && window.getComputedStyle(ref.current);
        // eslint-disable-next-line no-console
        console.debug('RichEditor.saveSelection', { startContainer: r.startContainer.nodeName, startOffset: r.startOffset, endContainer: r.endContainer.nodeName, endOffset: r.endOffset, direction: cs && cs.direction, unicodeBidi: cs && cs.unicodeBidi, transform: cs && cs.transform });
      } catch (e) { }
      savedSelection.current = r;
    } catch (e) {
      // ignore
    }
  };

  useImperativeHandle(refProp, () => ({
    applyInlineFormat(tagName) {
      applyInlineFormat(tagName);
    },
    insertHtml(html) {
      if (!ref.current) return;
      try {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) {
          ref.current.insertAdjacentHTML('beforeend', html);
        } else {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const frag = range.createContextualFragment(html);
          range.insertNode(frag);
        }
        onChange && onChange(ref.current.innerHTML);
        // ensure the inserted content is visible and the editor is focused
        setTimeout(() => {
          try {
            // scroll to the last element
            const lastEl = ref.current.lastElementChild || ref.current.lastChild;
            if (lastEl && typeof lastEl.scrollIntoView === 'function') lastEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // place caret at end
            const range2 = document.createRange();
            range2.selectNodeContents(ref.current);
            range2.collapse(false);
            const s2 = window.getSelection();
            s2.removeAllRanges();
            s2.addRange(range2);
            ref.current.focus && ref.current.focus();
          } catch (e) {
            // ignore
          }
        }, 10);
      } catch (err) {
        ref.current.insertAdjacentHTML('beforeend', html);
        onChange && onChange(ref.current.innerHTML);
        setTimeout(() => {
          try {
            const lastEl = ref.current.lastElementChild || ref.current.lastChild;
            if (lastEl && typeof lastEl.scrollIntoView === 'function') lastEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const range2 = document.createRange();
            range2.selectNodeContents(ref.current);
            range2.collapse(false);
            const s2 = window.getSelection();
            s2.removeAllRanges();
            s2.addRange(range2);
            ref.current.focus && ref.current.focus();
          } catch (e) { }
        }, 10);
      }
    },
    exec(command, arg) {
      if (ref.current) {
        if (command === 'bold' || command === 'italic' || command === 'underline') {
          applyInlineFormat(command === 'bold' ? 'strong' : command === 'italic' ? 'em' : 'u');
          return;
        }

        // ensure editor retains focus but don't force a focus call that may alter selection
        try { ref.current.focus && ref.current.focus(); } catch (e) { }
        // If there's already a browser selection use it, otherwise restore a previously saved selection
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) restoreSelection();
        // debug around execCommand
        try {
          const cs = ref.current && window.getComputedStyle(ref.current);
          // eslint-disable-next-line no-console
          console.debug('RichEditor.exec (imperative)', { command, arg, direction: cs && cs.direction, unicodeBidi: cs && cs.unicodeBidi });
        } catch (e) { }
        document.execCommand(command, false, arg);
        onChange && onChange(ref.current.innerHTML);
      }
    },
    insertLink(url) {
      if (!ref.current) return;
      const actualUrl = normalizeUrl(url || window.prompt('Enter link URL'));
      if (!actualUrl) return;
      wrapSelectionWithLink(actualUrl);
    },
    insertList(ordered = false) {
      wrapSelectionWithList(ordered);
    },
    focus() {
      ref.current && ref.current.focus();
    },
    setContent(html) {
      if (!ref.current) return;
      ref.current.innerHTML = html || '';
      onChange && onChange(ref.current.innerHTML);
    }
  }));

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command, arg) => {
    if (ref.current) {
      try { ref.current.focus && ref.current.focus(); } catch (e) { }
      try {
        const cs = ref.current && window.getComputedStyle(ref.current);
        // eslint-disable-next-line no-console
        console.debug('RichEditor.exec', { command, arg, direction: cs && cs.direction, unicodeBidi: cs && cs.unicodeBidi });
      } catch (e) { }
      document.execCommand(command, false, arg);
      onChange && onChange(ref.current.innerHTML);
    }
  };

  // Apply an inline formatting by wrapping the current selection with a tag (e.g. strong, em, u)
  const applyInlineFormat = (tagName) => {
    if (!ref.current) return;
    // Prefer live selection; otherwise restore a saved selection
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) restoreSelection();
    const s2 = window.getSelection();
    if (!s2 || !s2.rangeCount) return;
    const range = s2.getRangeAt(0);
    if (range.collapsed) return; // nothing selected

    try {
      // Extract contents and wrap
      const extracted = range.extractContents();
      const wrapper = document.createElement(tagName);
      wrapper.setAttribute('dir', 'ltr');
      wrapper.style.direction = 'ltr';
      wrapper.style.unicodeBidi = 'isolate';
      wrapper.appendChild(extracted);
      range.insertNode(wrapper);

      // reselect the newly inserted node
      const newRange = document.createRange();
      newRange.selectNodeContents(wrapper);
      newRange.collapse(false);
      s2.removeAllRanges();
      s2.addRange(newRange);

      onChange && onChange(ref.current.innerHTML);
    } catch (err) {
      // Fallback to execCommand if DOM manipulation fails
      try { document.execCommand(tagName === 'strong' ? 'bold' : tagName === 'em' ? 'italic' : 'underline', false); } catch (e) { }
      onChange && onChange(ref.current.innerHTML);
    }
  };

  const getActiveRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) return sel.getRangeAt(0);
    restoreSelection();
    const restored = window.getSelection();
    return restored && restored.rangeCount ? restored.getRangeAt(0) : null;
  };

  const placeCaretAfterNode = (node) => {
    if (!node) return;
    const sel = window.getSelection();
    if (!sel) return;
    const range = document.createRange();
    range.setStartAfter(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const wrapSelectionWithLink = (href) => {
    if (!ref.current) return;
    const range = getActiveRange();
    if (!range) return;

    try {
      const extracted = range.extractContents();
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.setAttribute('dir', 'ltr');
      anchor.style.direction = 'ltr';
      anchor.style.unicodeBidi = 'isolate';
      if (extracted && extracted.childNodes && extracted.childNodes.length > 0) {
        anchor.appendChild(extracted);
      } else {
        anchor.textContent = href;
      }
      range.insertNode(anchor);
      placeCaretAfterNode(anchor);
      onChange && onChange(ref.current.innerHTML);
    } catch (e) {
      try { document.execCommand('createLink', false, href); } catch (err) { }
      onChange && onChange(ref.current.innerHTML);
    }
  };

  const wrapSelectionWithList = (ordered = false) => {
    if (!ref.current) return;
    const range = getActiveRange();
    if (!range) return;

    try {
      const extracted = range.extractContents();
      const list = document.createElement(ordered ? 'ol' : 'ul');
      list.setAttribute('dir', 'ltr');
      list.style.direction = 'ltr';
      list.style.unicodeBidi = 'isolate';
      const li = document.createElement('li');
      li.setAttribute('dir', 'ltr');
      li.style.direction = 'ltr';
      li.style.unicodeBidi = 'isolate';
      li.appendChild(extracted);
      list.appendChild(li);
      range.insertNode(list);
      placeCaretAfterNode(list);
      onChange && onChange(ref.current.innerHTML);
    } catch (e) {
      try { document.execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList', false); } catch (err) { }
      onChange && onChange(ref.current.innerHTML);
    }
  };

  const normalizeUrl = (rawUrl) => {
    if (!rawUrl) return '';
    const trimmed = rawUrl.trim();
    if (!trimmed) return '';
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
    return hasScheme ? trimmed : `https://${trimmed}`;
  };

  const insertLink = (url) => {
    const actualUrl = normalizeUrl(url || window.prompt('Enter link URL'));
    if (!actualUrl || !ref.current) return;
    wrapSelectionWithLink(actualUrl);
  };

  const insertTable = () => {
    const html = '<table class="fa-table" border="1" cellpadding="4"><tr><th>Header</th><th>Header</th></tr><tr><td>Cell</td><td>Cell</td></tr></table>';
    if (ref.current) {
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) {
        ref.current.insertAdjacentHTML('beforeend', html);
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        const frag = range.createContextualFragment(html);
        range.insertNode(frag);
      }
      onChange(ref.current.innerHTML);
    }
  };

  const insertCard = () => {
    const html = `<div class="fa-card" style="border:1px solid #e5e7eb;padding:12px;border-radius:8px;display:flex;gap:12px;align-items:center;"><img src="/images/placeholder.png" alt="" style="width:64px;height:64px;object-fit:cover;border-radius:6px;"/><div><h4 style="margin:0 0 6px 0;font-weight:700;">Card Title</h4><p style="margin:0;color:#374151;">Card description goes here.</p></div></div>`;
    if (ref.current) {
      ref.current.insertAdjacentHTML('beforeend', html);
      onChange(ref.current.innerHTML);
    }
  };

  const escapeTextContent = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const stripBackgroundColorsFromPasted = (html) => {
    if (!html) return html;
    let cleaned = html;
    // Remove style attributes containing background-color or backgroundColor
    cleaned = cleaned.replace(/\s*style\s*=\s*(['"])([^'"]*?)(background-color|backgroundColor)[^'"]*?\1/gi, '');
    // Remove background HTML attribute
    cleaned = cleaned.replace(/\s+background\s*=\s*(['"][^'"]*?['"])/gi, '');
    // Remove bgcolor attribute
    cleaned = cleaned.replace(/\s+bgcolor\s*=\s*(['"][^'"]*?['"])/gi, '');
    return cleaned;
  };

  const handlePaste = (e) => {
    e.preventDefault();
    try {
      const textData = e.clipboardData?.getData('text/plain');
      const htmlData = e.clipboardData?.getData('text/html');
      if (!textData && !htmlData) return;

      let cleanedHtml = '';
      if (textData) {
        const normalizedText = String(textData).replace(/\r\n/g, '\n');
        cleanedHtml = normalizedText
          .split('\n')
          .map((line) => line === '' ? '<div><br/></div>' : `<div>${escapeTextContent(line)}</div>`)
          .join('');
      } else {
        cleanedHtml = stripBackgroundColorsFromPasted(htmlData || '');
      }

      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) {
        ref.current.insertAdjacentHTML('beforeend', cleanedHtml);
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        try {
          const frag = range.createContextualFragment(cleanedHtml);
          range.insertNode(frag);
        } catch (err) {
          range.insertNode(document.createTextNode((textData || '').replace(/\r\n/g, '\n')));
        }
      }

      setTimeout(() => {
        onChange && onChange(ref.current.innerHTML);
      }, 0);
    } catch (err) {
      console.error('Paste error:', err);
    }
  };

  return (
    <div>
      {showToolbar && (
        <div className="mb-2 flex flex-wrap gap-2">
          <button type="button" onMouseDown={(e) => { e.preventDefault(); applyInlineFormat('strong'); }} className="px-2 py-1 border rounded" data-testid="re-bold">B</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); applyInlineFormat('em'); }} className="px-2 py-1 border rounded" data-testid="re-italic">I</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); applyInlineFormat('u'); }} className="px-2 py-1 border rounded" data-testid="re-underline">U</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); insertLink(); }} className="px-2 py-1 border rounded" data-testid="re-link">Link</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); insertList(false); }} className="px-2 py-1 border rounded" data-testid="re-ul">UL</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); insertList(true); }} className="px-2 py-1 border rounded" data-testid="re-ol">OL</button>
        </div>
      )}
      <div
        ref={ref}
        contentEditable
        dir="ltr"
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onFocus={saveSelection}
        onPaste={handlePaste}
        className="min-h-[120px] border rounded p-2 bg-white text-sm content-html"
        style={{ whiteSpace: 'pre-wrap', direction: 'ltr', unicodeBidi: 'isolate' }}
        data-testid="re-editor"
      />
    </div>
  );
});

export default RichEditor;
