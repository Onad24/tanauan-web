#!/usr/bin/env node
/**
 * Full migration: drive_data → Firestore + Supabase Storage
 *
 * Collections written:
 *   - others  : org charts, citizens charter tarps, downloadable forms
 *   - posts   : accomplishment reports, activity photos
 *   - awards  : PESO BEST PESO 2025
 *   - office_page_data: citizens charter text, mandates, services
 *   - users   : MTO personnel portraits (if identifiable)
 */
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// ── config ──────────────────────────────────────────────────────────────────
const ROOT = '/home/krixan/Documents/tanauan/tanauan-leyte-clone';
const DRIVE_ROOT = path.join(ROOT, 'migration/drive_data');
const OCR_DIR    = path.join(ROOT, 'migration/extracted_ocr');
const DOCX_DIR   = path.join(ROOT, 'migration/extracted');
const LOG_FILE   = path.join(ROOT, 'migration/import_log.json');
const BUCKET     = 'posts';

// ── firebase admin ──────────────────────────────────────────────────────────
const rawEnv = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
function envVal(key) {
  const line = rawEnv.split('\n').find(l => l.startsWith(key + '='));
  return line ? line.split('=').slice(1).join('=').trim() : '';
}
const saB64 = envVal('PRIVATE_FIREBASE_SERVICE_ACCOUNT');
const sa = JSON.parse(Buffer.from(saB64, 'base64').toString('utf8'));
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(sa) });
const db = getFirestore(app);

// ── supabase (anon key — RLS allows unauthenticated writes) ─────────────────
const supaUrl = envVal('VITE_SUPABASE_URL');
const supaKey = envVal('VITE_SUPABASE_ANON_KEY');
const supa = createClient(supaUrl, supaKey);

// ── helpers ─────────────────────────────────────────────────────────────────
function readEnv(key) {
  const line = rawEnv.split('\n').find(l => l.startsWith(key + '='));
  return line ? line.split('=').slice(1).join('=').trim() : '';
}

function extOf(filePath) {
  const base = path.basename(filePath);
  const dot = base.lastIndexOf('.');
  return dot > 0 ? base.slice(dot).toLowerCase() : '';
}

function isMediaFile(filePath) {
  return /\.(jpg|jpeg|png|webp|pdf|docx|xlsx)$/i.test(filePath);
}

function isImageFile(filePath) {
  return /\.(jpg|jpeg|png|webp)$/i.test(filePath);
}

function isVideoFile(filePath) {
  return /\.(mp4|webm|ogg|mov)$/i.test(filePath);
}

