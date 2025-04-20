import config from './config.json';

export function setupCounter(element) {
  let counter = 0;
  const setCounter = (count) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

export function setupPointsCounter(element, onUpdate) {
  // Get initial values from config
  let points = config.initialPoints;
  const refreshInterval = config.refreshInterval;
  
  // Format and display initial points
  element.textContent = points.toLocaleString();
  
  // Set up interval to fetch and update points
  const intervalId = setInterval(async () => {
    try {
      // Fetch the latest points data from the Vult API
      const response = await fetch('https://airdrop.vultisig.com/api/leaderboard/stats');
      const data = await response.json();
      
      // Extract the total points from all registered wallets
      if (data && data.totalPoints) {
        points = data.totalPoints;
      } else {
        console.warn('Could not get total points from API, using last known value');
      }
      
      // Update the display
      element.textContent = points.toLocaleString();
      
      // Call the callback with new points value
      if (onUpdate) {
        onUpdate(points);
      }
    } catch (error) {
      console.error('Error fetching points data:', error);
    }
  }, refreshInterval);
  
  // Return a function to stop the counter if needed
  return () => clearInterval(intervalId);
}
