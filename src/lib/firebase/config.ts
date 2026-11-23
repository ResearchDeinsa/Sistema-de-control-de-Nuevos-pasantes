import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyA5lHikWyYU986olpqqD7XOi9AE6XN82JI",
  authDomain: "deinsaglobal-onboarding.firebaseapp.com",
  projectId: "deinsaglobal-onboarding",
  storageBucket: "deinsaglobal-onboarding.firebasestorage.app",
  messagingSenderId: "716928349715",
  appId: "1:716928349715:web:e7d16c1b568900d08031e6",
  measurementId: "G-PJ1QDC8K9H",
};

// Inicialización segura Singleton para Next.js (SSR / Cliente)
export const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
