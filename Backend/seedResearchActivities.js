import dotenv from 'dotenv';
import sequelize from './config/database.js';
import ResearchActivity from './models/ResearchActivity.js';

dotenv.config();

const researchActivities = [
  { serialNumber: 1, activityType: 'invited-talk', faculty: 'Dr. Ebin Deni Raj', topic: 'Social Big Data', institution: 'AICTE Sponsored FDP - Sri Ramakrishna Engineering College, Coimbatore', activityDate: '2017-11-13' },
  { serialNumber: 2, activityType: 'invited-talk', faculty: 'Dr. Bakkyaraj T', topic: 'Applications of Mathematics in Engineering', institution: 'Kongu Engineering College, Erode', activityDate: '2018-03-26' },
  { serialNumber: 3, activityType: 'invited-talk', faculty: 'Dr. Shajulin Benedict', topic: 'Cloud Computing', institution: 'Marian Engineering College, Trivandrum', activityDate: '2018-07-24' },
  { serialNumber: 4, activityType: 'invited-talk', faculty: 'Dr. Shajulin Benedict', topic: 'IoT Cloud solutions', institution: 'BEC-Ghaziabad', activityDate: '2018-08-10' },
  { serialNumber: 5, activityType: 'invited-talk', faculty: 'Dr. Shajulin Benedict', topic: 'Cloud Computing', institution: 'Technical University Munich, Germany', activityDate: '2018-10-12', description: '12 to 24 Oct 2018' },
  { serialNumber: 6, activityType: 'invited-talk', faculty: 'Dr. Arun Cyril Jose', topic: 'Computer Forensic Methodologies', institution: 'Mahatma Gandhi University, Kottayam', activityDate: '2019-01-22' },
  { serialNumber: 7, activityType: 'invited-talk', faculty: 'Dr. Shajulin Benedict', topic: 'IoT Cloud Computing', institution: 'University of Klagenfurt, Austria', activityDate: '2019-05-23' },
  { serialNumber: 8, activityType: 'invited-talk', faculty: 'Dr. Panchami V', topic: 'IoT Security', institution: 'Sree Chitra Thirunal College of Engineering, Thiruvananthapuram', activityDate: '2019-07-23' },
  { serialNumber: 9, activityType: 'invited-talk', faculty: 'Dr. Ebin Deni Raj', topic: 'Data Science and PCA', institution: 'AICTE Sponsored FDP - St.Gits College of Engineering Kottayam', activityDate: '2019-10-16' },
  { serialNumber: 10, activityType: 'invited-talk', faculty: 'Dr. Bakkyaraj T', topic: 'Probabilistic PCA', institution: 'AICTE Sponsored FDP - St.Gits College of Engineering Kottayam', activityDate: '2019-10-16' },
  { serialNumber: 11, activityType: 'invited-talk', faculty: 'Dr. Bakkyaraj T', topic: 'Differential Equations and Its Applications', institution: "Queen Mary's College, Chennai", activityDate: '2019-09-06' },
  { serialNumber: 12, activityType: 'invited-talk', faculty: 'Dr. Bakkyaraj T', topic: 'Invariant of Differential Equations under one parameter Lie Transformation Groups', institution: "National Seminar on Advances in Algebra and Analysis at Queen Mary's College, Chennai", activityDate: '2020-01-30' },
  { serialNumber: 13, activityType: 'invited-talk', faculty: 'Dr. Bakkyaraj T', topic: 'On Exact Solutions Of Certain Fractional Partial Differential And Differential- Difference Equations By Using Invariant Subspace Method', institution: 'National conference on Partial Differential Equations and its applications at Periyar University, Salem, Tamil Nadu', activityDate: '2020-03-05' },
  { serialNumber: 14, activityType: 'invited-talk', faculty: 'Dr. P Victor Paul', topic: 'How to become a successful CS graduate', institution: 'Madanapalle Institute of Technology & Science, Madanapalle', activityDate: '2020-08-16' },
  { serialNumber: 15, activityType: 'invited-talk', faculty: 'Dr. P Victor Paul', topic: 'Research Paper Publication Process', institution: 'Mangalam College of Engineering, Kottayam', activityDate: '2022-05-06' },
  { serialNumber: 16, activityType: 'invited-talk', faculty: 'Dr. P Victor Paul', topic: 'Research Publication Types and Literature Survey', institution: 'SERB - Accelerate Vigyan sponsored Workshop at IIIT Kottayam', activityDate: '2022-07-19' },
  { serialNumber: 17, activityType: 'invited-talk', faculty: 'Dr. P Victor Paul', topic: 'Data Analytics and Research Opportunities', institution: 'Pondicherry Central University', activityDate: '2022-10-20' },
  { serialNumber: 18, activityType: 'invited-talk', faculty: 'Dr. P Victor Paul', topic: 'Genetic Algorithm Variants Research Overview', institution: 'IIIT Kottayam', activityDate: '2023-05-23' },
  { serialNumber: 19, activityType: 'invited-talk', faculty: 'Dr. Lidhya LillyThampi', topic: 'Advancements in Image Processing Applications on Medical Imaging and Underwater Imaging', institution: 'ICMS, Muttom', activityDate: '2022-08-30' }
];

const seedResearchActivities = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear existing data (optional)
    // await ResearchActivity.destroy({ where: {} });
    // console.log('🗑️  Cleared existing research activities');

    // Insert new data
    await ResearchActivity.bulkCreate(researchActivities);
    console.log(`✅ Seeded ${researchActivities.length} research activities`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding research activities:', error);
    process.exit(1);
  }
};

seedResearchActivities();
