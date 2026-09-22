// Firebase Admin initializer for server-side token verification and database operations.
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { env } from '$env/dynamic/private';

let app;

function getServiceAccount() {
	const rawVal =
		env.PRIVATE_FIREBASE_SERVICE_ACCOUNT ||
		process.env.PRIVATE_FIREBASE_SERVICE_ACCOUNT ||
		process.env.FIREBASE_SERVICE_ACCOUNT;

	if (rawVal) {
		const trimmed = rawVal.trim();

		// 1. If it looks like a JSON string directly
		if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
			try {
				return JSON.parse(trimmed);
			} catch (e) {
				console.error('Failed to parse service account JSON directly:', e.message);
			}
		}

		// 2. Try base64 decoding
		try {
			const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
			if (decoded.trim().startsWith('{')) {
				return JSON.parse(decoded);
			}
		} catch (e) {
			// ignore base64 decode errors
		}

		// 3. Fallback attempt direct JSON parse
		try {
			return JSON.parse(trimmed);
		} catch (e) {
			console.error('Failed to parse service account credentials:', e.message);
		}
	}

	return null;
}

export function initFirebaseAdmin() {
	const apps = getApps();
	if (apps.length) {
		app = apps[0];
	} else {
		const serviceAccount = getServiceAccount();
		if (!serviceAccount) {
			throw new Error(
				'Missing Firebase service account. Set PRIVATE_FIREBASE_SERVICE_ACCOUNT in .env'
			);
		}
		app = initializeApp({ credential: cert(serviceAccount) });
	}

	const auth = getAuth(app);
	const db = getFirestore(app);

	// Return a compatible admin object that supports:
	// admin.auth().verifySessionCookie(...)
	// admin.auth().createSessionCookie(...)
	// admin.firestore().collection(...)
	// admin.firestore.Timestamp.now()
	const adminObj = {
		app,
		auth: () => auth,
		firestore: Object.assign(() => db, { Timestamp, FieldValue })
	};

	return adminObj;
}

export async function getAdmin() {
	const adminApp = initFirebaseAdmin();
	return {
		admin: adminApp,
		auth: adminApp.auth(),
		db: adminApp.firestore()
	};
}

export default initFirebaseAdmin;
