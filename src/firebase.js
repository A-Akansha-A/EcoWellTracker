import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4nj8LU_A_yPgiw3XyjJRTQZtyopk8qDM",
    authDomain: "ecowelltracker.firebaseapp.com",
    projectId: "ecowelltracker",
    storageBucket: "ecowelltracker.firebasestorage.app",
    messagingSenderId: "615122825524",
    appId: "1:615122825524:web:7ce8a0ccc4ed456af73561",
    measurementId: "G-60HPKS5Z24"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

console.log("Firebase initialized");
