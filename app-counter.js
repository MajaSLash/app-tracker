// Import necessary modules
const express = require('express');
const path = require('path');
const { performance } = require('perf_hooks');

const app = express();
const port = 3000;

// Application state
let quickAppCounter = 0;
let webAppCounter = 0;



// Helper functions
function quickAppComplete() {
  quickAppCounter++;
  const lastAppTime = performance.now();
  return { message: "Quick Application Complete!", lastAppTime, quickAppCounter };
}

function webAppComplete() {
  webAppCounter++;
  const lastAppTime = performance.now();
  return { message: "Website Application Complete!", lastAppTime, webAppCounter };
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
