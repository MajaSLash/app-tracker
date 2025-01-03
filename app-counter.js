// Import necessary modules
const express = require('express');
const path = require('path');
const { performance } = require('perf_hooks');

const app = express();
const port = 3000;

// Application state
let startTime = performance.now();
let lastAppTime = performance.now();
let quickAppCounter = 0;
let webAppCounter = 0;
let breakSecs = 216000; // 1 Hour; Adjust as needed



// Helper functions
function quickAppComplete() {
  quickAppCounter++;
  lastAppTime = performance.now();
  return { message: "Quick Application Complete!", lastAppTime, quickAppCounter };
}

function webAppComplete() {
  webAppCounter++;
  lastAppTime = performance.now();
  return { message: "Website Application Complete!", lastAppTime, webAppCounter };
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function getSessionStats() {
  return {
    quickAppCounter,
    quickAppGoal: ((quickAppCounter / 40) * 100).toFixed(2),
    webAppCounter,
    webAppGoal: ((webAppCounter / 20) * 100).toFixed(2),
    totalApplications: quickAppCounter + webAppCounter
  };
}

function getSessionTime() {
  const sessionTime = (performance.now() - startTime) / 1000;
  const lastAppCounter = (performance.now() - lastAppTime) / 1000;
  const breakTime = (sessionTime > 0 && sessionTime.toFixed(0) % breakSecs == 0) ? true : false;
  return {
    sessionTime: formatTime(sessionTime),
    lastAppCounter: formatTime(lastAppCounter),
    breakTime
  };
}

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sounds', express.static(path.join(__dirname, 'public/sounds')));

// API endpoints
app.get('/api/quick-apply', (req, res) => {
  res.json(quickAppComplete());
});

app.get('/api/web-apply', (req, res) => {
  res.json(webAppComplete());
});

app.get('/api/stats', (req, res) => {
  res.json(getSessionStats());
});

app.get('/api/time', (req, res) => {
  const time = getSessionTime();
  time.message = "Take a break!";
  res.json(time);
});

app.get('/api/end-session', (req, res) => {
  const stats = getSessionStats();
  stats.message = "Session Ended. Nice Work!";
  res.json(stats);
  process.exit();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
