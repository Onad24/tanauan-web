#!/usr/bin/env node
/** Continuation: office_page_data OCR/docx text, MTO portraits, PESO award pics */
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const ROOT = '/home/krixan/Documents/tanauan/tanauan-leyte-clone';
const DRIVE_ROOT = path.join(ROOT, 'migration/drive_data');
const OCR_DIR  = path.join(ROOT, 'migration/extracted_ocr');
const DOCX_DIR = path.join(ROOT, 'migration/extracted');
const BUCKET = 'posts';

const rawEnv = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
function envVal(key){ const l=rawEnv.split('\n').find(x=>x.startsWith(key+'=')); return l?l.split('=').slice(1).join('=').trim():''; }
const sa = JSON.parse(Buffer.from(envVal('PRIVATE_FIREBASE_SERVICE_ACCOUNT'),'base64').toString('utf8'));
const app = getApps().length?getApps()[0]:initializeApp({credential:cert(sa)});
const db = getFirestore(app);
const supa = createClient(envVal('VITE_SUPABASE_URL'), envVal('VITE_SUPABASE_ANON_KEY'));

function officeSlug(driveFolder){
  const map={'MACCO':'accounting','MAO':'agriculture','MASSO':'assessors','MBO':'budget','MCR':'civil-registrar','MEO':'engineering','GSO':'gso','MHO':'health-office','HRMO':'hrmo','IT':'it','MARKET':'market','MTO':'treasurer','PESO':'peso','MPDO':'planning','MDRRMO':'mdrrmo','MENRO':'environment','SB':'sanggunian','MSWDO':'social-welfare','TOURISM':'tourism','MPCO':'property-custodian'};
  return map[driveFolder]||driveFolder.toLowerCase().replace(/[^a-z0-9]+/g,'-');
}
function extOf(p){const b=path.basename(p);const d=b.lastIndexOf('.');return d>0?b.slice(d).toLowerCase():'';}
function mime(p){const m={'.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf'};return m[extOf(p)]||'application/octet-stream';}
async function upload(localPath){
  const fn=`${Date.now()}_${path.basename(localPath).replace(/[^a-zA-Z0-9._-]/g,'_')}`;
  const {error}=await supa.storage.from(BUCKET).upload(fn,fs.readFileSync(localPath),{contentType:mime(localPath)});
  if(error){console.log('  ✗',path.basename(localPath),error.message);return null;}
  return supa.storage.from(BUCKET).getPublicUrl(fn).data.publicUrl;
}
const ts=()=>Timestamp.now();

(async()=>{
  // ── 1. office_page_data text ──
  const textGroups={};
  const getG=(k)=>{if(!textGroups[k])textGroups[k]={charter:[],orgChart:[],services:[]};return textGroups[k];};
  for(const f of fs.readdirSync(OCR_DIR)){ if(!f.endsWith('.txt'))continue;
    const raw=fs.readFileSync(path.join(OCR_DIR,f),'utf8');
    const slug=officeSlug(f.split('__')[0]);
    if(/CC|charter/i.test(f))getG(slug).charter.push(raw);
    else getG(slug).orgChart.push(raw);
  }
  for(const f of fs.readdirSync(DOCX_DIR)){ if(!f.endsWith('.txt'))continue;
    const raw=fs.readFileSync(path.join(DOCX_DIR,f),'utf8');
    const slug=officeSlug(f.split('__')[0]);
    if(/citizens.*charter|CC/i.test(f))getG(slug).charter.push(raw);
    else getG(slug).services.push(raw);
  }
  console.log('\n▸ office_page_data:',Object.keys(textGroups).length,'text groups');
  for(const [slug,g] of Object.entries(textGroups)){
    const all=[...g.charter,...g.orgChart,...g.services].join('\n\n---\n\n');
    if(all.trim().length<20)continue;
    await db.collection('office_page_data').doc(slug).set({ocrText:all.trim(),updatedAt:Timestamp.now(),updatedBy:'Migration Script'},{merge:true});
    console.log('  +',slug,all.length,'chars');
  }

  // ── 2. MTO portraits → users ──
  const mtoDir=path.join(DRIVE_ROOT,'MTO/2. Organizational Structure');
  let userCount=0;
  if(fs.existsSync(mtoDir)){
    console.log('\n▸ MTO portraits');
    for(const f of fs.readdirSync(mtoDir)){
      if(!/\.(jpg|jpeg|png)$/i.test(f))continue;
      const name=f.replace(/\.(jpg|jpeg|png)$/i,'').replace(/,/g,' ').replace(/_/g,' ').trim();
      const url=await upload(path.join(mtoDir,f)); if(!url)continue;
      await db.collection('users').add({name,role:'Public Officer',department:'Treasurer',office:'Municipal Treasurer Office',portrait:url,active:true,date_added:Timestamp.now()});
      console.log('  +',name); userCount++;
    }
  }
  console.log('  users added:',userCount);

  // ── 3. PESO award: append missing pics + rating pdf ──
  const pesoDir=path.join(DRIVE_ROOT,'PESO/BEST PESO 2025');
  const awardIds=[];
  const snap=await db.collection('awards').where('awards','==','Best PESO 2025').get();
  snap.forEach(d=>awardIds.push(d.id));
  console.log('\n▸ PESO award doc ids:',awardIds);
  for(const id of awardIds){
    const ref=db.collection('awards').doc(id);
    const doc=await ref.get();
    const cur=doc.data()||{media:[]};
    const newMedia=[...(cur.media||[])];
    // add 3 pics (no ext) + rating pdf
    for(const f of fs.readdirSync(pesoDir)){
      const fp=path.join(pesoDir,f);
      if(!fs.statSync(fp).isFile())continue;
      if(/Best PESO pic|\brating/i.test(f)){
        const url=await upload(fp); if(url){newMedia.push(url);console.log('  + media',f);}
      }
    }
    await ref.update({media:[...new Set(newMedia)]});
  }
  console.log('\nDONE');
  process.exit(0);
})().catch(e=>{console.error('FATAL',e);process.exit(1);});