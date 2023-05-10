let clickButton = document.getElementById("click-button");
let currencyDisplay = document.getElementById("currency");
let doubleClickUpgrade = document.getElementById("double-click-upgrade");
let doubleClickUpgradeCost = 10;
let clickValue = 1;
let currency = 1000;
let doubleClickUpgradePurchased = false;
let allowMultiplePurchases = true;
let farmIntervalId = null;
let mineIntervalId = null;
let health = 100;
let defeats = 0;
let healthDisplay = document.getElementById("health");
let healthBar = document.getElementById("health-bar");
let healthBarText = document.getElementById("health-bar-text");
let healthBarTextContainer = document.getElementById(
  "health-bar-text-container"
);
let damageMultiplier = 1; // This will be doubled when the upgrade is purchased

currencyDisplay.textContent = currency; // Update the currency display

let defeatedEnemyCount = 0;
let maxHealth = 100;

// Update the health bar width and color based on the current health level
function updateHealthBar() {
  const healthPercent = health / maxHealth;
  const color =
    healthPercent > 0.5 ? "green" : healthPercent > 0.2 ? "yellow" : "red";
  healthBar.style.width = `${healthPercent * 100}%`;
  healthBar.style.backgroundColor = color;
}

// This function is called when the attack button is clicked.
function attack() {
  health -= clickValue * damageMultiplier;
  if (health <= 0) {
    health = maxHealth;
    defeatedEnemyCount++;
    currency += 100; // Adding currency after defeat
    currencyDisplay.textContent = currency; // Updating currency display
    if (defeatedEnemyCount % 3 === 0) {
      maxHealth += 100;
      health = maxHealth;
    }
  }
  healthDisplay.textContent = health;
  updateHealthBar();
  checkUpgradeAvailability();
}

// This function is called when the player clicks the upgrade button
function purchaseDoubleClickUpgrade() {
  if (
    currency >= doubleClickUpgradeCost &&
    (allowMultiplePurchases || !doubleClickUpgradePurchased)
  ) {
    currency -= doubleClickUpgradeCost;
    damageMultiplier *= 2; // Double the damage
    currencyDisplay.textContent = currency.toString();

    doubleClickUpgradeCost *= 2.5;
    doubleClickUpgradeCost = Math.floor(doubleClickUpgradeCost);
    doubleClickUpgrade.textContent = `Unlock 2nd Gear (Cost: ${doubleClickUpgradeCost} Berries)`;

    if (!allowMultiplePurchases) {
      doubleClickUpgradePurchased = true;
      doubleClickUpgrade.disabled = true;
      doubleClickUpgrade.textContent = "2nd Gear unlocked (Purchased)";
      document.getElementById("luffy-running.gif").src = "second-gear.gif"; // Changing the gif
    }
  }
}

// This function is called whenever the player's currency changes
function checkUpgradeAvailability() {
  if (
    currency >= doubleClickUpgradeCost &&
    (allowMultiplePurchases || !doubleClickUpgradePurchased)
  ) {
    doubleClickUpgrade.disabled = false;
  } else {
    doubleClickUpgrade.disabled = true;
  }
}

// Farming function for farm button in HTML. Costs 100 gold and increases gold by 10 every second.
function farm() {
  if (currency >= 100) {
    currency -= 100;
    currencyDisplay.textContent = currency;
    setInterval(function () {
      currency += 10;
      currencyDisplay.textContent = currency;
      checkUpgradeAvailability();
    }, 1000);
  }
}

// Mining function for mine button in HTML. Costs 500 gold and increases gold by 100 every second.
function mine() {
  if (currency >= 500) {
    currency -= 500;
    currencyDisplay.textContent = currency;
    setInterval(function () {
      currency += 100;
      currencyDisplay.textContent = currency;
      checkUpgradeAvailability();
    }, 1000);
  }
}

clickButton.addEventListener("click", attack);
doubleClickUpgrade.addEventListener("click", purchaseDoubleClickUpgrade);
document.getElementById("farm").addEventListener("click", farm);
document.getElementById("mine").addEventListener("click", mine);

