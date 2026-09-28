// Get unique department values from each collection to verify naming convention
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const raw = fs.readFileSync('/home/krixan/Documents/tanauan/tanauan-leyte-clone/.env', 'utf8');
const lines = raw.split('\n');
let b64 = '';
for (const line of lines) {
  if (line.startsWith('PRIVATE_FIREBASE_SERVICE_ACCOUNT=')) {
    b64 = line.split('=').slice(1).join('=').trim();
    break;
  }
}
const sa = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(sa) });
const db = getFirestore(app);

// Get unique department values from posts
const postsSnap = await db.collection('posts').get();
const postDepts = new Set();
postsSnap.forEach(d => { const dept = d.data().department; if (dept) postDepts.add(dept); });
console.log('posts departments:', [...postDepts].sort());

// Get unique department values from others
const othersSnap = await db.collection('others').get();
const otherDepts = new Set();
othersSnap.forEach(d => { const dept = d.data().department; if (dept) otherDepts.add(dept); });
console.log('others departments:', [...otherDepts].sort());

// Get unique department values from awards
const awardsSnap = await db.collection('awards').get();
const awardDepts = new Set();
awardsSnap.forEach(d => { const dept = d.data().department; if (dept) awardDepts.add(dept); });
console.log('awards departments:', [...awardDepts].sort());

// Get office_page_data doc IDs
const opdSnap = await db.collection('office_page_data').get();
console.log('office_page_data IDs:', opdSnap.docs.map(d => d.id).sort());

process.exit(0);