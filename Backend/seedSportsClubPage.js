import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedSportsClubPage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    const blocks = [
      {
        pageName: 'sports-club',
        blockId: 'sports-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'Sports Club',
          description: '"Sports do not build Character, they Reveal it."'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About Sports Club',
          text: 'Sports Club encourages students to develop their skills in all kinds of sports. The club mainly aims to develop the character of sportsmanship among students. We ensure support mentorship and facilities students need when it comes to sports. Play well and stay healthy because mental strength alone is not enough for an individual to be perfect. Sports and games make you feel excited and brings out the best in you.\n\nFaculty In-Charge: Dr. A. Anenth\nEmail: a.anenth@iiitkottayam.ac.in'
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-activities',
        blockType: 'list',
        blockLabel: 'Sports Activities',
        content: JSON.stringify({
          title: 'Sports Activities',
          items: [
            'Cricket',
            'Badminton',
            'Football',
            'Table Tennis',
            'Throwball',
            'Volleyball'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-mentor',
        blockType: 'list',
        blockLabel: 'Mentor',
        content: JSON.stringify({
          title: 'Mentor',
          items: [
            'Sethilan Narathi Reddy - sethilan22bcs195@iiittkottayam.ac.in'
          ]
        }),
        blockOrder: 4,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-details',
        blockType: 'paragraph',
        blockLabel: 'Sports Events Details',
        content: JSON.stringify({
          title: 'About Sports Events',
          text: 'Sports Club aims to support the students and facilitate in their participation in competitive physical activities or games which, through casual or organized participation, aim to use, maintain or improve physical ability and skills while providing engagement and entertainment to participants and, in some cases, spectators. Sports Club provides and participate in many sports such as Cricket, Badminton, Football, Table Tennis, Throwball, Volleyball and many other indoor games.\n\nCricket ground is available in our institute to conduct all outdoor games, football and badminton. It is famished with cricket and football grounds. And on the weekends, students have access to 2 LNCPE indoor badminton courts. Sports in IIIT Kottayam are well developed at the institute. Inter College & Inter Institute competitions such as Inter IIIT are held every year. After classes end, each day, students can practice cricket, football and badminton at the ground. Sports Club hosts various sports events and coordinates intercollegiate and Inter Institute events.\n\nSports Club provides equipment to the students for whatever sport they are interested in. Coming to our past events, Sports Club has hosted 3 sports meets till now. One in Anand College of Engineering Kaithacode which was held for the students participating with Anand College. The other two events organized by us are Inter IIIT which more importantly, IIIT Kottayam participated in the latest Inter IIT. The Participation for the inter IIIT has increased every year.'
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-achievements',
        blockType: 'table',
        blockLabel: 'Achievements in Sports',
        content: JSON.stringify({
          title: 'Achievements in Sports',
          headers: ['SL.No.', 'Achievements', 'Name of Students', 'Sport Event'],
          rows: [
            {
              slNo: '1',
              achievement: 'Winners, Volleyball(Boys)',
              names: 'satyanarayana Murty(2020)Captain, Akhil M Reji (2020), Malineni lakshmi Narayana(2020), Y T karthik (2021), Midde vasu (2021), Murali (2021), Logesh(2021), Ajay Kumar (2021), Ram swaraj naik(2022), Vishnu jha(2022), Balakrishna Saikrishna(2022), Bhanu sankar (2021)',
              event: 'INTER IIIT SPORTS MEET 2024, IIIT Allahabad'
            },
            {
              slNo: '2',
              achievement: 'Gold Medal, Powerlifting above 83 kg.',
              names: 'Aadirat Singh',
              event: ''
            },
            {
              slNo: '3',
              achievement: 'Bronze Medal, Powerlifting under 83 kg.',
              names: 'Armaan',
              event: ''
            },
            {
              slNo: '4',
              achievement: 'Silver Medal, Shotput(Boys)',
              names: 'Ajay Kumar',
              event: ''
            },
            {
              slNo: '5',
              achievement: 'Silver Medal, Women Discuss Throw',
              names: 'Laxmi priya Harshitha',
              event: ''
            },
            {
              slNo: '6',
              achievement: 'Fourth Position, Cricket',
              names: 'Cricket Team',
              event: ''
            },
            {
              slNo: '7',
              achievement: 'Winners, Carroms (Boys)',
              names: 'Sai Kishore (Captain), Sai Teja, Saketh',
              event: ''
            },
            {
              slNo: '8',
              achievement: 'Winner, Power Lifting above 83 kg',
              names: 'Aadirath Singh',
              event: 'Inter IIIT Sports Meet 2023, IIITDM Kancheepuram.'
            },
            {
              slNo: '9',
              achievement: 'Third Place, Power Lifting',
              names: 'Aadirath Singh, Abhishek Anand',
              event: ''
            },
            {
              slNo: '10',
              achievement: 'Gold Medal, Carroms (Boys)',
              names: 'Jaisingh, Surya and Venkat Sai of 2016 batch',
              event: ''
            },
            {
              slNo: '11',
              achievement: 'Bronze Medal, Table Tennis (Boys)',
              names: 'Ankit (2016 Batch), Somesh (2017 Batch) and Antony (2018 Batch)',
              event: 'Inter IIIT Sports-meet 2020, IIIT Jabalpur'
            },
            {
              slNo: '12',
              achievement: 'Bronze Medal, Shotput (Boys)',
              names: 'Vishnu. N of 2019 batch',
              event: ''
            },
            {
              slNo: '13',
              achievement: 'Best player, Carroms (Boys)',
              names: 'Jaisingh of 2016 batch',
              event: ''
            },
            {
              slNo: '14',
              achievement: 'Gold Medal, Athletics 400m Girls',
              names: 'Sangeetha Suresh of 2017 batch',
              event: 'Inter IIIT Sports-meet 2019, IIIT Allahabad'
            },
            {
              slNo: '15',
              achievement: 'Gold Medal, Carroms Doubles (Girls)',
              names: 'Ramya and Shantha of 2015 batch',
              event: ''
            },
            {
              slNo: '16',
              achievement: 'Silver Medal, Carroms Singles (Boys)',
              names: 'Prem Nayak of 2015 batch',
              event: 'Inter IIIT Sports-meet 2018, IIIT Gwalior'
            },
            {
              slNo: '17',
              achievement: 'Gold Medal, Chess (Girls)',
              names: 'Sangeetha Suresh of 2017 batch',
              event: ''
            }
          ]
        }),
        blockOrder: 6,
        isVisible: 1
      },
      {
        pageName: 'sports-club',
        blockId: 'sports-gallery',
        blockType: 'gallery',
        blockLabel: 'Image Gallery',
        content: JSON.stringify({
          images: []
        }),
        blockOrder: 7,
        isVisible: 1
      }
    ];

    console.log('\nSeeding Sports Club page...');
    
    for (const block of blocks) {
      await connection.execute(
        `INSERT INTO content_blocks 
         (pageName, blockId, blockType, blockLabel, content, blockOrder, isVisible)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         blockType = VALUES(blockType),
         blockLabel = VALUES(blockLabel),
         content = VALUES(content),
         blockOrder = VALUES(blockOrder),
         isVisible = VALUES(isVisible)`,
        [
          block.pageName,
          block.blockId,
          block.blockType,
          block.blockLabel,
          block.content,
          block.blockOrder,
          block.isVisible
        ]
      );
      console.log(`✓ Seeded: ${block.blockId}`);
    }

    console.log('\n✅ Sports Club page seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Sports Club page:', error);
  } finally {
    await connection.end();
  }
}

seedSportsClubPage();
