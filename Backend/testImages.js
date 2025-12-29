// Test if images are accessible via API
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

const testImages = async () => {
  console.log('🖼️  Testing Image Access...\n');

  const images = [
    '/images/campus-hero.jpg',
    '/images/campus-overview.jpg',
    '/images/campus-aerial.jpg',
    '/uploads/images/campus-hero.jpg'
  ];

  for (const imagePath of images) {
    try {
      const response = await fetch(`${BASE_URL}${imagePath}`);
      const status = response.ok ? '✅' : '❌';
      const size = response.headers.get('content-length');
      const type = response.headers.get('content-type');
      
      console.log(`${status} ${imagePath}`);
      console.log(`   Status: ${response.status} | Size: ${size} bytes | Type: ${type}\n`);
    } catch (error) {
      console.log(`❌ ${imagePath}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }
};

console.log('⏳ Make sure backend is running on port 5000...\n');
setTimeout(testImages, 1000);
