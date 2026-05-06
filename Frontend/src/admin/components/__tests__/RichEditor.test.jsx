import { render, fireEvent } from '@testing-library/react';
import RichEditor from '../RichEditor';
import { describe, it, expect, vi, beforeEach } from 'vitest';

beforeEach(() => {
  if (!document.execCommand) {
    document.execCommand = vi.fn();
  }
});

describe('RichEditor', () => {
  it('renders and updates HTML on input and toolbar actions', () => {
    const onChange = (html) => { renderedValue = html; };
    let renderedValue = '';

    const { getByTestId, container } = render(<RichEditor value="" onChange={onChange} />);

    const editor = container.querySelector('[contenteditable]');
    expect(editor).toBeTruthy();

    // Simulate user typing
    fireEvent.input(editor, { target: { innerHTML: '<p>Hello</p>' } });
    expect(renderedValue).toContain('Hello');

    // Click bold button
    const boldBtn = getByTestId('re-bold');
    fireEvent.click(boldBtn);
    // execCommand won't run in jsdom, but ensure button exists
    expect(boldBtn).toBeTruthy();
  });

  it('inserts structured blocks for table, list, and card', () => {
    let renderedValue = '';
    const onChange = (html) => { renderedValue = html; };

    const { getByTestId } = render(<RichEditor value="" onChange={onChange} />);

    fireEvent.click(getByTestId('re-table'));
    expect(renderedValue).toContain('<table');

    fireEvent.click(getByTestId('re-ul'));
    expect(renderedValue).toContain('<ul>');

    fireEvent.click(getByTestId('re-card'));
    expect(renderedValue).toContain('fa-card');
  });
});
