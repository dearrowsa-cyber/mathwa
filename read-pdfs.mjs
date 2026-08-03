import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const files = [
  'C:/Users/omara/Downloads/standered/Basic Standards.pdf',
  'C:/Users/omara/Downloads/standered/Board Creation Decision.pdf',
  'C:/Users/omara/Downloads/standered/Registration Decision.pdf',
];

for (const f of files) {
  console.log('\n' + '='.repeat(80));
  console.log('FILE:', f);
  console.log('='.repeat(80));
  const data = await pdf(fs.readFileSync(f));
  console.log('PAGES:', data.numpages);
  console.log(data.text);
}
