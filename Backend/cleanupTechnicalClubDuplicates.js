import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function cleanupDuplicates() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    console.log('Cleaning up duplicate blocks for technical-club page...\n');

    // Get all blocks for technical-club
    const [blocks] = await connection.execute(
      'SELECT id, blockId, blockType, blockLabel FROM content_blocks WHERE pageName = ? ORDER BY id ASC',
      ['technical-club']
    );

    console.log(`Found ${blocks.length} total blocks\n`);

    // Track which blockIds we've seen
    const seen = new Set();
    const toDelete = [];

    for (const block of blocks) {
      const key = block.blockId;
      
      if (seen.has(key)) {
        // This is a duplicate
        toDelete.push(block.id);
        console.log(`Marking for deletion: ID ${block.id} - ${block.blockId} (${block.blockType})`);
      } else {
        seen.add(key);
        console.log(`Keeping: ID ${block.id} - ${block.blockId} (${block.blockType})`);
      }
    }

    if (toDelete.length > 0) {
      console.log(`\nDeleting ${toDelete.length} duplicate blocks...`);
      
      for (const id of toDelete) {
        await connection.execute('DELETE FROM content_blocks WHERE id = ?', [id]);
      }
      
      console.log('✅ Duplicates removed successfully!');
    } else {
      console.log('No duplicates found.');
    }

    // Show final count
    const [finalBlocks] = await connection.execute(
      'SELECT COUNT(*) as count FROM content_blocks WHERE pageName = ?',
      ['technical-club']
    );
    
    console.log(`\nFinal block count: ${finalBlocks[0].count}`);

  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
  } finally {
    await connection.end();
  }
}

cleanupDuplicates();
