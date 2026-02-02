import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import db from '../config/database.js';

const router = express.Router();

// Get all navbar links (public)
router.get('/navbar-links', async (req, res) => {
  try {
    const [links] = await db.query(
      'SELECT * FROM navbar_links WHERE isVisible = true ORDER BY displayOrder ASC'
    );
    
    res.json({
      success: true,
      data: links
    });
  } catch (error) {
    console.error('Error fetching navbar links:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch navbar links'
    });
  }
});

// Get all navbar links including hidden ones (admin only)
router.get('/navbar-links/all', protect, authorize('admin'), async (req, res) => {
  try {
    const [links] = await db.query(
      'SELECT * FROM navbar_links ORDER BY displayOrder ASC'
    );
    
    res.json({
      success: true,
      data: links
    });
  } catch (error) {
    console.error('Error fetching all navbar links:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch navbar links'
    });
  }
});

// Create new navbar link (admin only)
router.post('/navbar-links', protect, authorize('admin'), async (req, res) => {
  try {
    const { label, url, displayOrder, isVisible, openInNewTab, showOnMobile, showOnTablet, showOnDesktop } = req.body;

    if (!label || !url) {
      return res.status(400).json({
        success: false,
        error: 'Label and URL are required'
      });
    }

    const [result] = await db.query(
      `INSERT INTO navbar_links 
       (label, url, displayOrder, isVisible, openInNewTab, showOnMobile, showOnTablet, showOnDesktop) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        label,
        url,
        displayOrder || 0,
        isVisible !== false,
        openInNewTab || false,
        showOnMobile !== false,
        showOnTablet !== false,
        showOnDesktop !== false
      ]
    );

    const [newLink] = await db.query(
      'SELECT * FROM navbar_links WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      data: newLink[0],
      message: 'Navbar link created successfully'
    });
  } catch (error) {
    console.error('Error creating navbar link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create navbar link'
    });
  }
});

// Update navbar link (admin only)
router.put('/navbar-links/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { label, url, displayOrder, isVisible, openInNewTab, showOnMobile, showOnTablet, showOnDesktop } = req.body;

    const [result] = await db.query(
      `UPDATE navbar_links 
       SET label = ?, url = ?, displayOrder = ?, isVisible = ?, 
           openInNewTab = ?, showOnMobile = ?, showOnTablet = ?, showOnDesktop = ?
       WHERE id = ?`,
      [
        label,
        url,
        displayOrder,
        isVisible,
        openInNewTab,
        showOnMobile,
        showOnTablet,
        showOnDesktop,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Navbar link not found'
      });
    }

    const [updatedLink] = await db.query(
      'SELECT * FROM navbar_links WHERE id = ?',
      [id]
    );

    res.json({
      success: true,
      data: updatedLink[0],
      message: 'Navbar link updated successfully'
    });
  } catch (error) {
    console.error('Error updating navbar link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update navbar link'
    });
  }
});

// Delete navbar link (admin only)
router.delete('/navbar-links/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      'DELETE FROM navbar_links WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Navbar link not found'
      });
    }

    res.json({
      success: true,
      message: 'Navbar link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting navbar link:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete navbar link'
    });
  }
});

// Reorder navbar links (admin only)
router.post('/navbar-links/reorder', protect, authorize('admin'), async (req, res) => {
  try {
    const { links } = req.body; // Array of {id, displayOrder}

    if (!Array.isArray(links)) {
      return res.status(400).json({
        success: false,
        error: 'Links array is required'
      });
    }

    // Update display order for each link
    for (const link of links) {
      await db.query(
        'UPDATE navbar_links SET displayOrder = ? WHERE id = ?',
        [link.displayOrder, link.id]
      );
    }

    res.json({
      success: true,
      message: 'Navbar links reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering navbar links:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reorder navbar links'
    });
  }
});

export default router;
