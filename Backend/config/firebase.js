const admin = require('firebase-admin');

let initialized = false;
function initFirebaseAdmin() {
    if (initialized) return;
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
        console.warn('⚠️ Firebase Admin not fully configured. Google login verification will fail.');
        return;
    }
    const privateKey = FIREBASE_PRIVATE_KEY.includes('\\n')
        ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : FIREBASE_PRIVATE_KEY;
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey
        })
    });
    initialized = true;
}

async function verifyGoogleIdToken(idToken) {
    initFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(idToken);
    return decoded;
}

module.exports = { initFirebaseAdmin, verifyGoogleIdToken };
