const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

walkDir("c:/Users/user/Desktop/Imboni/frontend/src", function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('http://localhost:5000')) {
      // Look for string literals and replace URL. 
      // We'll replace it with \`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}\`
      const regex = /'http:\/\/localhost:5000(.*?)'/g;
      const regexB = /`http:\/\/localhost:5000(.*?)`/g;
      const regexD = /"http:\/\/localhost:5000(.*?)"/g;
      
      let newContent = content
        .replace(regex, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`")
        .replace(regexB, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`")
        .replace(regexD, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`");
        
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed:', filePath);
    }
  }
});
