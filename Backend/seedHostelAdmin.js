import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iiitkottayam_website'
};

async function seedHostelAdmin() {
  let connection;
  
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected successfully!');

    // Complete Hostel Administration (All staff from screenshots)
    const wardens = [
      {
        id: 1,
        name: 'Dr. Bakkyaraj T',
        role: 'Associate Dean (Hostel Affairs & Student Events)',
        designation: 'Associate Dean (Hostel Affairs & Student Events)',
        gender: 'Male',
        phone: '91 (0) 482-2202160',
        email: 'bakkyaraj at iiitkottayam dot ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=BT',
        category: 'dean'
      },
      {
        id: 2,
        name: 'Capt. Rajendran V Nair',
        role: 'Security Officer',
        designation: 'Security Officer',
        gender: 'Male',
        phone: '91 (0) 0482202109, 09633651775',
        email: 'rao at iiitkottayam dot ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=RN',
        category: 'security'
      },
      {
        id: 3,
        name: 'Shri Padmakumar T V (Ex-Sargent)',
        role: 'Hostel Manager',
        designation: 'Hostel Manager',
        gender: 'Male',
        phone: '91 (0) 0482202148, 6295662931',
        email: 'hostel_manager at iiitkottayam dot ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=PK',
        category: 'manager'
      },
      {
        id: 4,
        name: 'Dr. Rajkumar P',
        role: 'Associate Dean (Hostel Affairs & Student Events)',
        designation: 'Associate Dean (Hostel Affairs & Student Events)',
        gender: 'Male',
        phone: '+91 482 2202104',
        email: 'dean-hostel@iiitkottayam.ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=RP',
        category: 'admin'
      },
      {
        id: 5,
        name: 'Capt. Bijumon P Nair',
        role: 'Security Officer',
        designation: 'Security Officer',
        gender: 'Male',
        phone: '+91 8448256198, 04822447273',
        email: 'security@iiitkottayam.ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=BN',
        category: 'admin'
      },
      {
        id: 6,
        name: 'Anoop Kumar T V',
        role: 'Asst Registrar | Hostel Manager',
        designation: 'Asst Registrar | Hostel Manager',
        gender: 'Male',
        phone: '9447042579',
        email: 'hostel@iiitkottayam.ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=AK',
        category: 'admin'
      },
      {
        id: 7,
        name: 'Dr John Paul Martin',
        role: 'Faculty In Charge(GIIT) Hostel Coordinator',
        designation: 'Faculty In Charge(GIIT) Hostel Coordinator',
        gender: 'Male',
        phone: '+91 9048323068',
        email: 'johnpm.ph.iiitkottayam.dot.ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=JP',
        category: 'admin'
      },
      {
        id: 8,
        name: 'Dr Chullikkattil Padinjarekutti',
        role: 'Associate FC',
        designation: 'Associate FC',
        gender: 'Male',
        phone: '+91 482 2202255',
        email: 'chullikkattu.pt.iiitkottayam.dot.ac.in',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=CP',
        category: 'admin'
      }
    ];

    // Halls of Residence - Girls (from screenshot table)
    const halls = [
      {
        id: 1,
        name: 'Dr. Kanchan Lata Kashyap',
        gender: 'Girls',
        wardenType: 'Warden',
        contact: 'No:+91 (0) 482-2202272, 9826733258',
        email: 'kanchanlata at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=KL',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 2,
        name: 'Dr. Emy Mariam George',
        gender: 'Girls',
        wardenType: 'Standby Warden',
        contact: 'No:+91 (0) 482-2202270, 9496211912',
        email: 'emy at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=EG',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 3,
        name: 'Dr. Minu A Pillai',
        gender: 'Girls',
        wardenType: 'Assistant Warden',
        contact: 'No:+91 (0) 482-2202218, 9074401968',
        email: 'minupillai at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=MP',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 4,
        name: 'Dr. Dhakshayani J',
        gender: 'Girls',
        wardenType: 'Assistant Warden',
        contact: 'No:+91 (0) 482-2202275, 9578359880',
        email: 'dhakshayani at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=DJ',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 5,
        name: 'Ms. Anu Maria Sebastian',
        gender: 'Girls',
        wardenType: 'Assistant Warden',
        contact: 'No:+91 (0) 482-2202228, 8089706065',
        email: 'anumaria at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=AS',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 6,
        name: 'Dr. Jeena Thomas',
        gender: 'Girls',
        wardenType: 'Assistant Warden',
        contact: 'No:+91 (0) 482-2202278, 9495662514',
        email: 'jeenathomas at iiitkottayam dot ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=JT',
        hostelName: 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'
      },
      {
        id: 7,
        name: 'Dr. Rajendra Garge',
        gender: 'Boys',
        wardenType: 'Resident Warden',
        contact: 'No: +91 482-2202218, 9446874628',
        email: 'rajendrarg@nitr.iiitkottayam.dot.ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=RG'
      },
      {
        id: 8,
        name: 'Dr. Elon Vincent George',
        gender: 'Boys',
        wardenType: 'Resident Warden',
        contact: 'No: +91 482-2202215, 9446874930',
        email: 'elonvincent.pt.iiitkottayam.dot.ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=EV'
      },
      {
        id: 9,
        name: 'Dr. Alvin P Baby',
        gender: 'Boys',
        wardenType: 'Assistant Warden',
        contact: 'No: +91 482-2202218, 9074475066',
        email: 'alvinpb.pt.iiitkottayam.dot.ac.in',
        image: 'https://placehold.co/200x200/e8f5f0/239244?text=AB'
      }
    ];

    // Mess Committee
    const messCommittee = [
      {
        id: 1,
        name: 'Dr John Paul Martin',
        role: 'Faculty In Charge(FIC) Mess Committee',
        phone: '+91 (0) 482-2202202',
        email: 'johnpaul at iiitkottayam dot ac.in, fic_messcommittee at iiitkottayam dot ac.in'
      },
      {
        id: 2,
        name: 'Dr Chakradhar Padamatham',
        role: 'Associate FIC',
        phone: '+91 (0) 482-2202263',
        email: 'chakradhar at iiitkottayam dot ac.in'
      },
      {
        id: 3,
        name: 'Dr Emy Mariam George',
        role: 'Associate FIC',
        phone: '+91 (0) 482-2202270',
        email: 'emy at iiitkottayam dot ac.in'
      }
    ];

    // Services Available
    const services = [
      'Security staff : available round the clock.',
      'Maintenance staff : available round the clock.',
      'House keeping staff to clean the common areas.',
      'Complaint/Suggestion book : students complaints are rectified as soon as possible.',
      'Transport : outsourced ambulance and vehicle services are available.'
    ];

    // Update the hostel facility with complete data
    await connection.query(
      `UPDATE facilities 
       SET wardens = ?,
           halls = ?,
           customFields = ?,
           updatedAt = NOW()
       WHERE slug = 'hostel'`,
      [
        JSON.stringify(wardens),
        JSON.stringify(halls),
        JSON.stringify({
          messCommittee: messCommittee,
          services: services,
          hostelCareTaker: 'Anamudi Hostel (0482220 2126), Chittar Hostel (0482220 2296), Manimala Hostel Block A (0482220 2297)'
        })
      ]
    );

    console.log(`✓ Updated hostel with ${wardens.length} staff members and ${halls.length} hall wardens`);
    console.log(`✓ Added ${messCommittee.length} mess committee members`);
    console.log(`✓ Added ${services.length} services`);
    console.log('\n✓ Hostel data seeded successfully!');

  } catch (error) {
    console.error('Error seeding hostel admin data:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the seeder
seedHostelAdmin()
  .then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
