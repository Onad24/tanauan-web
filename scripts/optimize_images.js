import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const srcRoot = path.resolve('static/Tourist Spots images');
const dstRoot = path.resolve('static/tourist-spots-web');

if (!fs.existsSync(dstRoot)) {
  fs.mkdirSync(dstRoot, { recursive: true });
}

// Copy top level images (logos)
const topFiles = fs.readdirSync(srcRoot, { withFileTypes: true });
for (const item of topFiles) {
  if (item.isFile()) {
    const srcFile = path.join(srcRoot, item.name);
    const dstFile = path.join(dstRoot, item.name);
    fs.copyFileSync(srcFile, dstFile);
    console.log(`Copied top-level: ${item.name}`);
  }
}

// Directories
for (const item of topFiles) {
  if (item.isDirectory()) {
    const dirName = item.name;
    const cleanDir = dirName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const outDir = path.join(dstRoot, cleanDir);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const subFiles = fs.readdirSync(path.join(srcRoot, dirName));
    for (const sub of subFiles) {
      const srcFile = path.join(srcRoot, dirName, sub);
      const ext = path.extname(sub).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        const cleanBase = path.basename(sub, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
        const outFile = path.join(outDir, `${cleanBase}.webp`);
        
        const stat = fs.statSync(srcFile);
        console.log(`Processing ${dirName}/${sub} (${Math.round(stat.size / 1024)} KB)...`);
        
        // ffmpeg scale to max 1920 width, preserve aspect ratio, convert to webp quality 82
        try {
          execSync(`ffmpeg -i "${srcFile}" -vf "scale=min(1920\\,iw):-2" -c:v libwebp -quality 82 "${outFile}" -y -loglevel error`);
          const outStat = fs.statSync(outFile);
          console.log(` -> Saved: ${cleanDir}/${cleanBase}.webp (${Math.round(outStat.size / 1024)} KB)`);
        } catch (err) {
          console.error(`Failed to process ${srcFile}:`, err.message);
        }
      }
    }
  }
}
console.log('Done optimizing images!');
