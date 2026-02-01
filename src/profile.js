import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// On auth change
onAuthStateChanged(auth, async(user)=>{
  if(!user) { window.location.href="index.html"; return; }

  const uid = user.uid;

  // Profile info
  document.getElementById("userName").textContent = user.displayName || "EcoWell User";

  // Fetch stats & goals
  const ref = doc(db,"users",uid);
  const snap = await getDoc(ref);
  if(snap.exists()){
    const data = snap.data();

    // Stats
    document.getElementById("streak").textContent = `🔥 ${data.streak || 0}-day streak`;
    document.getElementById("streakStat").textContent = (data.streak || 0) + " days";
    document.getElementById("waterStat").textContent = (data.todayWater || 0) + "%";
    document.getElementById("stepsStat").textContent = data.todaySteps || 0;

    // Goals
    document.getElementById("waterGoal").textContent = (data.waterGoal || 0) + " glasses";
    document.getElementById("stepGoal").textContent = (data.stepGoal || 0) + " steps";

    // Settings toggles
    document.getElementById("remindersToggle").checked = data.reminders || false;
    document.getElementById("themeToggle").checked = data.darkMode || false;
  }
});
