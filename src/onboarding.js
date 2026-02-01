import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { app } from "./firebase.js";

console.log("Onboarding JS loaded");

const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Ensure user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 🧭 Step navigation
  const steps = document.querySelectorAll(".step");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const progressBar = document.getElementById("progressBar");
  const finishBtn = document.getElementById("finishBtn");

  let currentStep = 0;

  function updateUI() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    prevBtn.style.display = currentStep === 0 ? "none" : "block";
    nextBtn.style.display = currentStep === steps.length - 1 ? "none" : "block";
  }

  nextBtn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      updateUI();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
    }
  });

  // ✅ Attach save & redirect to Finish button
  finishBtn.addEventListener("click", async () => {
    console.log("Finish clicked");

    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    const name = document.getElementById("name").value.trim();
    const waterGoal = Number(document.getElementById("water").value);
    const stepGoal = Number(document.getElementById("steps").value);

    if (!name || waterGoal <= 0 || stepGoal <= 0) {
      alert("Please fill all fields correctly");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name,
          waterGoal,
          stepGoal,
          onboardingCompleted: true,
          createdAt: serverTimestamp()
        },
        { merge: true }
      );

      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  updateUI();
});

