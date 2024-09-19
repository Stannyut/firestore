import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmRK-THcQOhjUVpG3ZlP3KA_0RagdRnXU",
  authDomain: "database-crud-b333b.firebaseapp.com",
  projectId: "database-crud-b333b",
  storageBucket: "database-crud-b333b.appspot.com",
  messagingSenderId: "455407957014",
  appId: "1:455407957014:web:ce652bb93c85c99f5e7137",
  measurementId: "G-33S2F8201Y",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 