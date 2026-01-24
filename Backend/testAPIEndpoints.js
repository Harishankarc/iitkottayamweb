import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing Content Blocks API\n');

  // Test 1: Fetch pages
  console.log('1. Testing GET /api/pages');
  try {
    const res1 = await fetch(`${API_BASE}/api/pages`);
    const data1 = await res1.json();
    if (data1.success) {
      console.log(`   ✅ Found ${data1.data.length} pages`);
      console.log(`   Sample page: ${data1.data[0]?.pageName} - ${data1.data[0]?.pageTitle}`);
    } else {
      console.log(`   ❌ Failed: ${data1.message}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 2: Fetch content blocks for homepage
  console.log('\n2. Testing GET /api/content-blocks/page/homepage');
  try {
    const res2 = await fetch(`${API_BASE}/api/content-blocks/page/homepage`);
    const data2 = await res2.json();
    if (data2.success) {
      console.log(`   ✅ Found ${data2.data.length} blocks for homepage`);
      console.log('   Blocks:');
      data2.data.forEach((block, i) => {
        console.log(`     [${i + 1}] ${block.blockLabel} (${block.blockType})`);
      });
    } else {
      console.log(`   ❌ Failed: ${data2.message}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // Test 3: Fetch content blocks for why-iiitk
  console.log('\n3. Testing GET /api/content-blocks/page/why-iiitk');
  try {
    const res3 = await fetch(`${API_BASE}/api/content-blocks/page/why-iiitk`);
    const data3 = await res3.json();
    if (data3.success) {
      console.log(`   ✅ Found ${data3.data.length} blocks for why-iiitk`);
      data3.data.forEach((block, i) => {
        console.log(`     [${i + 1}] ${block.blockLabel} (${block.blockType})`);
      });
    } else {
      console.log(`   ❌ Failed: ${data3.message}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n✅ API tests complete!');
}

testAPI();
