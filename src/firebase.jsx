// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import 'dotenv/config'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTx_u7O_PhnHcvsrR2tTacHRae0sK_-cU",
  authDomain: "real-time-task-managemen-f48fa.firebaseapp.com",
  projectId: "real-time-task-managemen-f48fa",
  storageBucket: "real-time-task-managemen-f48fa.appspot.com",
  messagingSenderId: "531030745329",
  appId: "1:531030745329:web:570cf9047813e8ef820950",
  measurementId: "G-KQ8H38YHPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const subscribeToTasks = (callback) => {
  const tasksRef = collection(db, "tasks");
  const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });

  return unsubscribe;
};
