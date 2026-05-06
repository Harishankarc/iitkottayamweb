import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RichEditor from '../RichEditor';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('RichEditor upload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uploads file and inserts img tag', async () => {
    const mockResponse = { success: true, data: { url: '/uploads/test-image.jpg' } };
    fetch.mockResolvedValueOnce({ json: async () => mockResponse, ok: true });

    const onChange = vi.fn();
    const { container, getByTestId } = render(<RichEditor onChange={onChange} />);

    fireEvent.click(getByTestId('re-image'));

    // Find hidden file input
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();

    // Create a fake file
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    // Simulate file selection
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    // onChange should be called with updated HTML containing img src
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
      const html = onChange.mock.calls[onChange.mock.calls.length - 1][0];
      expect(html).toContain('img');
      expect(html).toContain('/uploads/test-image.jpg');
    });
  });
});
