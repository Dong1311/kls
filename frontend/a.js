const fs = require('fs');

const ttfFilePath = './times-new-roman-14.ttf';
const outputFilePath = './font-times-new-roman-base64.js';

fs.readFile(ttfFilePath, (err, data) => {
  if (err) throw err;

  const base64Font = data.toString('base64');
  const output = `export default \`${base64Font}\`;`;

  fs.writeFile(outputFilePath, output, (err) => {
    if (err) throw err;
    console.log('Font converted to Base64 and saved as:', outputFilePath);
  });
});
