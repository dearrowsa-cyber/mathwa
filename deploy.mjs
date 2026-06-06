/**
 * 🚀 Mathwaa Smart Auto-Deploy
 * Only uploads CHANGED files using hash caching
 * 
 * Usage:
 *   npm run deploy          → Build + Deploy Frontend (changed only)
 *   npm run deploy:front    → Build + Deploy Frontend only
 *   npm run deploy:back     → Deploy Backend only (changed only)
 *   npm run deploy:all      → Build + Deploy Everything (changed only)
 *   npm run deploy:quick    → Deploy Frontend without build (changed only)
 *   npm run deploy:force    → Force re-upload ALL files
 */

import { Client } from 'basic-ftp';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative, posix } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cache file path
const CACHE_FILE = join(__dirname, '.deploy-cache.json');

// Load config
const config = JSON.parse(readFileSync(join(__dirname, 'deploy.config.json'), 'utf8'));

// Parse CLI args
const args = process.argv.slice(2);
const deployFrontend = args.includes('--front') || args.includes('--all') || args.length === 0 || args.every(a => a === '--skip-build' || a === '--force');
const deployBackend = args.includes('--back') || args.includes('--all');
const skipBuild = args.includes('--skip-build');
const forceAll = args.includes('--force');

// Colors
const c = {
  reset: '\x1b[0m', green: '\x1b[32m', yellow: '\x1b[33m',
  red: '\x1b[31m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m',
};

function log(icon, msg) { console.log(`${c.cyan}${icon}${c.reset} ${msg}`); }
function success(msg) { console.log(`${c.green}✅ ${msg}${c.reset}`); }
function warn(msg) { console.log(`${c.yellow}⚠️  ${msg}${c.reset}`); }
function error(msg) { console.log(`${c.red}❌ ${msg}${c.reset}`); }

// ---- HASH CACHE ----
function loadCache() {
  try {
    if (existsSync(CACHE_FILE)) {
      return JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch (e) { }
  return {};
}

function saveCache(cache) {
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

function fileHash(filePath) {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex');
}

// ---- FILE SCANNING ----
function shouldExclude(name) {
  return config.exclude.some(pattern => {
    if (pattern.startsWith('*')) return name.endsWith(pattern.slice(1));
    if (pattern.endsWith('*')) return name.startsWith(pattern.slice(0, -1));
    return name === pattern;
  });
}

function getAllFiles(dirPath, basePath = dirPath) {
  const files = [];
  if (!existsSync(dirPath)) return files;
  const items = readdirSync(dirPath);
  for (const item of items) {
    if (shouldExclude(item)) continue;
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, basePath));
    } else {
      files.push({
        localPath: fullPath,
        relativePath: relative(basePath, fullPath).replace(/\\/g, '/'),
        size: stat.size,
      });
    }
  }
  return files;
}

/**
 * Filter to only changed files using hash cache
 */
function getChangedFiles(files, cacheKey, cache) {
  if (forceAll) return { changed: files, unchanged: 0 };

  const sectionCache = cache[cacheKey] || {};
  const changed = [];
  let unchanged = 0;

  for (const file of files) {
    const hash = fileHash(file.localPath);
    file._hash = hash;
    if (sectionCache[file.relativePath] === hash) {
      unchanged++;
    } else {
      changed.push(file);
    }
  }

  return { changed, unchanged };
}

/**
 * Upload only changed files
 */
