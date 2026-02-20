
import { getApps, initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

export function initializeFirebase(): { 
  firebaseApp: FirebaseApp | null; 
  auth: Auth | null; 
  firestore: Firestore | null 
} {
  const apps = getApps();
  if (apps.length > 0) {
    const app = apps[0];
    return { firebaseApp: app, auth: getAuth(app), firestore: getFirestore(app) };
  }

  // Defensive check: if apiKey is missing, don't initialize to avoid crashes
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "") {
    console.warn("Firebase API Key is missing. Please check your environment variables.");
    return { firebaseApp: null, auth: null, firestore: null };
  }

  try {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    return { firebaseApp, auth, firestore };
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return { firebaseApp: null, auth: null, firestore: null };
  }
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
