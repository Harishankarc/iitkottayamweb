import ContentBlock from '../models/ContentBlock.js';
import { Op } from 'sequelize';
import { getLangFromHeader, translateRow } from '../utils/translation.js';

/**
 * Get all blocks for a specific page
 */
export const getBlocksByPage = async (req, res) => {
  try {
    const { pageName } = req.params;
    const { sectionName, blockType, isVisible } = req.query;
    const lang = getLangFromHeader(req);

    const whereClause = { pageName };
    
    if (sectionName) whereClause.sectionName = sectionName;
    if (blockType) whereClause.blockType = blockType;
    if (isVisible !== undefined) whereClause.isVisible = isVisible === 'true';

    const blocks = await ContentBlock.findAll({
      where: whereClause,
      order: [['blockOrder', 'ASC'], ['id', 'ASC']]
    });

    // Translate each block
    const translatedBlocks = await Promise.all(
      blocks.map(block => translateRow(
        'content_blocks',
        block.id,
        block.toJSON(),
        ['content', 'blockLabel', 'blockDescription'],
        lang
      ))
    );

    res.json({
      success: true,
      data: translatedBlocks
    });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching content blocks',
      error: error.message
    });
  }
};

/**
 * Get single block by ID
 */
export const getBlockById = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await ContentBlock.findByPk(id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found'
      });
    }

    res.json({
      success: true,
      data: block
    });
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching block',
      error: error.message
    });
  }
};

/**
 * Create new content block
 */
export const createBlock = async (req, res) => {
  try {
    const block = await ContentBlock.create(req.body);
    
    res.status(201).json({
      success: true,
      data: block,
      message: 'Block created successfully'
    });
  } catch (error) {
    console.error('Error creating block:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating block',
      error: error.message
    });
  }
};

/**
 * Update content block
 */
export const updateBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await ContentBlock.findByPk(id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found'
      });
    }

    await block.update(req.body);

    res.json({
      success: true,
      data: block,
      message: 'Block updated successfully'
    });
  } catch (error) {
    console.error('Error updating block:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating block',
      error: error.message
    });
  }
};

/**
 * Delete content block
 */
export const deleteBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await ContentBlock.findByPk(id);

    if (!block) {
      return res.status(404).json({
        success: false,
        message: 'Block not found'
      });
    }

    await block.destroy();

    res.json({
      success: true,
      message: 'Block deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting block:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting block',
      error: error.message
    });
  }
};

/**
 * Reorder blocks
 */
export const reorderBlocks = async (req, res) => {
  try {
    const { blocks } = req.body; // Array of { id, blockOrder }

    await Promise.all(
      blocks.map(({ id, blockOrder }) =>
        ContentBlock.update({ blockOrder }, { where: { id } })
      )
    );

    res.json({
      success: true,
      message: 'Blocks reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering blocks',
      error: error.message
    });
  }
};

/**
 * Clone/duplicate block
 */
export const cloneBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const originalBlock = await ContentBlock.findByPk(id);

    if (!originalBlock) {
      return res.status(404).json({
        success: false,
        message: 'Block not found'
      });
    }

    const blockData = originalBlock.toJSON();
    delete blockData.id;
    delete blockData.createdAt;
    delete blockData.updatedAt;
    
    blockData.blockId = `${blockData.blockId}-copy`;
    blockData.blockLabel = `${blockData.blockLabel || 'Block'} (Copy)`;
    blockData.blockOrder = blockData.blockOrder + 1;

    const newBlock = await ContentBlock.create(blockData);

    res.status(201).json({
      success: true,
      data: newBlock,
      message: 'Block cloned successfully'
    });
  } catch (error) {
    console.error('Error cloning block:', error);
    res.status(500).json({
      success: false,
      message: 'Error cloning block',
      error: error.message
    });
  }
};

/**
 * Get all blocks grouped by page and section
 */
export const getBlocksGrouped = async (req, res) => {
  try {
    const { navigationGroup } = req.query;
    
    let whereClause = {};
    if (navigationGroup) {
      // Get pages in this navigation group first
      const PageContent = (await import('../models/PageContent.js')).default;
      const pages = await PageContent.findAll({
        where: { category: navigationGroup },
        attributes: ['pageName']
      });
      const pageNames = pages.map(p => p.pageName);
      whereClause.pageName = { [Op.in]: pageNames };
    }

    const blocks = await ContentBlock.findAll({
      where: whereClause,
      order: [['pageName', 'ASC'], ['sectionName', 'ASC'], ['blockOrder', 'ASC']]
    });

    // Group by page and section
    const grouped = blocks.reduce((acc, block) => {
      const page = block.pageName;
      const section = block.sectionName || 'default';
      
      if (!acc[page]) acc[page] = {};
      if (!acc[page][section]) acc[page][section] = [];
      
      acc[page][section].push(block);
      return acc;
    }, {});

    res.json({
      success: true,
      data: grouped
    });
  } catch (error) {
    console.error('Error fetching grouped blocks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grouped blocks',
      error: error.message
    });
  }
};
