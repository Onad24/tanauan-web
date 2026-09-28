# Admin area setup and server-side sessions

This document explains how to configure the admin area, server-side Firebase Admin, and session cookies.

1. Firebase setup

---

- Create a Firebase project at https://console.firebase.google.com/
- Enable Email/Password sign-in in Authentication -> Sign-in method.
- Create at least one admin user under Authentication -> Users.
- Create Firestore database and collections `users` and `posts` (rules below).

2. Service account for server

---

You need a Firebase service account JSON for the server to verify tokens and create session cookies.

- In the Firebase console: Project Settings -> Service accounts -> Generate new private key. Save the downloaded JSON.
- Do NOT commit the JSON into your repo. Place it outside the repo or keep it secret.

3. Environment variables

---

Create a `.env` file (or set env vars) following `.env.example`.

Two ways to provide the service account to the app:

- FIREBASE_SERVICE_ACCOUNT: paste the JSON string (not recommended for VCS)
- FIREBASE_SERVICE_ACCOUNT_PATH: absolute path to the JSON file (recommended)

Also set the Vite client vars (VITE*FIREBASE*\*) so the browser app can use the Firebase Web SDK.

4. Install dependencies

---

Recommended dependency versions (adjust if needed):

- firebase: ^10.0.0
- firebase-admin: ^11.0.0

Install locally:

```bash
npm install firebase firebase-admin
```

If `npm install` fails with registry/version errors, try adjusting versions or check your npm registry settings.

5. How session flow works (secure)

---

- Client authenticates with Firebase Auth (email/password) -> receives an ID token.
- Client POSTs the ID token to `/admin/session`.
- Server verifies the ID token using the service account and calls `createSessionCookie(idToken, {expiresIn})`.
- Server sets an httpOnly `session` cookie containing the session cookie. This cookie is used server-side via `verifySessionCookie`.

6. Firestore security rules (example)

---

Restrict read/write to authenticated users only; tighten further for admin role checks.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{docId} {
      allow read, write: if request.auth != null;
    }
    match /posts/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

7. Firebase Storage security rules (for media uploads)

---

Allow authenticated users to upload and read media files in the `posts/media/` folder:

```js
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /posts/media/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

**Important:** If you get a CORS error when uploading, ensure:

1. Storage rules are set as above
2. You're authenticated (signed in) when uploading
3. Your bucket name in `.env` matches your Firebase project's storage bucket (e.g., `tanauan-web.firebasestorage.app`)

4. Run dev server

---

Start dev server:

```bash
npm run dev -- --host
```

Visit `/admin/login` and sign in with an auth user you created. After sign-in the server will create a session cookie and you will be able to access `/admin/users` and `/admin/posts`.

9. Production notes

---

- Use `Secure` cookie flag (already applied in production mode).
- Prefer creating short-lived ID tokens or rotate session cookie policy as needed.
- Consider checking custom claims for admin role before allowing CRUD operations.
