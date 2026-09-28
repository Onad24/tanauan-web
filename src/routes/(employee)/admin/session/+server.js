import initFirebaseAdmin from '$lib/firebaseAdmin';

// createSessionCookie flow: client sends idToken, server creates a session cookie (longer-lived) and sets it httpOnly
export async function POST({ request, cookies }) {
	let admin;
	try {
		admin = initFirebaseAdmin();
	} catch (e) {
		console.error('Firebase Admin init error:', e);
		return new Response('Session service is unavailable. Please contact IT.', { status: 500 });
	}

	let idToken;
	try {
		({ idToken } = await request.json());
	} catch {
		return new Response('Invalid request.', { status: 400 });
	}
	if (!idToken) return new Response('Missing sign-in token. Please try again.', { status: 400 });

	try {
		// recommended session length: 5 days (in ms)
		const expiresIn = 60 * 60 * 24 * 5 * 1000;
		const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
		const maxAge = Math.floor(expiresIn / 1000);

		cookies.set('session', sessionCookie, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge,
			secure: process.env.NODE_ENV === 'production'
		});

		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (e) {
		console.error('Failed to create session cookie:', e?.message || e);
		return new Response('Your session could not be established. Please sign in again.', {
			status: 401
		});
	}
}

export async function DELETE({ cookies }) {
	// Clear session cookie
	cookies.delete('session', { path: '/' });
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}
