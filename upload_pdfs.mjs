/**
 * Upload updated PDF files to Hostinger via FTP
 */
import { Client } from 'basic-ftp';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = JSON.parse(readFileSync(join(__dirname, 'deploy.config.json'), 'utf8'));

const LOCAL_DOCS = join(__dirname, 'public', 'docs');
const REMOTE_DOCS = '/public_html/docs';

const FILES_TO_UPLOAD = [
  'All-Policies-and-Regulations.pdf',
  'All-Policies.pdf',
  'All-Regulations.pdf',
];

const c = {
  reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

async function upload() {
  console.log(`\n${c.cyan}${c.bold}🚀 Uploading PDFs to Hostinger...${c.reset}\n`);

  const client = new Client();
  client.ftp.verbose = false;

  try {
    console.log(`${c.dim}Connecting to ${config.ftp.host}...${c.reset}`);
    await client.access({
      host: config.ftp.host,
      port: config.ftp.port,
      user: config.ftp.user,
      password: config.ftp.password,
      secure: config.ftp.secure,
    });
    console.log(`${c.green}✅ Connected!${c.reset}\n`);

    // Ensure remote docs directory exists
    await client.ensureDir(REMOTE_DOCS);
    await client.cd('/');

    for (const filename of FILES_TO_UPLOAD) {
      const localPath = join(LOCAL_DOCS, filename);
      const remotePath = `${REMOTE_DOCS}/${filename}`;
      process.stdout.write(`  📄 Uploading ${filename}... `);
      try {
        await client.uploadFrom(localPath, remotePath);
        console.log(`${c.green}✅ Done!${c.reset}`);
      } catch (e) {
        console.log(`${c.red}❌ FAILED: ${e.message}${c.reset}`);
      }
    }

    console.log(`\n${c.green}${c.bold}✅ All PDFs uploaded successfully!${c.reset}`);
    console.log(`${c.dim}🌐 Live at: https://mathwaa.org.sa/docs/${c.reset}\n`);

  } catch (e) {
    console.log(`${c.red}❌ FTP Error: ${e.message}${c.reset}`);
    process.exit(1);
  } finally {
    client.close();
  }
}

upload();
