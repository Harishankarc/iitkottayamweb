import fetch from 'node-fetch';

async function testUpdateScholar() {
  try {
    // Test updating scholar ID 59
    const response = await fetch('http://localhost:5000/api/people/59', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Nair S Rajlaxmi',
        designation: 'EXTERNAL REGISTRANTS',
        department: '2025',
        userType: 'research-scholars',
        specialization: 'EXTERNAL REGISTRANTS',
        isActive: true
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testUpdateScholar();
