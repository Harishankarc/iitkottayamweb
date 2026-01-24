import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function copyContentBlocksToPageContents() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iitkottayam'
  });

  try {
    console.log('🔄 Starting to copy content_blocks to page_contents...\n');

    // Get all unique page names from content_blocks
    const [pages] = await connection.query(`
      SELECT DISTINCT pageName FROM content_blocks ORDER BY pageName
    `);

    console.log(`📄 Found ${pages.length} unique pages in content_blocks\n`);

    for (const page of pages) {
      const pageName = page.pageName;
      console.log(`\n📝 Processing page: ${pageName}`);

      // Get all content blocks for this page
      const [blocks] = await connection.query(`
        SELECT * FROM content_blocks WHERE pageName = ? ORDER BY blockOrder, id
      `, [pageName]);

      console.log(`   Found ${blocks.length} blocks`);

      // Check if page already exists in page_contents
      const [existing] = await connection.query(`
        SELECT id FROM page_contents WHERE pageName = ?
      `, [pageName]);

      if (existing.length > 0) {
        console.log(`   ⚠️  Page already exists in page_contents, updating...`);
        
        // Update the existing page with blocks as sections
        const sections = blocks.map(block => ({
          id: block.blockId,
          type: block.blockType,
          content: block.content,
          styling: typeof block.styling === 'string' ? JSON.parse(block.styling) : block.styling,
          layout: typeof block.layout === 'string' ? JSON.parse(block.layout) : block.layout,
          responsive: typeof block.responsive === 'string' ? JSON.parse(block.responsive) : block.responsive,
          animation: typeof block.animation === 'string' ? JSON.parse(block.animation) : block.animation,
          order: block.blockOrder,
          isVisible: block.isVisible
        }));

        await connection.query(`
          UPDATE page_contents 
          SET sections = ?, updatedAt = NOW()
          WHERE pageName = ?
        `, [JSON.stringify(sections), pageName]);

        console.log(`   ✅ Updated page_contents with ${sections.length} sections`);
      } else {
        console.log(`   ➕ Creating new page in page_contents...`);
        
        // Create new page entry
        const sections = blocks.map(block => ({
          id: block.blockId,
          type: block.blockType,
          content: block.content,
          styling: typeof block.styling === 'string' ? JSON.parse(block.styling) : block.styling,
          layout: typeof block.layout === 'string' ? JSON.parse(block.layout) : block.layout,
          responsive: typeof block.responsive === 'string' ? JSON.parse(block.responsive) : block.responsive,
          animation: typeof block.animation === 'string' ? JSON.parse(block.animation) : block.animation,
          order: block.blockOrder,
          isVisible: block.isVisible
        }));

        // Get first block for hero section if it's a hero type
        const heroBlock = blocks.find(b => b.blockType === 'hero');
        const heroContent = heroBlock && typeof heroBlock.content === 'string' 
          ? JSON.parse(heroBlock.content) 
          : heroBlock?.content || {};
        
        await connection.query(`
          INSERT INTO page_contents 
          (pageName, pageTitle, pageSlug, category, heroImage, heroTitle, heroSubtitle, sections, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
          pageName,
          heroContent?.title || pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          pageName,
          pageName.split('-')[0] || 'general',
          heroContent?.image || null,
          heroContent?.title || null,
          heroContent?.subtitle || null,
          JSON.stringify(sections)
        ]);

        console.log(`   ✅ Created new page_contents with ${sections.length} sections`);
      }
    }

    console.log('\n\n✅ Successfully copied all content_blocks to page_contents!');
    console.log(`📊 Total pages processed: ${pages.length}`);

    // Show summary
    const [contentBlocksCount] = await connection.query('SELECT COUNT(*) as count FROM content_blocks');
    const [pageContentsCount] = await connection.query('SELECT COUNT(*) as count FROM page_contents');
    
    console.log(`\n📈 Summary:`);
    console.log(`   - content_blocks table: ${contentBlocksCount[0].count} blocks`);
    console.log(`   - page_contents table: ${pageContentsCount[0].count} pages`);

  } catch (error) {
    console.error('❌ Error copying content blocks:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run the script
copyContentBlocksToPageContents()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
