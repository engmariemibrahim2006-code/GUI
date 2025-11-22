const logBox = document.getElementById("log");
const clearBtn = document.getElementById("clearLogBtn");


const switches = {
  INFO: document.getElementById("switchInfo"),
  WARNING: document.getElementById("switchWarning"),
  ERROR: document.getElementById("switchError"),
};


// Messages
const messages = [
  { text: "Controller is connected", type: "INFO" },
  { text: "Temperature normal", type: "INFO" },
  { text: "Path updated successfully", type: "INFO" },
  { text: "Warning: high temperature", type: "WARNING" },
  { text: "Battery low", type: "WARNING" },
  { text: "Obstacle detected", type: "WARNING" },
  { text: "Connection lost… retrying", type: "WARNING" },
  { text: "Connection restored", type: "INFO" },
  { text: "Safe mode activated", type: "WARNING" },
  { text: "System failure", type: "ERROR" },
  { text: "Communication timeout", type: "ERROR" },
];

// Add log line
function addLog(messageObj) {
  
  if (!switches[messageObj.type].checked) return;

  const line = document.createElement("div");
  line.textContent = `[${messageObj.type}] ${messageObj.text}`;
  line.classList.add("log-line", messageObj.type.toLowerCase());

  logBox.appendChild(line);
  logBox.scrollTop = logBox.scrollHeight;
}

// Clear log
clearBtn.addEventListener("click", () => {
  logBox.innerHTML = "";
});

// Simulation loop
function startSimulation() {
  function sendMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    if (message.type !== "ERROR" || Math.random() >= 0.8) {
      addLog(message);
    }

    const nextDelay = Math.random() * 2000 + 500; 
    setTimeout(sendMessage, nextDelay);
  }

  sendMessage();
}

startSimulation();