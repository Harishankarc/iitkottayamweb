import mysql from 'mysql2/promise';

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'iiitkottayam',
  port: 3306
};

const fdpPrograms = [
  {
    slNo: 1,
    topic: '3-Day Hands-On TTTC Workshop on VLSI Test',
    programme: 'Workshop',
    coordinator: 'Dr. Kala S, Dr. Ananth A, Dr. Minu A Pillai, and Dr. Bijoy A John',
    startDate: '2026-01-30',
    endDate: '2026-02-01',
    brochureUrl: '#',
    displayOrder: 1
  },
  {
    slNo: 2,
    topic: '5-Day Workshop on Complex Network Analysis with Applications in Brain Network Science & Complex Systems (CNA-Brain 2025)',
    programme: 'Workshop',
    coordinator: 'Network Science Research Lab, IIIT Kottayam',
    startDate: '2025-12-19',
    endDate: '2025-12-23',
    brochureUrl: '#',
    displayOrder: 2
  },
  {
    slNo: 3,
    topic: 'Two-Day International Conference on Computation and Humanities: Overlapping and Interacting Digital Spaces (CHORDS 2025)',
    programme: 'International Conference',
    coordinator: 'Dr. Gayathri G R and Dr. Jost Narpla',
    startDate: '2025-07-28',
    endDate: '2025-07-29',
    brochureUrl: '#',
    displayOrder: 3
  },
  {
    slNo: 4,
    topic: 'Five Days Online FDP & Workshop on Next-Gen Intelligence: AI, Security, and Geospatial Insights',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. Priyadharshini S and Dr. Cinu C Kiliroor',
    startDate: '2025-07-14',
    endDate: '2025-07-18',
    brochureUrl: '#',
    displayOrder: 4
  },
  {
    slNo: 5,
    topic: 'Five-Days Online FDP on "Responsible Natural Language Processing"',
    programme: 'FDP',
    coordinator: 'Dr. Sara Renjit, Dr. Athira S, Dr. Suchithra Susan Joseph and Dr. Manu Madhavan',
    startDate: '2025-07-07',
    endDate: '2025-07-11',
    brochureUrl: '#',
    displayOrder: 5
  },
  {
    slNo: 6,
    topic: '10-day online FDP on "From Transformation to Protection: Mastering Cybersecurity Challenges in the Digital Era."',
    programme: 'FDP',
    coordinator: 'Organized by: IIIT Kottayam and NIT Warangal',
    startDate: '2025-07-01',
    endDate: '2025-07-10',
    brochureUrl: '#',
    displayOrder: 6
  },
  {
    slNo: 7,
    topic: 'Five-Day FDP cum Workshop on Recent trends in Next Generation Communications: Simulations and Applications',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. Deepak Jose and Dr. Emy Mariam George',
    startDate: '2025-06-30',
    endDate: '2025-07-04',
    brochureUrl: '#',
    displayOrder: 7
  },
  {
    slNo: 8,
    topic: 'Five-Day FDP cum Workshop on "Statistics, Machine Learning, and Optimization for Scientific Research"',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. Bakkiyaraj T and Dr. Susheel Kumar Joshi',
    startDate: '2025-06-26',
    endDate: '2025-06-30',
    brochureUrl: '#',
    displayOrder: 8
  },
  {
    slNo: 9,
    topic: '6 days Online FDP cum workshop on Geospatial data: tools, techniques and applications',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. Sreeja M U, Dr. Abin Oommen Philip, Dr. Keerthy Mary Crispin and Dr. Krishnendu S P',
    startDate: '2025-06-23',
    endDate: '2025-06-28',
    brochureUrl: '#',
    displayOrder: 9
  },
  {
    slNo: 10,
    topic: 'Five-Day workshop on "Data Science Essentials: Python Powered learning"',
    programme: 'Workshop',
    coordinator: 'Dr. Athira B and Dr. Suchithra M S',
    startDate: '2025-06-23',
    endDate: '2025-06-27',
    brochureUrl: '#',
    displayOrder: 10
  },
  {
    slNo: 11,
    topic: 'One Week FDP cum Workshop Advanced Computer Vision for Image-Video and Applications',
    programme: 'National Workshop',
    coordinator: 'Dr. Sivaish Bellamkonda and Dr. Dhatchiayaini S',
    startDate: '2025-06-23',
    endDate: '2025-06-27',
    brochureUrl: '#',
    displayOrder: 11
  },
  {
    slNo: 12,
    topic: 'Short Term Training Program (STTP) on Rapid Prototyping using FPGA',
    programme: 'Short Term Training Program',
    coordinator: 'Dr. Kala S and Dr. Minu A Pillai',
    startDate: '2025-06-16',
    endDate: '2025-06-21',
    brochureUrl: '#',
    displayOrder: 12
  },
  {
    slNo: 13,
    topic: 'One Week Workshop on Internet of Things for real-time applications with Implementations',
    programme: 'Workshop',
    coordinator: 'Dr. K. Guruvaiah and Dr. Santhos Kumar A.',
    startDate: '2025-06-16',
    endDate: '2025-06-20',
    brochureUrl: '#',
    displayOrder: 13
  },
  {
    slNo: 14,
    topic: '10 Days Short Term Training Program on Digital Defense: Ethics: AI Hacking and Cyber Security',
    programme: 'Short Term Training Program',
    coordinator: 'Dr. Renu Mary Daniel, Dr. Jai Ganesh S, Dr. Abin Oommen Philip, Dr. John Joy K A and Dr. Sreelakshmi J J',
    startDate: '2025-06-09',
    endDate: '2025-06-20',
    brochureUrl: '#',
    displayOrder: 14
  },
  {
    slNo: 15,
    topic: 'Five-Day Online FDP/Workshop on "Advances in Robotics"',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. Riyasudhin N, Dr. Bhanu Chander, and Dr. Santhos Kumar A',
    startDate: '2025-05-26',
    endDate: '2025-05-30',
    brochureUrl: '#',
    displayOrder: 15
  },
  {
    slNo: 16,
    topic: 'One Week FDP cum Workshop (Hybrid) on Secure Cloud, AI and Distributed Systems (SCADS2025)',
    programme: 'FDP cum Workshop',
    coordinator: 'Dr. E Silambarasan and Dr. Jobin Jose',
    startDate: '2025-05-05',
    endDate: '2025-05-09',
    brochureUrl: '#',
    displayOrder: 16
  },
  {
    slNo: 17,
    topic: '5 Day BOOTCAMP on Responsible Computing',
    programme: 'BOOTCAMP',
    coordinator: 'FACTS-H Lab IIIT Kottayam in association with Mozilla Foundation',
    startDate: '2025-03-17',
    endDate: '2025-03-22',
    brochureUrl: '#',
    displayOrder: 17
  },
  {
    slNo: 18,
    topic: '10 days Online FDP on Medical Image Analysis And Its Advancements Through Explainable AI and Security',
    programme: 'FDP',
    coordinator: 'Dr. Kanchan Lata Kashyap and Dr. Lidiya Lilly Thampi',
    startDate: '2025-02-05',
    endDate: '2025-02-14',
    brochureUrl: '#',
    displayOrder: 18
  }
];

async function seedFdpPrograms() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Clearing existing FDP programs...');
    await connection.execute('DELETE FROM fdp_programs');
    
    console.log('Inserting FDP programs...');
    for (const program of fdpPrograms) {
      await connection.execute(
        `INSERT INTO fdp_programs (slNo, topic, programme, coordinator, startDate, endDate, brochureUrl, displayOrder, isActive)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [
          program.slNo,
          program.topic,
          program.programme,
          program.coordinator,
          program.startDate,
          program.endDate,
          program.brochureUrl,
          program.displayOrder
        ]
      );
    }
    
    console.log(`✅ Successfully seeded ${fdpPrograms.length} FDP programs`);
  } catch (error) {
    console.error('❌ Error seeding FDP programs:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedFdpPrograms();
