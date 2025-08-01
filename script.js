document.addEventListener("DOMContentLoaded", () => {
  const uptimeElement = document.getElementById("uptime");
  let start = new Date();

  setInterval(() => {
    let now = new Date();
    let seconds = Math.floor((now - start) / 1000);
    uptimeElement.textContent = `${seconds} seconds`;
  }, 1000);
});

