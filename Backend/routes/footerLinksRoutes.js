import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

// Get all footer links grouped by section (public)
router.get('/footer-links', async (req, res) => {
  try {
    const [links] = await db.query(
      'SELECT * FROM footer_links WHERE isVisible = true ORDER BY section, column_index, displayOrder ASC'
    );
    
    // Group links by section
    const grouped = links.reduce((acc, link) => {
      if (!acc[link.section]) {
        acc[link.section] = [];
      }
      acc[link.section].push(link);
      return acc;
    }, {});

    res.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    console.error('Error fetching footer links:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch footer links'
    });
  }
});

// Get all footer links including hidden ones (admin only)
router.get('/footer-links/all', protect, authorize('admin'), async (req, res) => {
  try {
    const [links] = await db.query(
      'SELECT * FROM footer_links ORDER BY section, column_index, displayOrder ASC'
    );
    
    // Group links by section
    const grouped = links.reduce((acc, link) => {
      if (!acc[link.section]) {
        acc[link.section] = [];
      }
      acc[link.section].push(link);
      return acc;
    }, {});

    res.json({
      success: true,
      data: grouped,
      flat: links // Also return flat array for easier editing
    });
  } catch (error) {
    console.error('Error fetching all footer links:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch footer links'
    });
  }
});

// Create new footer link (admin only)
router.post('/footer-links', protect, authorize('admin'), async (req, res) => {
  try {
    const { section, column_index, label, url, icon, displayOrder, isVisible, openInNewTab } = req.body;

    if (!section || !label || !url) {
      return res.status(400).json({
        success: false,
        error: 'Section, label, and URL are required'
      });
    }

    // Validate section
    const validSections = ['departments', 'reports', 'social', 'links', 'legal'];
    if (!validSections.includes(section)) {
      return res.status(400).json({
        success: false,
        error: `Invalid section. Must be one of: ${validSections.join(', ')}`
      });
    }

    const [result] = await db.query(
      `INSERT INTO footer_links 
       (section, column_index, label, url, icon, displayOrder, isVisible, openInNewTab) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        section,
        column_index || 0,
        label,
        url,
        icon || null,
        displayOrder || 0,
        isVisible !== false,
        openInNewTab || false
      ]
    );

    const [newLink] = await db.query(
      'SELECT * FROM footer_links WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newLink[0],
      message: 'Footer link created successfully'
    });
  } catch (error) {
    console.error('Error creating footer link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create footer link'
    });
  }
});

// Update footer link (admin only)
router.put('/footer-links/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { section, column_index, label, url, icon, displayOrder, isVisible, openInNewTab } = req.body;

    // Validate section if provided
    if (section) {
      const validSections = ['departments', 'reports', 'social', 'links', 'legal'];
      if (!validSections.includes(section)) {
        return res.status(400).json({
          success: false,
          error: `Invalid section. Must be one of: ${validSections.join(', ')}`
        });
      }
    }

    const [result] = await db.query(
      `UPDATE footer_links 
       SET section = ?, column_index = ?, label = ?, url = ?, icon = ?, 
           displayOrder = ?, isVisible = ?, openInNewTab = ?
       WHERE id = ?`,
      [
        section,
        column_index,
        label,
        url,
        icon,
        displayOrder,
        isVisible,
        openInNewTab,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Footer link not found'
      });
    }

    const [updatedLink] = await db.query(
      'SELECT * FROM footer_links WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: updatedLink[0],
      message: 'Footer link updated successfully'
    });
  } catch (error) {
    console.error('Error updating footer link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update footer link'
    });
  }
});

// Delete footer link (admin only)
router.delete('/footer-links/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM footer_links WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Footer link not found'
      });
    }

    res.json({
      success: true,
      message: 'Footer link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting footer link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete footer link'
    });
  }
});

// Toggle visibility (admin only)
router.patch('/footer-links/:id/toggle-visibility', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const [current] = await db.query(
      'SELECT isVisible FROM footer_links WHERE id = ?',
      [id]
    );

    if (current.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Footer link not found'
      });
    }

    const newVisibility = !current[0].isVisible;

    await db.query(
      'UPDATE footer_links SET isVisible = ? WHERE id = ?',
      [newVisibility, id]
    );

    const [updated] = await db.query(
      'SELECT * FROM footer_links WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: updated[0],
      message: `Footer link ${newVisibility ? 'shown' : 'hidden'} successfully`
    });
  } catch (error) {
    console.error('Error toggling visibility:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle visibility'
    });
  }
});

export default router;
