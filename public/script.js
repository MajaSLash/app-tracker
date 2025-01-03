async function updateStats() {
    const response = await fetch('/api/stats');
    const stats = await response.json();
    document.getElementById('stats').innerHTML = `
      <p>Quick Apply Applications: ${stats.quickAppCounter} (${stats.quickAppGoal}% to goal)</p>
      <p>Web Apply Applications: ${stats.webAppCounter} (${stats.webAppGoal}% to goal)</p>
      <p>Total Applications: ${stats.totalApplications}</p>
    `;
}

//Time Functions
let startTime = performance.now();
let lastAppTime = performance.now();
let breakSecs = 216000; // 1 Hour; Adjust as needed

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateTime() {
  const sessionTime = (performance.now() - startTime) / 1000;
  const lastAppCounter = (performance.now() - lastAppTime) / 1000;
  const breakTime = (sessionTime > 1 && sessionTime.toFixed(0) % breakSecs == 0) ? true : false;
  document.getElementById('time').innerHTML = `
    <p>Session Time: ${formatTime(sessionTime)} </p>
    <p>Time Since Last Application: ${formatTime(lastAppCounter)} </p>
  `;
  if (breakTime) {
    alert("Take a break!");
  }
}


//Sound References
const quickApplySound = new Audio('sounds/taco_bell.mp3');
const webApplySound = new Audio('sounds/dj_khalid.mp3');

//Event Listeners
document.getElementById('quickApply').addEventListener('click', async () => {
  const response = await fetch('/api/quick-apply');
  const quickStats = await response.json();
  lastAppTime = quickStats.lastAppTime;
  quickApplySound.play();
  updateStats();
});

document.getElementById('webApply').addEventListener('click', async () => {
  const response = await fetch('/api/web-apply');
  const webStats = await response.json();
  lastAppTime = webStats.lastAppTime;
  webApplySound.play();
  updateStats();
});

document.getElementById('endSession').addEventListener('click', async () => {
  const response = await fetch('/api/end-session');
  const stats = await response.json();
  alert(stats.message);
  location.reload();
});

//Initialize Stats and Time
updateTime();
updateStats();

//Update Time Dynamically
setInterval(updateTime, 1000);