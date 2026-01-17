import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail

} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// SIGN UP
window.signup = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful 🎉");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
// LOGIN
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful ✅");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
};
// GOOGLE LOGIN
window.googleLogin = function () {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => {
      alert("Google login successful ✅");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
  };
  // FORGOT PASSWORD
window.forgotPassword = function () {
  const email = document.getElementById("login-email").value;

  if (!email) {
    alert("Please enter your email first");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent 📩");
    })
    .catch((error) => {
      alert(error.message);
    });
};
  

