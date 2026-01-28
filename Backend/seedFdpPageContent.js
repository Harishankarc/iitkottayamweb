import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'iiitkottayam',
  port: 3306
};

const fdpPageBlocks = [
  {
    pageName: 'fdp',
    blockType: 'hero',
    blockLabel: 'Page Header',
    content: {
      title: 'IIIT Kottayam Faculty Development Programmes/Workshops/Webinar',
      description: 'Professional development initiatives to enhance teaching methodologies and research capabilities'
    },
    isVisible: true,
    blockOrder: 0
  }
];

async function seedFdpPageContent() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Clearing existing FDP page content blocks...');
    await connection.execute('DELETE FROM content_blocks WHERE pageName = ?', ['fdp']);
    
    console.log('Inserting FDP page content blocks...');
    for (const block of fdpPageBlocks) {
      await connection.execute(
        `INSERT INTO content_blocks (pageName, blockType, blockLabel, content, isVisible, blockOrder)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          block.pageName,
          block.blockType,
          block.blockLabel,
          JSON.stringify(block.content),
          block.isVisible,
          block.blockOrder
        ]
      );
    }
    
    console.log(`✅ Successfully seeded ${fdpPageBlocks.length} content blocks for FDP page`);
  } catch (error) {
    console.error('❌ Error seeding FDP page content:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedFdpPageContent();
