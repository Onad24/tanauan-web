// Lightweight Firebase client initializer using Vite env vars.
// Set these in your environment (e.g. .env):
// VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
// VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID

// Lightweight Firebase client initializer using Vite env vars.
// Set these in your environment (e.g. .env):
// VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
// VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { browser } from '$app/environment';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDE7u2e6wfzt-N1cJLuhtRAEvOX1VeU4Bc',
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tanauan-web.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tanauan-web',
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tanauan-web.firebasestorage.app',
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '396361414616',
	appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:396361414616:web:305a6c880989e150b024ad',
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-N8X1NGZL4M'
};

// Safe singleton initialization
const app = getApps().length === 0
	? initializeApp(firebaseConfig)
	: getApp();

// Only initialize auth and db in the browser — avoids SSR hang on Vercel
export const auth = browser ? getAuth(app) : null;
export const db = browser ? getFirestore(app) : null;

export default app;
















// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
// 	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDE7u2e6wfzt-N1cJLuhtRAEvOX1VeU4Bc',
// 	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tanauan-web.firebaseapp.com',
// 	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tanauan-web',
// 	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tanauan-web.firebasestorage.app',
// 	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '396361414616',
// 	appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:396361414616:web:305a6c880989e150b024ad',
// 	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-N8X1NGZL4M'
// };

// import { getApp, getApps, initializeApp } from 'firebase/app';

// // Safe singleton initialization for Firebase
// export const app = getApps().length === 0
// 	? initializeApp(firebaseConfig)
// 	: getApp();


// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export default app;
