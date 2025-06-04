
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY3EYIr-gRPSY5lfb6X5RXsbUDQ2EcBSc",
  authDomain: "sowsuccess-4fd00.firebaseapp.com",
  projectId: "sowsuccess-4fd00",
  storageBucket: "sowsuccess-4fd00.firebasestorage.app",
  messagingSenderId: "565105322253",
  appId: "1:565105322253:web:632683198218397a316844"
};
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
