import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Inicialización segura Singleton para Next.js (SSR / Cliente)
export const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(
      firebaseConfig.apiKey
        ? firebaseConfig
        : {
            apiKey: "dummy-key-for-build",
            authDomain: "dummy.firebaseapp.com",
            projectId: "dummy-project",
            storageBucket: "dummy.appspot.com",
            messagingSenderId: "000000000000",
            appId: "1:000000000000:web:dummy",
          }
    );

export const auth: Auth = getAuth(app);