async function uploadFile(localPath) {
  const fileName = `${Date.now()}_${path.basename(localPath).replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const data = fs.readFileSync(localPath);
  const { error } = await supa.storage.from(BUCKET).upload(fileName, data, {
    contentType: guessMime(localPath),
    upsert: false,
  });
  if (error) {
    console.error(`  ✗ upload failed ${path.basename(localPath)}: ${error.message}`);
    return null;
  }
  const { data: pub } = supa.storage.from(BUCKET).getPublicUrl(fileName);
  return pub.publicUrl;
}

function guessMime(p) {
  const ext = extOf(p);
  const map = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.pdf': 'application/pdf',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return map[ext] || 'application/octet-stream';
}

function ts() { return Timestamp.now(); }

function safeDept(driveFolder) {
  // Map Drive folder names → department names used in the existing DB.
  // Posts and others collections use these short names.
  const map = {
    'BAC': 'BAC',
    'BPLO': 'BPLO',
    'GSO': 'GSO',
    'HRMO': 'HRMO',
    'IT': 'IT',
    'MACCO': 'Accounting',
    'MAO': 'Agriculture',
    'MARKET': 'Market',
    'MASSO': 'Assessors',
    'MBO': 'Budget',
    'MCR': 'Civil Registrar',
    'MDRRMO': 'MDRRMO',
    'MENRO': 'Environment',
    'MEO': 'Engineering',
    'MHO': 'Health Office',
    'MPCO': 'Property Custodian',
    'MPDO': 'Planning',
    'MSWDO': 'Social Welfare',
    'MTO': 'Treasurer',
    'PESO': 'PESO',
    'PROCUREMENT': 'Procurement',
    'SB': 'Sanggunian',
    'SLAUGHTERHOUSE': 'Slaughterhouse',
    'TOURISM': 'Tourism',
    'VICE_MAYOR': 'Vice Mayor',
  };
  return map[driveFolder] || driveFolder;
}

function officeSlug(driveFolder) {
  // office_page_data collection uses slugified keys
  const map = {
    'MACCO': 'accounting',
    'MAO': 'agriculture',
    'MASSO': 'assessors',
    'MBO': 'budget',
    'MCR': 'civil-registrar',
    'MEO': 'engineering',
    'GSO': 'gso',
    'MHO': 'health-office',
    'HRMO': 'hrmo',
    'IT': 'it',
    'Licensing': 'licensing',
    'MARKET': 'market',
    'MTO': 'treasurer',
    'PESO': 'peso',
    'MPDO': 'planning',
    'MDRRMO': 'mdrrmo',
    'MENRO': 'environment',
    'SB': 'sanggunian',
    'MSWDO': 'social-welfare',
    'TOURISM': 'tourism',
    'MPCO': 'property-custodian',
  };
  return map[driveFolder] || map[safeDept(driveFolder)] || driveFolder.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// ── log ─────────────────────────────────────────────────────────────────────
const log = { posts: 0, others: 0, awards: 0, office_page_data: 0, users: 0, uploads: 0, errors: [] };

function logErr(msg) {
  log.errors.push(msg);
  console.error('ERR:', msg);
}

// ── collect all files ───────────────────────────────────────────────────────
function walkFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(walkFiles(full));
    else files.push(full);
  }
  return files;
}

// ── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  const deptFolders = fs.readdirSync(DRIVE_ROOT).filter(f =>
    fs.statSync(path.join(DRIVE_ROOT, f)).isDirectory()
  );

  console.log(`\n=== MIGRATION START — ${deptFolders.length} departments ===\n`);

  // ──────────────────────────────────────────────────────────────────────────
  // PHASE 1: Organizational Charts → others (type: 'Organizational Chart')
  // PHASE 2: Citizens Charter tarps → others (type: 'Citizens Charter')
  // PHASE 3: Downloadable Forms / PDFs → others (type: 'Downloadable Forms')
  // PHASE 4: Accomplishment Reports → posts (type: 'accomplishment')
  // PHASE 5: Awards → awards
  // PHASE 6: office_page_data text content
  // PHASE 7: Personnel portraits (MTO) → users
  // ──────────────────────────────────────────────────────────────────────────

  for (const folder of deptFolders) {
    const dept = safeDept(folder);
    const deptPath = path.join(DRIVE_ROOT, folder);
    console.log(`\n▸ ${folder} → dept="${dept}"`);

    const allFiles = walkFiles(deptPath);

    // ── ORG CHARTS ──────────────────────────────────────────────────────
    const orgChartFiles = allFiles.filter(f =>
      /organiz|org.chart|org.struct|chart/i.test(f) && !/accomplishment|personnel_list/i.test(f)
    );
    if (orgChartFiles.length > 0) {
      const urls = [];
      for (const f of orgChartFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Organizational Chart',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Organizational Chart (${urls.length} files)`);
      }
    }

    // ── CITIZENS CHARTER ────────────────────────────────────────────────
    const ccFiles = allFiles.filter(f =>
      /citizens?\s*charter|CC\s/i.test(path.basename(f)) && !/accomplishment/i.test(f)
    );
    if (ccFiles.length > 0) {
      const urls = [];
      for (const f of ccFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Citizens Charter',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Citizens Charter (${urls.length} files)`);
      }
    }

    // ── DOWNLOADABLE FORMS ──────────────────────────────────────────────
    // Files that are clearly forms, not org charts or charters
    const formFiles = allFiles.filter(f => {
      const bn = path.basename(f).toLowerCase();
      return (/form|checklist|permit|slip|request|application|registration|clearance|affidavit|schedule/i.test(bn) ||
              /forms?\//i.test(f)) &&
             !/accomplishment|organiz|citizens.*charter|CC\s/i.test(f) &&
             !/orgchart|org_struct/i.test(f);
    });
    if (formFiles.length > 0) {
      const urls = [];
      for (const f of formFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Downloadable Forms',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Downloadable Forms (${urls.length} files)`);
      }
    }

    // ── ACCOMPLISHMENT REPORTS ──────────────────────────────────────────
    const accompDir = allFiles.filter(f =>
      /accomplishment|BRAP|COLBs|Outstanding|drill|demolition|pension|case.finding|MR.SIA|immunization|earthquake/i.test(f)
    );
    // Group by subfolder
    const accompGroups = {};
    for (const f of accompDir) {
      // Find the most meaningful subfolder name
      const rel = path.relative(deptPath, f);
      const parts = rel.split(path.sep);
      let groupKey = 'Accomplishment Report';
      if (parts.length > 1) {
        // Use the subfolder name(s) as the group key
        groupKey = parts.slice(0, -1).join(' / ');
      }
      if (!accompGroups[groupKey]) accompGroups[groupKey] = [];
      accompGroups[groupKey].push(f);
    }
    for (const [group, files] of Object.entries(accompGroups)) {
      const urls = [];
      for (const f of files) {
        if (!isMediaFile(f)) continue;
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        // Derive a clean header from the group name
        const header = group.split('/').pop().trim()
          .replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        await db.collection('posts').add({
          header,
          content: `${header} — ${dept} Office`,
          department: dept,
          type: 'accomplishment',
          sectionSlug: '',
          sectionLabel: '',
          cardStyle: 'default',
          isFeatured: false,
          status: 'approved',
          approvedBy: 'Migration Script',
          submittedBy: 'Migration Script',
          link: '',
          media: urls,
          date_added: ts(),
        });
        log.posts++;
        console.log(`  + posts: "${header}" (${urls.length} media)`);
      }
    }

    // ── SERVICES OFFERED (non-form, non-image docs) ─────────────────────
    const serviceFiles = allFiles.filter(f =>
      /services?\s*offered|work\s*schedule|mission|vision|vision\s*and/i.test(path.basename(f)) &&
      !/accomplishment|organiz|chart|CC\s/i.test(f)
    );
    if (serviceFiles.length > 0) {
      const urls = [];
      for (const f of serviceFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Services Offered',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Services Offered (${urls.length} files)`);
      }
    }

    // ── WASTE CLASSIFICATION (MENRO-specific) ───────────────────────────
    const wasteFiles = allFiles.filter(f => /waste.classification/i.test(f));
    if (wasteFiles.length > 0) {
      const urls = [];
      for (const f of wasteFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Waste Classification',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Waste Classification (${urls.length} files)`);
      }
    }

    // ── FEES (MCR) ─────────────────────────────────────────────────────
    const feeFiles = allFiles.filter(f => /fees?\s*to\s*collect/i.test(f));
    if (feeFiles.length > 0) {
      const urls = [];
      for (const f of feeFiles) {
        const url = await uploadFile(f);
        if (url) { urls.push(url); log.uploads++; }
      }
      if (urls.length > 0) {
        await db.collection('others').add({
          department: dept,
          type: 'Fees to Collect',
          media: urls,
          date_added: ts(),
        });
        log.others++;
        console.log(`  + others: Fees to Collect (${urls.length} files)`);
      }
    }

    // ── MCR COLBs + OUTSTANDING (these are awards/recognition) ──────────
    // MCR accomplishments folder with photos of awards
    if (folder === 'MCR') {
      const awardFolders = ['Most Number of Registered COLBs', 'Most Outstanding Local Civil Registry Office'];
      for (const af of awardFolders) {
        const awardPath = path.join(deptPath, 'Accomplishments', af);
        if (!fs.existsSync(awardPath)) continue;
        const awardFiles = fs.readdirSync(awardPath).filter(f => isMediaFile(path.join(awardPath, f)));
        const urls = [];
        for (const f of awardFiles) {
          const url = await uploadFile(path.join(awardPath, f));
          if (url) { urls.push(url); log.uploads++; }
        }
        if (urls.length > 0) {
          await db.collection('awards').add({
            awards: af,
            awarding_body: 'Civil Service Commission',
            department: dept,
            description: `${af} — Municipal Civil Registrar Office, Tanauan, Leyte`,
            media: urls,
            year: '2024',
            date_added: ts(),
          });
          log.awards++;
          console.log(`  + awards: "${af}" (${urls.length} media)`);
        }
      }
    }
  }

  // ──────────────────────────────────────────────────────────────────────
  // AWARDS: PESO Best PESO 2025
  // ──────────────────────────────────────────────────────────────────────
  console.log('\n▸ PESO Best PESO 2025 Award');
  const pesoBestDir = path.join(DRIVE_ROOT, 'PESO/BEST PESO 2025');
  if (fs.existsSync(pesoBestDir)) {
    const pesoFiles = fs.readdirSync(pesoBestDir);
    const awardMedia = [];
    for (const f of pesoFiles) {
      const fp = path.join(pesoBestDir, f);
      if (isMediaFile(fp)) {
        const url = await uploadFile(fp);
        if (url) { awardMedia.push(url); log.uploads++; }
      }
    }
    await db.collection('awards').add({
      awards: 'Best PESO 2025',
      awarding_body: 'Department of Labor and Employment (DOLE)',
      department: 'PESO',
      description: 'Best Public Employment Service Office Award 2025 — Tanauan, Leyte',
      media: awardMedia,
      year: '2025',
      date_added: ts(),
    });
    log.awards++;
    console.log(`  + awards: "Best PESO 2025" (${awardMedia.length} media)`);
  }

  // ──────────────────────────────────────────────────────────────────────
  // OFFICE PAGE DATA: OCR text + extracted docx text
  // ──────────────────────────────────────────────────────────────────────
  console.log('\n▸ office_page_data text content');
  const ocrFiles = fs.existsSync(OCR_DIR) ? fs.readdirSync(OCR_DIR) : [];
  const textGroups = {}; // slug → { charter: [texts], orgChart: [texts] }
  for (const f of ocrFiles) {
    if (!f.endsWith('.txt')) continue;
    const raw = fs.readFileSync(path.join(OCR_DIR, f), 'utf8');
    const parts = f.replace('.txt', '').split('__');
    const driveDept = parts[0]; // e.g. "BPLO", "MACCO", "VICE_MAYOR"
    const slug = officeSlug(driveDept);
    if (!textGroups[slug]) textGroups[slug] = { charter: [], orgChart: [] };
    if (/CC|charter/i.test(f)) {
      textGroups[slug].charter.push(raw);
    } else {
      textGroups[slug].orgChart.push(raw);
    }
  }

  // Also read extracted DOCX texts
  const docxFiles = fs.existsSync(DOCX_DIR) ? fs.readdirSync(DOCX_DIR) : [];
  for (const f of docxFiles) {
    if (!f.endsWith('.txt')) continue;
    const raw = fs.readFileSync(path.join(DOCX_DIR, f), 'utf8');
    const driveDept = f.split('__')[0];
    const slug = officeSlug(driveDept);
    if (!textGroups[slug]) textGroups[slug] = { charter: [], orgChart: [], services: [] };
    if (/citizens.*charter|CC/i.test(f)) {
      textGroups[slug].charter.push(raw);
    } else if (/services.*offered|offices/i.test(f)) {
      textGroups[slug].services.push(raw);
    } else {
      textGroups[slug].services.push(raw);
    }
  }

  // Write to office_page_data
  for (const [slug, data] of Object.entries(textGroups)) {
    const allText = [...data.charter, ...data.services].join('\n\n---\n\n');
    if (allText.trim().length < 20) continue;
    const docRef = db.collection('office_page_data').doc(slug);
    await docRef.set({
      ocrText: allText.trim(),
      updatedAt: Timestamp.now(),
      updatedBy: 'Migration Script',
    }, { merge: true });
    log.office_page_data++;
    console.log(`  + office_page_data: "${slug}" (${allText.length} chars OCR text)`);
  }

  // ──────────────────────────────────────────────────────────────────────
  // MTO PERSONNEL PORTRAITS → users
  // ──────────────────────────────────────────────────────────────────────
  console.log('\n▸ MTO Personnel Portraits');
  const mtoOrgDir = path.join(DRIVE_ROOT, 'MTO/2. Organizational Structure');
  if (fs.existsSync(mtoOrgDir)) {
    const mtoFiles = fs.readdirSync(mtoOrgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    for (const f of mtoFiles) {
      const name = f.replace(/\.(jpg|jpeg|png)$/i, '').replace(/,/g, ' ').replace(/_/g, ' ').trim();
      const url = await uploadFile(path.join(mtoOrgDir, f));
      if (!url) continue;
      log.uploads++;
      await db.collection('users').add({
        name,
        role: 'Public Officer',
        department: 'Treasurer',
        office: 'Municipal Treasurer Office',
        portrait: url,
        active: true,
        date_added: ts(),
      });
      log.users++;
      console.log(`  + users: "${name}" (portrait)`);
    }
  }

  // ──────────────────────────────────────────────────────────────────────
  // MTO + MCR personnel list PDFs → others (type: 'Personnel List')
  // ──────────────────────────────────────────────────────────────────────
  console.log('\n▸ Personnel List PDFs');
  for (const folder of deptFolders) {
    const allFiles = walkFiles(path.join(DRIVE_ROOT, folder));
    const personnelFiles = allFiles.filter(f =>
      /personnel.*list|total.*personnel|total.*number.*personnel/i.test(path.basename(f))
    );
    if (personnelFiles.length === 0) continue;
    const urls = [];
    for (const f of personnelFiles) {
      const url = await uploadFile(f);
      if (url) { urls.push(url); log.uploads++; }
    }
    if (urls.length > 0) {
      await db.collection('others').add({
        department: safeDept(folder),
        type: 'Personnel List',
        media: urls,
        date_added: ts(),
      });
      log.others++;
      console.log(`  + others: Personnel List — ${folder} (${urls.length} files)`);
    }
  }

  // ── write log ─────────────────────────────────────────────────────────
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
  console.log(`\n=== MIGRATION COMPLETE ===`);
  console.log(`  Posts:           ${log.posts}`);
  console.log(`  Others:          ${log.others}`);
  console.log(`  Awards:          ${log.awards}`);
  console.log(`  Office Page:     ${log.office_page_data}`);
  console.log(`  Users (MTO):     ${log.users}`);
  console.log(`  Storage uploads: ${log.uploads}`);
  console.log(`  Errors:          ${log.errors.length}`);
  if (log.errors.length > 0) {
    console.log('\nErrors:');
    log.errors.forEach(e => console.log('  -', e));
  }
  process.exit(0);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
