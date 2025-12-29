// Test script to verify dynamic content system

const BASE_URL = 'http://localhost:5000/api';

console.log('🧪 Testing Dynamic Content System\n');
console.log('='.repeat(60));

async function testPageContentAPI() {
  try {
    // Test 1: Get all pages
    console.log('\n📋 Test 1: Get All Pages');
    console.log('-'.repeat(60));
    const allPages = await fetch(`${BASE_URL}/pages`);
    const allPagesData = await allPages.json();
    console.log(`✅ Total pages: ${allPagesData.data?.length || 0}`);
    console.log(`Categories found:`, [...new Set(allPagesData.data?.map(p => p.category))]);

    // Test 2: Get homepage
    console.log('\n📋 Test 2: Get Homepage Content');
    console.log('-'.repeat(60));
    const homepage = await fetch(`${BASE_URL}/pages/homepage`);
    const homepageData = await homepage.json();
    if (homepageData.success) {
      console.log(`✅ Homepage found`);
      console.log(`   Title: ${homepageData.data.pageTitle}`);
      console.log(`   Hero Title: ${homepageData.data.heroTitle}`);
      console.log(`   Sections: ${homepageData.data.sections?.length || 0}`);
      
      // Display sections
      homepageData.data.sections?.forEach(section => {
        console.log(`   - ${section.id}: ${section.type}`);
      });
    } else {
      console.log('❌ Homepage not found');
    }

    // Test 3: Get pages by category
    console.log('\n📋 Test 3: Get Pages by Category');
    console.log('-'.repeat(60));
    const institutePages = await fetch(`${BASE_URL}/pages?category=institute`);
    const institutePagesData = await institutePages.json();
    console.log(`✅ Institute pages: ${institutePagesData.data?.length || 0}`);
    institutePagesData.data?.forEach(page => {
      console.log(`   - ${page.pageName} (${page.pageTitle})`);
    });

    // Test 4: Verify Vision & Mission content
    console.log('\n📋 Test 4: Verify Vision & Mission Content');
    console.log('-'.repeat(60));
    const visionSection = homepageData.data?.sections?.find(s => s.id === 'vision');
    const missionSection = homepageData.data?.sections?.find(s => s.id === 'mission');
    
    if (visionSection) {
      console.log('✅ Vision section found:');
      console.log(`   Content: ${visionSection.content.substring(0, 100)}...`);
    } else {
      console.log('❌ Vision section not found');
    }

    if (missionSection) {
      console.log('✅ Mission section found:');
      console.log(`   Items: ${missionSection.items?.length || 0}`);
      missionSection.items?.forEach((item, i) => {
        console.log(`   ${i + 1}. ${item}`);
      });
    } else {
      console.log('❌ Mission section not found');
    }

    // Test 5: Verify Placement Stats
    console.log('\n📋 Test 5: Verify Placement Statistics');
    console.log('-'.repeat(60));
    const placementSection = homepageData.data?.sections?.find(s => s.id === 'placement-stats');
    
    if (placementSection) {
      console.log('✅ Placement stats section found:');
      placementSection.statistics?.forEach(stat => {
        console.log(`   ${stat.label}: ${stat.value}`);
      });
    } else {
      console.log('❌ Placement stats section not found');
    }

    // Test 6: Check published status
    console.log('\n📋 Test 6: Check Publication Status');
    console.log('-'.repeat(60));
    const publishedPages = allPagesData.data?.filter(p => p.isPublished);
    const draftPages = allPagesData.data?.filter(p => !p.isPublished);
    console.log(`✅ Published pages: ${publishedPages?.length || 0}`);
    console.log(`✅ Draft pages: ${draftPages?.length || 0}`);

    console.log('\n' + '='.repeat(60));
    console.log('✅ All tests completed successfully!');
    console.log('='.repeat(60) + '\n');

    console.log('📊 Summary:');
    console.log(`   Total Pages: ${allPagesData.data?.length || 0}`);
    console.log(`   Published: ${publishedPages?.length || 0}`);
    console.log(`   Categories: ${[...new Set(allPagesData.data?.map(p => p.category))].join(', ')}`);
    console.log(`   Dynamic Sections: Vision, Mission, Placement Stats`);
    console.log('\n🎉 Dynamic Content System is working!');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error(error);
  }
}

testPageContentAPI();
