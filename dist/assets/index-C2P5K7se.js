(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const y=26984512065,h=6e4,v={initialPoints:y,refreshInterval:h};function b(a,n){let o=v.initialPoints;const l=v.refreshInterval;a.textContent=o.toLocaleString();const t=setInterval(async()=>{try{const i=await(await fetch("https://airdrop.vultisig.com/api/leaderboard/stats")).json();i&&i.totalPoints?o=i.totalPoints:console.warn("Could not get total points from API, using last known value"),a.textContent=o.toLocaleString(),n&&n(o)}catch(e){console.error("Error fetching points data:",e)}},l);return()=>clearInterval(t)}const d=9064642849e-2;let r=26984512065,u=new Date;document.querySelector("#app").innerHTML=`
  <div class="container">
    <h1>Vult Airdrop Calculator</h1>
    <div class="card">
      <div class="info-section">
        <div class="info-item">
          <span class="label">Total Vulties Points:</span>
          <span id="total-points" class="value">${r.toLocaleString()}</span>
        </div>
        <div class="info-item">
          <span class="label">Total Vult Airdrop:</span>
          <span id="total-vult" class="value">${d.toLocaleString()}</span>
        </div>
        <div class="info-item">
          <span class="label">Conversion Rate:</span>
          <span id="conversion-rate" class="value">${(d/r).toFixed(8)}</span>
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
      <p class="update-info" id="update-info">Last updated: ${u.toLocaleString()}</p>
      <div id="loading-indicator" class="loading-indicator" style="display: none;">Updating data...</div>
    </div>
  </div>
`;function I(){const a=document.getElementById("user-points"),n=document.getElementById("calculate-btn"),o=document.getElementById("result-container"),l=document.getElementById("result-value"),t=document.getElementById("total-points"),e=document.getElementById("conversion-rate"),i=document.getElementById("update-info"),p=document.getElementById("loading-indicator");b(t,s=>{r=s;const c=d/r;if(e.textContent=c.toFixed(8),u=new Date,i.textContent=`Last updated: ${u.toLocaleString()}`,o.style.display==="block"&&a.value){const g=(parseFloat(a.value)||0)*c;l.textContent=g.toLocaleString(void 0,{maximumFractionDigits:2})}p.style.display="none"});const m=window.fetch;window.fetch=function(...s){return s[0].includes("airdrop.vultisig.com")&&(p.style.display="block"),m.apply(this,s)},n.addEventListener("click",()=>{const s=parseFloat(a.value)||0;if(s<=0){alert("Please enter a valid number of points");return}const c=d/r,f=s*c;l.textContent=f.toLocaleString(void 0,{maximumFractionDigits:2}),o.style.display="block"}),a.addEventListener("keyup",s=>{s.key==="Enter"&&n.click()})}I();