doubleClickUpgradeCost = Math.floor(doubleClickUpgradeCost);
doubleClickUpgrade.textContent = `Unlock's 2nd Gear (Cost: ${doubleClickUpgradeCost} Berries)`;

/// canvas stuff
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let x = 0;
const playerimg = new Image();
const spritewidth = 200;
const spriteheight = 200;
playerimg.src = "Luffy-sprite.png";

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(playerimg, 50, 0, 95, 100, 0, 0, spritewidth, spriteheight);

  requestAnimationFrame(animate);
}
animate();
/*
//////////////////////////////
/////////////////////////////////
///////////////////////DATA STORAGE////////////////////////
/////////////////////////////////
//////////////////////////////
//add a function to save data
function saveData() {
  localStorage.setItem("currency", currency);
  localStorage.setItem("clickValue", clickValue);
  localStorage.setItem(
    "doubleClickUpgradePurchased",
    doubleClickUpgradePurchased
  );
  localStorage.setItem("allowMultiplePurchases", allowMultiplePurchases);
  localStorage.setItem("doubleClickUpgradeCost", doubleClickUpgradeCost);

  console.log("Saved data to local storage:");
  console.log(`currency: ${currency}`);
  console.log(`clickValue: ${clickValue}`);
  console.log(`doubleClickUpgradePurchased: ${doubleClickUpgradePurchased}`);
  console.log(`allowMultiplePurchases: ${allowMultiplePurchases}`);
  console.log(`doubleClickUpgradeCost: ${doubleClickUpgradeCost}`);
}

//add a function to load data
function loadData() {
  currency = parseInt(localStorage.getItem("currency")) || 100;
  clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
  doubleClickUpgradePurchased =
    localStorage.getItem("doubleClickUpgradePurchased") === "true";
  allowMultiplePurchases =
    localStorage.getItem("allowMultiplePurchases") === "true";
  doubleClickUpgradeCost =
    parseFloat(localStorage.getItem("doubleClickUpgradeCost")) || 10;

  console.log("Loaded data from local storage:");
  console.log(`currency: ${currency}`);
  console.log(`clickValue: ${clickValue}`);
  console.log(`doubleClickUpgradePurchased: ${doubleClickUpgradePurchased}`);
  console.log(`allowMultiplePurchases: ${allowMultiplePurchases}`);
  console.log(`doubleClickUpgradeCost: ${doubleClickUpgradeCost}`);

  currencyDisplay.textContent = currency;
  doubleClickUpgrade.textContent = `Double your power (Cost: ${Math.floor(
    doubleClickUpgradeCost
  )} Gold)`;
  checkUpgradeAvailability();
}

// Call the load function on page load to load any saved progress
window.addEventListener("load", loadData);
//add a function to erase data
function eraseData() {
  localStorage.removeItem("currency");
  localStorage.removeItem("clickValue");
  localStorage.removeItem("doubleClickUpgradePurchased");
  localStorage.removeItem("allowMultiplePurchases");
  localStorage.removeItem("doubleClickUpgradeCost");
  currency = 0;
  clickValue = 1;
  doubleClickUpgradePurchased = false;
  allowMultiplePurchases = true;
  doubleClickUpgradeCost = 10;
  currencyDisplay.textContent = currency;
  doubleClickUpgrade.textContent = `Double your power (Cost: ${Math.floor(
    doubleClickUpgradeCost
  )} Gold)`;
  checkUpgradeAvailability();
}

//add a function to reset the game when hard reset button is clicked
function resetGame() {
  currency = 0;
  clickValue = 1;
  doubleClickUpgradePurchased = false;
  allowMultiplePurchases = true;
  doubleClickUpgradeCost = 10;
  currencyDisplay.textContent = currency;
  doubleClickUpgrade.textContent = `Double your power (Cost: ${Math.floor(
    doubleClickUpgradeCost
  )} Gold)`;
  checkUpgradeAvailability(); // Call checkUpgradeAvailability after resetting the game data

  if (!allowMultiplePurchases) {
    doubleClickUpgrade.disabled = true;
    doubleClickUpgrade.textContent = "Double your power (Cost: ∞ Gold)";
  }
}

document
  .getElementById("hard-reset-button")
  .addEventListener("click", function () {
    eraseData();
    resetGame();
  });
  */
