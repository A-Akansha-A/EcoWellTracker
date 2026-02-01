// ================= TIME + GREETING =================
const greetingEl = document.getElementById("timeGreeting");
const dateEl = document.getElementById("fullDate");
const welcomeUser = document.getElementById("welcomeUser");
const quoteEl = document.getElementById("quote");

const now = new Date();
const hours = now.getHours();

let greeting = "Good Evening";
if (hours < 12) greeting = "Good Morning";
else if (hours < 18) greeting = "Good Afternoon";

greetingEl.innerText = greeting;
dateEl.innerText = now.toDateString();

const userName = localStorage.getItem("ecoUser") || "User";
welcomeUser.innerText = `Welcome back, ${userName} 💚`;
quoteEl.innerText = "Small habits make a big difference 🌱";


// ================= WATER =================
let water = 0;
const maxWater = 8;

const waterStroke = document.getElementById("waterStroke");
const waterText = document.getElementById("waterText");
const hydroPercent = document.getElementById("hydroPercent");

// SVG math
const radius = 50;
const circumference = 2 * Math.PI * radius;

// 🔥 MOST IMPORTANT LINES
waterStroke.style.strokeDasharray = circumference;
waterStroke.style.strokeDashoffset = circumference;

function addWater() {
  if (water >= maxWater) return;

  water++;
  const percent = water / maxWater;
  const offset = circumference - percent * circumference;

  waterStroke.style.strokeDashoffset = offset;
  waterText.innerText = `${water} / ${maxWater} glasses`;
  hydroPercent.innerText = Math.round(percent * 100) + "%";

  updateScore();
}


// ================= STEPS =================
let stepGoal = 5000;
let stepsDone = 0;

function setGoal() {
  const select = document.getElementById("goalSelect");
  const custom = document.getElementById("customGoal");

  if (select.value === "custom") {
    custom.style.display = "block";
    custom.focus();
  } else {
    custom.style.display = "none";
    stepGoal = parseInt(select.value);
    updateSteps();
  }
}

function addSteps() {
  const input = document.getElementById("stepsInput");
  const value = parseInt(input.value);

  if (isNaN(value)) return;

  if (document.getElementById("goalSelect").value === "custom") {
    stepGoal = parseInt(document.getElementById("customGoal").value);
  }

  stepsDone += value;
  input.value = "";
  updateSteps();
}

function updateSteps() {
  const percent = Math.min(100, Math.round((stepsDone / stepGoal) * 100));
  document.getElementById("stepsInfo").innerText =
    `${percent}% complete • ${Math.max(stepGoal - stepsDone, 0)} left`;

  updateScore();
}


// ================= MOOD =================
function setMood(el, emoji) {
  document.getElementById("mainEmoji").innerText = emoji;
  document.querySelectorAll(".mood").forEach(m => m.classList.remove("active"));
  el.classList.add("active");
  updateScore();
}


// ================= TASKS =================
function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  const li = document.createElement("li");

  li.innerHTML = `
    <label>
      <input type="checkbox" onchange="updateScore(); updateEco()">
      ${input.value}
    </label>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";

  updateEco();
}

function updateEco() {
  const checks = document.querySelectorAll("#taskList input:checked").length;
  document.getElementById("ecoText").innerText = `${checks} completed`;
  document.getElementById("ecoActions").innerText = `${checks} actions`;
}


// ================= SCORE =================
function updateScore() {
  let score = 0;
  score += water * 5;          // 40
  score += Math.min(30, Math.round((stepsDone / stepGoal) * 30));
  score += document.querySelectorAll("#taskList input:checked").length * 5;

  document.getElementById("score").innerText = Math.min(score, 100);
}
updateScore();

function saveStats() {
  const stats = {
    water,
    steps: stepsDone,
    mood: document.getElementById("mainEmoji").innerText,
    tasks: document.querySelectorAll("#taskList input:checked").length,
    date: new Date().toDateString()
  };

  let history = JSON.parse(localStorage.getItem("ecoStats")) || [];
  history.push(stats);

  // sirf last 7 days rakhenge
  if (history.length > 7) history.shift();

  localStorage.setItem("ecoStats", JSON.stringify(history));
}
saveStats();
