// Verify Firestore access + snapshot existing data
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const raw = fs.readFileSync('/home/krixan/Documents/tanauan/tanauan-leyte-clone/.env', 'utf8');
// The key is PRIVATE_FIREBASE_SERVICE_ACCOUNT= ewog... (space before b64)
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

const counts = {};
for (const coll of ['posts', 'officials', 'awards', 'others', 'users', 'office_page_data', 'nav_departments']) {
  const snap = await db.collection(coll).get();
  counts[coll] = snap.size;
}
console.log('COLLECTION COUNTS:', JSON.stringify(counts, null, 1));

// sample a few docs from each
for (const coll of ['posts', 'officials', 'office_page_data', 'awards']) {
  const snap = await db.collection(coll).limit(2).get();
  console.log(`\n--- ${coll} sample ---`);
  snap.forEach(d => console.log(d.id, '=>', JSON.stringify(d.data()).slice(0, 400)));
}
process.exit(0);