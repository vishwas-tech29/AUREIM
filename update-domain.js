// Quick script to update domain references
// Run with: node update-domain.js yourdomain.in

const fs = require('fs');
const path = require('path');

const newDomain = process.argv[2];

if (!newDomain) {
  console.log('❌ Please provide your domain name');
  console.log('Usage: node update-domain.js yourdomain.in');
  process.exit(1);
}

console.log(`🔄 Updating domain to: ${newDomain}`);

// Files to update
const filesToUpdate = [
  '.env.production',
  'index.html',
  'public/manifest.json',
  'public/sitemap.xml'
];

// Update each file
filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace placeholder domain
      content = content.replace(/yourdomainname\.in/g, newDomain);
      content = content.replace(/https:\/\/aureim\.com/g, `https://${newDomain}`);
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated: ${filePath}`);
    } catch (error) {
      console.log(`❌ Failed to update: ${filePath}`);
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log(`🎉 Domain update complete!`);
console.log(`📝 Next steps:`);
console.log(`1. Build for production: npm run build:prod`);
console.log(`2. Deploy to your hosting platform`);
console.log(`3. Test on live domain: https://${newDomain}`);