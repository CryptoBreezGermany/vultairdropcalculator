import './style.css'
import { setupPointsCounter } from './counter.js'

// Correct values as provided
const TOTAL_VULT_AIRDROP = 90646428.49; // 90,646,428.49 Vult tokens
let TOTAL_POINTS = 26984512065; // 26,984,512,065 points - will be updated dynamically

let lastUpdated = new Date();

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Vult Airdrop Calculator</h1>
    <div class="card">
      <div class="info-section">
        <div class="info-item">
          <span class="label">Total Vulties Points:</span>
          <span id="total-points" class="value">${TOTAL_POINTS.toLocaleString()}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Vult Airdrop:</span>
          <span id="total-vult" class="value">${TOTAL_VULT_AIRDROP.toLocaleString()}</span>
        </div>
        <div class="info-item">
          <span class="label">Conversion Rate:</span>
          <span id="conversion-rate" class="value">${(TOTAL_VULT_AIRDROP / TOTAL_POINTS).toFixed(8)}</span>
        </div>
      </div>
      
      <div class="calculator-section">
        <h2>Calculate Your Airdrop</h2>
        <div class="input-group">
          <label for="user-points">Your Vulties Points:</label>
          <input type="number" id="user-points" placeholder="Enter your points">
        </div>
        <button id="calculate-btn">Calculate</button>
        
        <div class="result" id="result-container" style="display: none;">
          <h3>Your Estimated Airdrop:</h3>
          <div class="result-value" id="result-value">0</div>
          <p class="disclaimer">This is an estimate based on current data and may change.</p>
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>Data sourced from <a href="https://airdrop.vultisig.com/vault/leaderboard" target="_blank">Vult Leaderboard</a></p>
      <p class="disclaimer">This calculator is unofficial and for estimation purposes only.</p>
      <p class="update-info" id="update-info">Last updated: ${lastUpdated.toLocaleString()}</p>
      <div id="loading-indicator" class="loading-indicator" style="display: none;">Updating data...</div>
    </div>
  </div>
`

// Initialize the app
function initApp() {
  const userPointsInput = document.getElementById('user-points');
  const calculateBtn = document.getElementById('calculate-btn');
  const resultContainer = document.getElementById('result-container');
  const resultValueElement = document.getElementById('result-value');
  const totalPointsElement = document.getElementById('total-points');
  const conversionRateElement = document.getElementById('conversion-rate');
  const updateInfoElement = document.getElementById('update-info');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  // Set up the points counter to fetch and update with exact values
  setupPointsCounter(totalPointsElement, (newPoints) => {
    TOTAL_POINTS = newPoints;
    const conversionRate = TOTAL_VULT_AIRDROP / TOTAL_POINTS;
    conversionRateElement.textContent = conversionRate.toFixed(8);
    lastUpdated = new Date();
    updateInfoElement.textContent = `Last updated: ${lastUpdated.toLocaleString()}`;
    
    // If there's an active calculation, update it with the new conversion rate
    if (resultContainer.style.display === 'block' && userPointsInput.value) {
      const userPoints = parseFloat(userPointsInput.value) || 0;
      const estimatedVult = userPoints * conversionRate;
      resultValueElement.textContent = estimatedVult.toLocaleString(undefined, {
        maximumFractionDigits: 2
      });
    }
    
    // Hide loading indicator when update is complete
    loadingIndicator.style.display = 'none';
  });
  
  // Show loading indicator when starting an update
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    if (args[0].includes('airdrop.vultisig.com')) {
      loadingIndicator.style.display = 'block';
    }
    return originalFetch.apply(this, args);
  };
  
  // Handle calculation
  calculateBtn.addEventListener('click', () => {
    const userPoints = parseFloat(userPointsInput.value) || 0;
    if (userPoints <= 0) {
      alert('Please enter a valid number of points');
      return;
    }
    
    const conversionRate = TOTAL_VULT_AIRDROP / TOTAL_POINTS;
    const estimatedVult = userPoints * conversionRate;
    resultValueElement.textContent = estimatedVult.toLocaleString(undefined, {
      maximumFractionDigits: 2
    });
    resultContainer.style.display = 'block';
  });
  
  // Also calculate on Enter key
  userPointsInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      calculateBtn.click();
    }
  });
}

// Start the app
initApp();
