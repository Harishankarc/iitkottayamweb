import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ManageFaculty from '../ManageFaculty';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('ManageFaculty', () => {
  it('toggles advanced editor and submits HTML payload', async () => {
    localStorage.setItem('token', 'test-token');
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: [] }) });

    const { getByText } = render(
      <BrowserRouter>
        <ManageFaculty />
      </BrowserRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Open Add modal
    const addBtn = getByText('Add Faculty');
    fireEvent.click(addBtn);

    // Fill required fields (Name and Designation)
    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Test Name' } });
    fireEvent.change(screen.getByLabelText('Designation *'), { target: { value: 'Professor' } });

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    const useHtmlCheckbox = await screen.findByLabelText('Use advanced editor');
    fireEvent.click(useHtmlCheckbox);

    // Verify blocks list displays (initially empty)
    expect(screen.getByText(/No blocks added yet/i)).toBeTruthy();

    // Add a block by selecting Paragraph from the block type dropdown
    fireEvent.change(screen.getByLabelText('Block Type'), { target: { value: 'paragraph' } });

    fireEvent.change(screen.getByPlaceholderText('Paragraph text'), { target: { value: 'Custom paragraph content' } });
    fireEvent.click(getByText('Add Block'));

    await waitFor(() => {
      expect(screen.queryByText(/No blocks added yet/i)).toBeFalsy();
    });

    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(getByText('Create'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));

    const submitCall = fetch.mock.calls[1];
    const submitOptions = submitCall[1] || {};
    expect(submitOptions.method).toBe('POST');
    const payload = JSON.parse(submitOptions.body);
    expect(payload.fullDetailsHtml).toBeTruthy();
    expect(Array.isArray(payload.fullDetails)).toBe(true);
  });

  it('shows plain textarea when advanced editor is off', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ data: [] }) });
    render(
      <BrowserRouter>
        <ManageFaculty />
      </BrowserRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText('Add Faculty'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByPlaceholderText(/\*\*Education\*\*/i)).toBeTruthy();
  });
});
