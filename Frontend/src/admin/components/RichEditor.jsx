import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import API from '../../api/api';

const RichEditor = forwardRef(function RichEditor({ value = '', onChange }, refProp) {
  const ref = useRef(null);
  const fileRef = useRef(null);

  useImperativeHandle(refProp, () => ({
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
          } catch (e) {}
        }, 10);
      }
    },
    focus() {
      ref.current && ref.current.focus();
    }
  }));

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = (command, arg) => {
    document.execCommand(command, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const insertLink = () => {
    const url = window.prompt('Enter link URL');
    if (!url || !ref.current) return;

    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
      ref.current.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank" rel="noreferrer">Link text</a>`);
      onChange(ref.current.innerHTML);
      return;
    }

    const range = sel.getRangeAt(0);
    const selectedText = sel.toString();
    if (!selectedText) {
      range.deleteContents();
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.textContent = 'Link text';
      range.insertNode(anchor);
      onChange(ref.current.innerHTML);
      return;
    }

    document.execCommand('createLink', false, url);
    if (ref.current) onChange(ref.current.innerHTML);
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

  const insertButton = () => {
    const html = '<button class="fa-btn" type="button">Click</button>';
    if (ref.current) {
      ref.current.insertAdjacentHTML('beforeend', html);
      onChange(ref.current.innerHTML);
    }
  };

  const triggerImageUpload = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Prepare form data
    const form = new FormData();
    form.append('image', file);

    // Determine auth token if present
    const token = window.localStorage.getItem('token') || window.localStorage.getItem('authToken') || '';

    try {
      const res = await fetch(`${API.baseURL}/api/upload`, {
        method: 'POST',
        body: form,
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const json = await res.json();
      if (json && json.success && json.data && json.data.url) {
        const url = json.data.url;
        const html = `<img src="${url}" alt="Image" style="max-width:100%;height:auto;" />`;
        if (ref.current) {
          ref.current.insertAdjacentHTML('beforeend', html);
          onChange(ref.current.innerHTML);
        }
      } else {
        // fallback to prompt if upload failed
        const url = window.prompt('Upload failed. Enter image URL manually');
        if (url && ref.current) {
          ref.current.insertAdjacentHTML('beforeend', `<img src="${url}" alt="Image" style="max-width:100%;height:auto;" />`);
          onChange(ref.current.innerHTML);
        }
      }
    } catch (err) {
      console.error('Upload error', err);
      const url = window.prompt('Upload error. Enter image URL manually');
      if (url && ref.current) {
        ref.current.insertAdjacentHTML('beforeend', `<img src="${url}" alt="Image" style="max-width:100%;height:auto;" />`);
        onChange(ref.current.innerHTML);
      }
    } finally {
      // reset file input
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const insertList = (ordered = false) => {
    const tag = ordered ? 'ol' : 'ul';
    const html = `<${tag}><li>List item</li><li>List item</li></${tag}>`;
    if (ref.current) {
      ref.current.insertAdjacentHTML('beforeend', html);
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

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button type="button" onClick={() => exec('bold')} className="px-2 py-1 border rounded" data-testid="re-bold">B</button>
        <button type="button" onClick={() => exec('italic')} className="px-2 py-1 border rounded" data-testid="re-italic">I</button>
        <button type="button" onClick={insertLink} className="px-2 py-1 border rounded" data-testid="re-link">Link</button>
        <button type="button" onClick={() => exec('formatBlock', '<H2>')} className="px-2 py-1 border rounded" data-testid="re-h2">H2</button>
        <button type="button" onClick={() => exec('formatBlock', '<H3>')} className="px-2 py-1 border rounded" data-testid="re-h3">H3</button>
        <button type="button" onClick={() => exec('insertParagraph')} className="px-2 py-1 border rounded" data-testid="re-p">P</button>
        <button type="button" onClick={() => insertList(false)} className="px-2 py-1 border rounded" data-testid="re-ul">UL</button>
        <button type="button" onClick={() => insertList(true)} className="px-2 py-1 border rounded" data-testid="re-ol">OL</button>
        <button type="button" onClick={insertTable} className="px-2 py-1 border rounded" data-testid="re-table">Table</button>
        <button type="button" onClick={triggerImageUpload} className="px-2 py-1 border rounded" data-testid="re-image">Image</button>
        <button type="button" onClick={insertButton} className="px-2 py-1 border rounded" data-testid="re-button">Button</button>
        <button type="button" onClick={insertCard} className="px-2 py-1 border rounded" data-testid="re-card">Card</button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} data-testid="re-file-input" />
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-[120px] border rounded p-2 bg-white text-sm"
        style={{ whiteSpace: 'pre-wrap' }}
        data-testid="re-editor"
      />
    </div>
  );
});

export default RichEditor;