async function uploadFiles(client, localDir, remoteDir, label, cache) {
  const allFiles = getAllFiles(localDir);
  const cacheKey = label.toLowerCase();
  const { changed, unchanged } = getChangedFiles(allFiles, cacheKey, cache);

  console.log('');
  log('📦', `${c.bold}${label}${c.reset}`);
  console.log(`${c.dim}   Total: ${allFiles.length} files | Changed: ${c.yellow}${changed.length}${c.reset}${c.dim} | Unchanged: ${unchanged}${c.reset}`);

  if (changed.length === 0) {
    success(`${label}: Nothing changed — skipping! ⚡`);
    return { uploaded: 0, skipped: unchanged, errors: 0 };
  }

  let uploaded = 0;
  let errors = 0;
  const sectionCache = cache[cacheKey] || {};

  for (const file of changed) {
    const remotePath = posix.join(remoteDir, file.relativePath);
    const remoteFileDir = posix.dirname(remotePath);

    try {
      await client.ensureDir(remoteFileDir);
      await client.cd('/');
      await client.uploadFrom(file.localPath, remotePath);
      uploaded++;

      // Update cache
      sectionCache[file.relativePath] = file._hash;

      const pct = Math.round((uploaded / changed.length) * 100);
      const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
      const sizeKB = (file.size / 1024).toFixed(0);
      process.stdout.write(`\r   ${c.green}[${bar}]${c.reset} ${pct}% (${uploaded}/${changed.length}) ${c.dim}${file.relativePath} (${sizeKB}KB)${' '.repeat(40)}${c.reset}`);
    } catch (e) {
      errors++;
      console.log('');
      error(`Failed: ${file.relativePath} - ${e.message}`);
    }
  }

  // Save updated cache
  cache[cacheKey] = sectionCache;

  console.log('');
  if (errors === 0) {
    success(`${label}: ${uploaded} files uploaded, ${unchanged} skipped ⚡`);
  } else {
    warn(`${label}: ${uploaded} uploaded, ${errors} failed, ${unchanged} skipped`);
  }

  return { uploaded, skipped: unchanged, errors };
}

// ---- MAIN ----
async function deploy() {
  console.log('');
  console.log(`${c.cyan}${c.bold}╔══════════════════════════════════════════════╗${c.reset}`);
  console.log(`${c.cyan}${c.bold}║     🚀 Mathwaa Smart Deploy ${forceAll ? '(FORCE)' : '(Changed Only)'}  ║${c.reset}`);
  console.log(`${c.cyan}${c.bold}╚══════════════════════════════════════════════╝${c.reset}`);

  const startTime = Date.now();
  const cache = loadCache();

  // Build
  if (deployFrontend && !skipBuild) {
    log('🔨', `${c.bold}Building frontend...${c.reset}`);
    try {
      execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });
      success('Build complete!');
    } catch (e) {
      error('Build failed!');
      process.exit(1);
    }
  } else if (skipBuild) {
    warn('Skipping build (--skip-build)');
  }

  // Connect
  const client = new Client();
  client.ftp.verbose = false;

  try {
    log('🔌', `${c.bold}Connecting to Hostinger...${c.reset}`);
    await client.access({
      host: config.ftp.host,
      port: config.ftp.port,
      user: config.ftp.user,
      password: config.ftp.password,
      secure: config.ftp.secure,
    });
    success('Connected!');

    let totalUploaded = 0, totalSkipped = 0, totalErrors = 0;

    // Frontend
    if (deployFrontend) {
      const distPath = join(__dirname, 'dist');
      if (!existsSync(distPath)) {
        error('dist/ not found! Run "npm run build" first.');
        process.exit(1);
      }
      const r = await uploadFiles(client, distPath, config.paths.frontendRemote, 'Frontend', cache);
      totalUploaded += r.uploaded;
      totalSkipped += r.skipped;
      totalErrors += r.errors;
    }

    // Backend
    if (deployBackend) {
      const backendPath = join(__dirname, '..', 'Backend');
      if (!existsSync(backendPath)) {
        error('Backend/ not found!');
        process.exit(1);
      }
      const r = await uploadFiles(client, backendPath, config.paths.backendRemote, 'Backend', cache);
      totalUploaded += r.uploaded;
      totalSkipped += r.skipped;
      totalErrors += r.errors;
    }

    // Save cache
    saveCache(cache);

    // Summary
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('');
    console.log(`${c.cyan}${c.bold}══════════════════════════════════════════════${c.reset}`);
    console.log(`${c.green}${c.bold}  ✅ Deploy Complete!${c.reset}`);
    console.log(`${c.dim}  📤 Uploaded: ${totalUploaded} files${c.reset}`);
    console.log(`${c.dim}  ⚡ Skipped:  ${totalSkipped} files (unchanged)${c.reset}`);
    if (totalErrors > 0) console.log(`${c.red}  ❌ Errors:   ${totalErrors}${c.reset}`);
    console.log(`${c.dim}  ⏱️  Time:     ${elapsed}s${c.reset}`);
    console.log(`${c.dim}  🌐 Site:     https://mathwaa.org.sa${c.reset}`);
    console.log(`${c.cyan}${c.bold}══════════════════════════════════════════════${c.reset}`);
    console.log('');

  } catch (e) {
    error(`FTP Error: ${e.message}`);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();
