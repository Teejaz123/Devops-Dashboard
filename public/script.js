async function loadMetrics() {
  try {
    const res = await fetch('http://localhost:3000/api/metrics');
    const data = await res.json();

    const uptimeSeconds = data.uptime;
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;

    document.getElementById('uptime').innerText =
      `${hours}h ${minutes}m ${seconds}s`;

    // Create or update extra metrics
    let statsContainer = document.getElementById('system-metrics');
    if (!statsContainer) {
      statsContainer = document.createElement('div');
      statsContainer.id = 'system-metrics';
      statsContainer.className = 'card';
      document.querySelector('.container').appendChild(statsContainer);
    }

    statsContainer.innerHTML = `
      <h2>System Metrics</h2>
      <p>🧠 Memory: ${(data.freeMem / 1e9).toFixed(2)} GB free of ${(data.totalMem / 1e9).toFixed(2)} GB</p>
      <p>⚙️ CPU Load (1m avg): ${data.cpuLoad[0].toFixed(2)}</p>
    `;
  } catch (err) {
    console.error('Failed to load metrics:', err);
    document.getElementById('uptime').innerText = 'Error loading data';
  }
}

loadMetrics();
setInterval(loadMetrics, 5000); // Refresh every 5s

