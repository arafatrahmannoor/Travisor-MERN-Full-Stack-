// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAix5mXKf7cvvM6Ikr5tV8GPIDQ-Pxfvzc",
    authDomain: "my-project-52ddc.firebaseapp.com",
    projectId: "my-project-52ddc",
    storageBucket: "my-project-52ddc.appspot.com",
    messagingSenderId: "895168685856",
    appId: "1:895168685856:web:45eb0e4bd0bf31755f5945"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//  export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Helper function: Sign in with Google and return ID token
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Get the Firebase ID token
        const idToken = await user.getIdToken();

        return { user, idToken };
    } catch (error) {
        console.error("Google sign-in error:", error);
        throw error;
    }
}


export default app;