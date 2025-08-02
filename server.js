const express = require('express');
const os = require('os');
const cors = require('cors');

const app = express();
app.use(cors());

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Metrics server running on http://localhost:${PORT}`);
});

