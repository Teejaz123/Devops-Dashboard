const express = require('express');
const os = require('os');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/metrics', (req, res) => {
  const uptime = os.uptime();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const cpuLoad = os.loadavg();

  res.json({
    uptime,
    totalMem,
    freeMem,
    cpuLoad
  });
});

// NEW: Jenkins job status endpoint
app.get('/api/jenkins-job', async (req, res) => {
  const jobName = req.query.job || 'Thenyx1';
  const jenkinsUrl = `http://localhost:8080/job/${jobName}/lastBuild/api/json`;
  const username = 'Thenyx';
  const apiToken = '11e6cae4c75136924bc32308ffe652a596';

  try {
    const response = await fetch(jenkinsUrl, {
      headers: {
	      Authorization: 'Basic ' + Buffer.from(`${username}:${apiToken}`).toString('base64')
      }
    });

    if (!response.ok) throw new Error('Failed to fetch from Jenkins');

    const data = await response.json();
    res.json({
      status: data.result,
      lastBuildNumber: data.number,
      url: data.url
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch Jenkins job status' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Metrics server running on http://localhost:${PORT}`);
});

