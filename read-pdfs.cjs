const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractText(filePath) {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str).join(' ');
    fullText += `\n=== PAGE ${i} ===\n${strings}\n`;
  }
  return { numPages: doc.numPages, text: fullText };
}

async function main() {
  const files = [
    'C:/Users/omara/Downloads/standered/Basic Standards.pdf',
    'C:/Users/omara/Downloads/standered/Board Creation Decision.pdf',
    'C:/Users/omara/Downloads/standered/Registration Decision.pdf',
  ];
  for (const f of files) {
    console.log('\n' + '='.repeat(80));
    console.log('FILE:', f.split('/').pop());
    console.log('='.repeat(80));
    const result = await extractText(f);
    console.log('PAGES:', result.numPages);
    console.log(result.text);
  }
}

main().catch(console.error);
