const data = JSON.parse(localStorage.getItem("ecoStats")) || [];

if (data.length === 0) {
  alert("No data yet. Use dashboard first 😊");
}

// averages
const avg = (arr, key) =>
  (arr.reduce((a, b) => a + (b[key] || 0), 0) / arr.length).toFixed(1);

document.getElementById("avgWater").innerText = avg(data, "water") + " glasses";
document.getElementById("avgSteps").innerText = avg(data, "steps");
document.getElementById("avgEco").innerText = avg(data, "tasks");

const moodScore = { "😁": 4, "🙂": 3, "😐": 2, "😔": 1 };
const moodAvg =
  data.reduce((a, b) => a + (moodScore[b.mood] || 0), 0) / data.length;

document.getElementById("avgMood").innerText = moodAvg.toFixed(1) + " / 4";

// charts
const labels = data.map(d => d.date);

new Chart(document.getElementById("waterChart"), {
  type: "line",
  data: {
    labels,
    datasets: [{
      label: "Water Intake",
      data: data.map(d => d.water),
      borderWidth: 2,
      fill: false
    }]
  }
});

new Chart(document.getElementById("stepsChart"), {
  type: "bar",
  data: {
    labels,
    datasets: [{
      label: "Steps",
      data: data.map(d => d.steps)
    }]
  }
});
