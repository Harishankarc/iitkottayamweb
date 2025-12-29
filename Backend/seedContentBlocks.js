import sequelize from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedContentBlocks = async () => {
  try {
    console.log('🎨 Seeding Content Blocks with Design System...\n');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced\n');

    // =============================================
    // HOMEPAGE BLOCKS - Component-Based Design
    // =============================================

    // 1. Hero Section Block
    await ContentBlock.create({
      blockId: 'homepage-hero',
      pageName: 'homepage',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Main Hero Banner',
      content: {
        title: 'Welcome to IIIT Kottayam',
        subtitle: 'Generating knowledge for the future through research and innovation',
        description: 'Premier technical institution in Kerala',
        backgroundImage: '/images/campus-hero.jpg',
        buttons: [
          { text: 'Explore Programs', link: '/course/btech-cse', type: 'primary' },
          { text: 'Apply Now', link: '/institute/admission', type: 'secondary' }
        ]
      },
      styling: {
        backgroundColor: 'linear-gradient(135deg, #239244, #1a7a36)',
        textColor: '#ffffff',
        titleFontSize: '48px',
        subtitleFontSize: '24px',
        padding: '100px 20px',
        textAlign: 'center',
        overlay: 'rgba(0, 0, 0, 0.4)'
      },
      layout: {
        height: '600px',
        contentPosition: 'center',
        fullWidth: true
      },
      responsive: {
        mobile: {
          titleFontSize: '32px',
          subtitleFontSize: '18px',
          padding: '60px 15px',
          height: '400px'
        }
      },
      animation: {
        type: 'fadeIn',
        duration: '1s',
        delay: '0.2s'
      },
      blockOrder: 1,
      isVisible: true
    });

    // 2. Vision Section Block
    await ContentBlock.create({
      blockId: 'homepage-vision',
      pageName: 'homepage',
      sectionName: 'about',
      blockType: 'card',
      blockLabel: 'Vision Statement Card',
      content: {
        icon: '🎯',
        title: 'Our Vision',
        text: '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.',
        link: '/institute/governance',
        linkText: 'Read Strategic Plan →'
      },
      styling: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e8f5f0',
        iconSize: '48px'
      },
      layout: {
        width: '50%',
        float: 'left',
        margin: '20px 0'
      },
      responsive: {
        mobile: {
          width: '100%',
          float: 'none',
          padding: '30px 20px'
        }
      },
      blockOrder: 2,
      isVisible: true
    });

    // 3. Mission Section Block
    await ContentBlock.create({
      blockId: 'homepage-mission',
      pageName: 'homepage',
      sectionName: 'about',
      blockType: 'list',
      blockLabel: 'Mission Points List',
      content: {
        icon: '🎯',
        title: 'Our Mission',
        listStyle: 'bullet',
        items: [
          'Produce competent and ethical graduates.',
          'Solve local & global problems through technology.',
          'Promote significance of ethics and integrity.'
        ]
      },
      styling: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e8f5f0',
        listItemSpacing: '15px',
        bulletColor: '#239244'
      },
      layout: {
        width: '50%',
        float: 'right',
        margin: '20px 0'
      },
      responsive: {
        mobile: {
          width: '100%',
          float: 'none',
          padding: '30px 20px'
        }
      },
      blockOrder: 3,
      isVisible: true
    });

    // 4. Placement Statistics Block
    await ContentBlock.create({
      blockId: 'homepage-placement-stats',
      pageName: 'homepage',
      sectionName: 'highlights',
      blockType: 'statistics',
      blockLabel: 'Placement Statistics Grid',
      content: {
        title: 'Placement Highlights',
        stats: [
          {
            label: 'Highest Package',
            value: '45 LPA',
            icon: '💰',
            color: '#239244'
          },
          {
            label: 'Average Package',
            value: '14 LPA',
            icon: '📊',
            color: '#1a7a36'
          },
          {
            label: 'Companies Visited',
            value: '100+',
            icon: '🏢',
            color: '#239244'
          },
          {
            label: 'Placement Rate',
            value: '95%',
            icon: '📈',
            color: '#1a7a36'
          }
        ]
      },
      styling: {
        backgroundColor: '#f8faf9',
        borderRadius: '16px',
        padding: '50px 30px',
        gridGap: '30px'
      },
      layout: {
        display: 'grid',
        gridColumns: '4',
        fullWidth: true,
        maxWidth: '1200px',
        margin: '40px auto'
      },
      responsive: {
        tablet: { gridColumns: '2' },
        mobile: { gridColumns: '1' }
      },
      blockOrder: 4,
      isVisible: true
    });

    // 5. Image Block (Campus Photo)
    await ContentBlock.create({
      blockId: 'homepage-campus-image',
      pageName: 'homepage',
      sectionName: 'gallery',
      blockType: 'image',
      blockLabel: 'Campus Overview Image',
      content: {
        src: '/images/campus-overview.jpg',
        alt: 'IIIT Kottayam Campus',
        caption: 'Our state-of-the-art campus facilities',
        link: '/facilities/campus'
      },
      styling: {
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
        border: '3px solid #e8f5f0'
      },
      layout: {
        width: '100%',
        maxWidth: '1200px',
        margin: '40px auto',
        aspectRatio: '16:9',
        objectFit: 'cover'
      },
      responsive: {
        mobile: {
          margin: '20px auto',
          borderRadius: '8px'
        }
      },
      animation: {
        type: 'zoomIn',
        trigger: 'scroll',
        duration: '0.8s'
      },
      blockOrder: 5,
      isVisible: true
    });

    console.log('✅ Homepage blocks seeded\n');

    // =============================================
    // ADMISSION PAGE BLOCKS
    // =============================================

    await ContentBlock.create({
      blockId: 'admission-hero',
      pageName: 'admission',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Admission Hero',
      content: {
        title: 'Join IIIT Kottayam',
        subtitle: 'Admissions Open for 2025-26',
        backgroundImage: '/images/admission-bg.jpg'
      },
      styling: {
        backgroundColor: '#239244',
        textColor: '#ffffff',
        height: '400px',
        padding: '80px 20px'
      },
      layout: {
        fullWidth: true,
        textAlign: 'center'
      },
      blockOrder: 1,
      isVisible: true
    });

    await ContentBlock.create({
      blockId: 'admission-programs',
      pageName: 'admission',
      sectionName: 'programs',
      blockType: 'card',
      blockLabel: 'Available Programs',
      content: {
        title: 'Available Programs',
        cards: [
          {
            title: 'B.Tech CSE',
            description: '4-year undergraduate program',
            icon: '💻',
            link: '/course/btech-cse'
          },
          {
            title: 'B.Tech ECE',
            description: '4-year undergraduate program',
            icon: '📡',
            link: '/course/btech-ece'
          }
        ]
      },
      styling: {
        cardGap: '30px',
        cardPadding: '30px',
        cardBackground: '#ffffff',
        cardBorderRadius: '12px'
      },
      layout: {
        display: 'grid',
        gridColumns: '2',
        maxWidth: '1000px',
        margin: '40px auto'
      },
      responsive: {
        mobile: { gridColumns: '1' }
      },
      blockOrder: 2,
      isVisible: true
    });

    await ContentBlock.create({
      blockId: 'admission-timeline',
      pageName: 'admission',
      sectionName: 'process',
      blockType: 'accordion',
      blockLabel: 'Admission Timeline',
      content: {
        title: 'Important Dates',
        items: [
          {
            title: 'Application Opens',
            content: 'March 1, 2025',
            icon: '📅'
          },
          {
            title: 'Application Deadline',
            content: 'May 31, 2025',
            icon: '⏰'
          },
          {
            title: 'Entrance Exam',
            content: 'June 15, 2025',
            icon: '📝'
          }
        ]
      },
      styling: {
        backgroundColor: '#f8faf9',
        borderRadius: '12px',
        padding: '40px'
      },
      layout: {
        maxWidth: '800px',
        margin: '40px auto'
      },
      blockOrder: 3,
      isVisible: true
    });

    console.log('✅ Admission page blocks seeded\n');

    // =============================================
    // FACULTY PAGE BLOCKS
    // =============================================

    await ContentBlock.create({
      blockId: 'faculty-intro-text',
      pageName: 'faculty',
      sectionName: 'intro',
      blockType: 'paragraph',
      blockLabel: 'Faculty Introduction',
      content: {
        text: 'Our faculty members are renowned experts in their fields, committed to excellence in teaching and research.'
      },
      styling: {
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#333333',
        textAlign: 'center',
        padding: '40px 20px'
      },
      layout: {
        maxWidth: '900px',
        margin: '0 auto'
      },
      blockOrder: 1,
      isVisible: true
    });

    await ContentBlock.create({
      blockId: 'faculty-grid',
      pageName: 'faculty',
      sectionName: 'members',
      blockType: 'gallery',
      blockLabel: 'Faculty Photo Grid',
      content: {
        title: 'Our Distinguished Faculty',
        galleryType: 'grid',
        columns: 4,
        items: []  // Will be populated dynamically from faculty API
      },
      styling: {
        gap: '30px',
        imageSize: '200px',
        imageBorderRadius: '50%'
      },
      layout: {
        display: 'grid',
        gridColumns: '4',
        padding: '40px 20px'
      },
      responsive: {
        tablet: { gridColumns: '3' },
        mobile: { gridColumns: '2' }
      },
      blockOrder: 2,
      isVisible: true
    });

    console.log('✅ Faculty page blocks seeded\n');

    // =============================================
    // Get Summary
    // =============================================
    const totalBlocks = await ContentBlock.count();
    const blocksByPage = await ContentBlock.findAll({
      attributes: ['pageName', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['pageName']
    });
    
    const blocksByType = await ContentBlock.findAll({
      attributes: ['blockType', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['blockType']
    });

    console.log('✅ All content blocks seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Total Blocks: ${totalBlocks}`);
    console.log('\nBlocks by page:');
    blocksByPage.forEach(row => {
      console.log(`   - ${row.pageName}: ${row.get('count')} blocks`);
    });
    console.log('\nBlocks by type:');
    blocksByType.forEach(row => {
      console.log(`   - ${row.blockType}: ${row.get('count')} blocks`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding content blocks:', error);
    process.exit(1);
  }
};

seedContentBlocks();
