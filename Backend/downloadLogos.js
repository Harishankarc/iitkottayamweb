import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const companies = [
  { name: 'amazon', url: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' },
  { name: 'ibm', url: 'https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png' },
  { name: 'bosch', url: 'https://logos-download.com/wp-content/uploads/2016/09/Bosch_logo.png' },
  { name: 'nvidia', url: 'https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/1280px-Nvidia_logo.svg.png' },
  { name: 'tcs', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1280px-Tata_Consultancy_Services_Logo.svg.png' },
  { name: 'infosys', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png' },
  { name: 'jio', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Reliance_Jio_Logo.svg/1280px-Reliance_Jio_Logo.svg.png' },
  { name: 'cognizant', url: 'https://logos-world.net/wp-content/uploads/2023/03/Cognizant-Logo.jpg' },
  { name: 'deloitte', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/1280px-Deloitte.svg.png' },
  { name: 'hp', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1280px-HP_logo_2012.svg.png' },
  { name: 'wipro', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1280px-Wipro_Primary_Logo_Color_RGB.svg.png' },
  { name: 'capgemini', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Capgemini_Logo.svg/1280px-Capgemini_Logo.svg.png' },
  { name: 'sap', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/1280px-SAP_2011_logo.svg.png' },
  { name: 'microsoft', url: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png' },
  { name: 'google', url: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
  { name: 'oracle', url: 'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png' },
  { name: 'accenture', url: 'https://logos-world.net/wp-content/uploads/2020/07/Accenture-Logo.png' },
  { name: 'adobe', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/1280px-Adobe_Corporate_Logo.png' },
  { name: 'intel', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1280px-Intel_logo_%282006-2020%29.svg.png' },
  { name: 'cisco', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/1280px-Cisco_logo.svg.png' },
  { name: 'qualcomm', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Qualcomm-Logo.svg/1280px-Qualcomm-Logo.svg.png' },
  { name: 'samsung', url: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png' },
  { name: 'lg', url: 'https://logos-world.net/wp-content/uploads/2020/05/LG-Logo.png' },
  { name: 'flipkart', url: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png' },
  { name: 'paytm', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/1280px-Paytm_Logo_%28standalone%29.svg.png' },
  { name: 'zoho', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Zoho_logo.svg/1280px-Zoho_logo.svg.png' },
  { name: 'byjus', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Byjus_Logo.svg/1280px-Byjus_Logo.svg.png' },
  { name: 'uber', url: 'https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png' },
  { name: 'ola', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ola_Cabs_logo.svg/1280px-Ola_Cabs_logo.svg.png' },
  { name: 'swiggy', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/1280px-Swiggy_logo.svg.png' }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(__dirname, 'uploads', 'images', filename);
    
    protocol.get(url, { timeout: 10000 }, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        const redirectUrl = response.headers.location;
        downloadImage(redirectUrl, filename).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`❌ Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
};

async function downloadAllLogos() {
  console.log('Starting logo downloads...\n');
  
  for (const company of companies) {
    const ext = company.url.includes('.jpg') ? '.jpg' : '.png';
    const filename = `${company.name}${ext}`;
    
    try {
      await downloadImage(company.url, filename);
    } catch (error) {
      console.error(`Failed to download ${company.name}:`, error.message);
    }
  }
  
  console.log('\n✅ All downloads complete!');
}

downloadAllLogos();
