
'use client';

import React, { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Firebase once on the client to avoid serialization errors
  const firebaseData = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider 
      firebaseApp={firebaseData.firebaseApp} 
      firestore={firebaseData.firestore} 
      auth={firebaseData.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
