
import type {Metadata} from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { initializeFirebase } from '@/firebase';

export const metadata: Metadata = {
  title: 'Diggs Nation | Official Steffon Diggs Fan Platform',
  description: 'Connect with Steffon Diggs, access exclusive content, and join the elite fan community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { firebaseApp, firestore, auth } = initializeFirebase();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
          <Navigation />
          <main>{children}</main>
          <footer className="border-t py-12 bg-card">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                  <span className="text-2xl font-black italic tracking-tighter text-primary">DIGGS NATION</span>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    The official engagement platform for Steffon Diggs. Join the elite community today.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 text-sm text-muted-foreground font-medium">
                  <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                  <a 
                    href="mailto:officialmanagement3067@gmail.com" 
                    className="hover:text-primary transition-colors flex items-center gap-2 break-all"
                  >
                    <span className="shrink-0 text-primary">Contact:</span>
                    officialmanagement3067@gmail.com
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Diggs Nation. All rights reserved.
              </div>
            </div>
          </footer>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
