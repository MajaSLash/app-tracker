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
const startTime = performance.now();
let lastAppTime = startTime;
let breakSecs = 216000; // 1 Hour; Adjust as needed

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function updateTime(reset) {
  const sessionTime = (performance.now() - startTime) / 1000;
  //console.log(sessionTime);
  if(reset == true) lastAppTime = performance.now();
  lastAppDiff = (performance.now() - lastAppTime) / 1000;
  //console.log(lastAppDiff);
  const breakTime = (sessionTime > 1 && sessionTime.toFixed(0) % breakSecs == 0) ? true : false;
  document.getElementById('time').innerHTML = `
    <p>Session Time: ${formatTime(sessionTime)} </p>
    <p>Time Since Last Application: ${formatTime(lastAppDiff)} </p>
  `;
  if (breakTime) {
    alert("Take a break!");
  }
  return lastAppTime;
}


//Sound References
const quickApplySound = new Audio('sounds/taco_bell.mp3');
const webApplySound = new Audio('sounds/dj_khalid.mp3');

//Event Listeners
document.getElementById('quickApply').addEventListener('click', async () => {
  await fetch('/api/quick-apply');
  quickApplySound.play();
  lastAppTime = updateTime(true);
  updateStats();
});

document.getElementById('webApply').addEventListener('click', async () => {
  await fetch('/api/web-apply');
  webApplySound.play();
  lastAppTime = updateTime(true);
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