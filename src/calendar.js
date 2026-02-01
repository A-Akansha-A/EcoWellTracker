import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const daysTag = document.querySelector(".days"),
      currentDateLabel = document.querySelector(".current-date"),
      prev = document.getElementById("prev"),
      next = document.getElementById("next"),
      dayDetail = document.getElementById("dayDetail");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

function renderCalendar(){
    daysTag.innerHTML = "";
    currentDateLabel.innerText = `${months[currMonth]} ${currYear}`;

    const firstDay = new Date(currYear, currMonth, 1).getDay();
    const lastDate = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDay = new Date(currYear, currMonth, lastDate).getDay();
    const prevLastDate = new Date(currYear, currMonth, 0).getDate();

    // Previous month's last days
    for(let i=firstDay; i>0; i--){
      const li = document.createElement("li");
      li.classList.add("inactive");
      li.innerText = prevLastDate - i +1;
      daysTag.appendChild(li);
    }

    // Current month days
    for(let i=1;i<=lastDate;i++){
      const li = document.createElement("li");
      li.innerText = i;
      if(i===date.getDate() && currMonth===new Date().getMonth() && currYear===new Date().getFullYear()){
        li.classList.add("active");
      }
      li.addEventListener("click", ()=>showDayDetail(i));
      daysTag.appendChild(li);
    }

    // Next month first days
    for(let i=lastDay;i<6;i++){
      const li = document.createElement("li");
      li.classList.add("inactive");
      li.innerText = i - lastDay +1;
      daysTag.appendChild(li);
    }
}

prev.addEventListener("click", ()=>{
  currMonth--;
  if(currMonth<0){ currMonth=11; currYear--; }
  renderCalendar();
});

next.addEventListener("click", ()=>{
  currMonth++;
  if(currMonth>11){ currMonth=0; currYear++; }
  renderCalendar();
});

document.getElementById("closeDetail").addEventListener("click", ()=>{
  dayDetail.classList.add("hidden");
});

onAuthStateChanged(auth, async(user)=>{
  if(!user){ window.location.href="index.html"; return; }
  window.currentUser = user;
  renderCalendar();
});

// Show day detail modal with Firebase data
async function showDayDetail(day){
  const dateStr = `${currYear}-${(currMonth+1).toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
  const uid = window.currentUser.uid;

  let data = null;
  try{
    const snap = await getDoc(doc(db,"users",uid,"logs",dateStr));
    if(snap.exists()){ data = snap.data(); }
  }catch(e){ console.log(e); }

  document.getElementById("detailDate").innerText = dateStr;
  document.getElementById("detailWater").innerText = (data?.water||0)+"/8 glasses";
  document.getElementById("detailSteps").innerText = data?.steps||0;
  document.getElementById("detailMood").innerText = data?.mood||"–";
  document.getElementById("detailNote").innerText = data?.note||"–";

  dayDetail.classList.remove("hidden");
}

