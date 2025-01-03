async function updateStats() {
    const response = await fetch('/api/stats');
    const stats = await response.json();
    document.getElementById('stats').innerHTML = `
      <p>Quick Apply Applications: ${stats.quickAppCounter} (${stats.quickAppGoal}% to goal)</p>
      <p>Web Apply Applications: ${stats.webAppCounter} (${stats.webAppGoal}% to goal)</p>
      <p>Total Applications: ${stats.totalApplications}</p>
    `;
}

async function updateTime() {
  const response = await fetch('/api/time');
  const time = await response.json();
  document.getElementById('time').innerHTML = `
    <p>Session Time: ${time.sessionTime} </p>
    <p>Time Since Last Application: ${time.lastAppCounter} </p>
  `;
  if (time.breakTime) {
    alert(time.message);
  }
}

//Sound References
const quickApplySound = new Audio('sounds/taco_bell.mp3');
const webApplySound = new Audio('sounds/dj_khalid.mp3');

document.getElementById('quickApply').addEventListener('click', async () => {
  await fetch('/api/quick-apply');
  quickApplySound.play();
  updateStats();
});

document.getElementById('webApply').addEventListener('click', async () => {
  await fetch('/api/web-apply');
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