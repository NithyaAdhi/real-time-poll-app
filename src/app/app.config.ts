// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core'; // <-- Notice importProvidersFrom is added
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// --- 1. ADD FIREBASE IMPORTS ---
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAq0newQmnRL9nFNbLHc1tnpqAXMM2VrO4",
  authDomain: "real-time-poll-app-413a9.firebaseapp.com",
  projectId: "real-time-poll-app-413a9",
  storageBucket: "real-time-poll-app-413a9.firebasestorage.app",
  messagingSenderId: "333128292835",
  appId: "1:333128292835:web:b05df99106e1b9a52de8d6"
};

//const app = initializeApp(firebaseConfig);



export const appConfig: ApplicationConfig = {
   providers: [
    // Your existing providers
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())

  ]
};

