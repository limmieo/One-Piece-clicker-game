/// This is to make testing easier

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
let statsDisplay = document.getElementById("stats-display");
function updateStatsDisplay() {
  statsDisplay.textContent = `Attack: ${clickValue * damageMultiplier}`;
}
// Update the stats display

currencyDisplay.textContent = currency; // Update the currency display

let defeatedEnemyCount = 0;
let maxHealth = 100;

// Update the health bar width and color based on the current health level
function updateHealthBar() {
  // Updating the health bar
  const healthPercent = health / maxHealth;
  const color = // Changing the color of the health bar
    healthPercent > 0.5 ? "green" : healthPercent > 0.2 ? "yellow" : "red"; // Changing the color of the health bar
  healthBar.style.width = `${healthPercent * 100}%`;
  healthBar.style.backgroundColor = color; // Changing the color of the health bar
}

// This function is called when the attack button is clicked.
function attack() {
  health -= clickValue * damageMultiplier + playerLevel;
  if (health <= 0) {
    health = maxHealth; // Resetting health
    defeatedEnemyCount++; // Increasing the defeated enemy count
    currency += 100; // Adding currency after defeat
    addExperience(50); // Adding currency after defeat
    currencyDisplay.textContent = currency; // Updating currency display
    playSoundEffect(); // Playing sound effect
    if (defeatedEnemyCount % 3 === 0) {
      // Increasing the max health every 3 defeats
      maxHealth += 100; // Increasing max health
      health = maxHealth; // Resetting health
    }
  }
  healthDisplay.textContent = health;
  updateHealthBar(); // Updating health bar
  checkUpgradeAvailability(); // Checking if the upgrade is available
  updateExperienceDisplay(); // Updating experience display
  updateStatsDisplay(); // Updating stats display
}

// This function plays a sound effect
function playSoundEffect() {
  const audio = new Audio("Punch Sound.mp3");
  audio.volume = 0.05;
  audio.play();
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

//level up function
let playerLevel = 0;
let playerExp = 0;
let expToNextLevel = 100 * (playerLevel + 1);
let expDisplay = document.getElementById("exp-display");

// This function updates the displayed level and experience
function updateExperienceDisplay() {
  expDisplay.textContent = `Level: ${playerLevel}, Experience: ${playerExp}/${expToNextLevel}`;
}

function addExperience(exp) {
  playerExp += exp;

  // Check if the player has enough experience to level up
  if (playerExp >= expToNextLevel) {
    // Increase the player's level
    playerLevel++;

    // Subtract the required experience for the previous level
    playerExp -= expToNextLevel;

    // Update the experience required for the next level
    expToNextLevel = 100 * (playerLevel + 1);
  }
}
let instakillButton = document.getElementById("instakill-button");
let LevelUpButton = document.getElementById("level-up-button");

LevelUpButton.addEventListener("click", function () {
  addExperience(expToNextLevel);
  updateExperienceDisplay();
});

instakillButton.addEventListener("click", function () {
  health = 0;
  attack();
});

/// canvas stuff
/*const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let x = 0;
const playerimg = new Image();
const spritewidth = 256;
const spriteheight = 256;

//playerimg.src = "Luffy-sprite.png";

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(playerimg, 0, 0, 95, 100, 0, 0, spritewidth, spriteheight);

  requestAnimationFrame(animate);
}
animate();
/*
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let x = 0;
const playerimg = new Image();
const spritewidth = 256;
const spriteheight = 256;

//playerimg.src = "Luffy-sprite.png";

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(playerimg, 0, 0, 95, 100, 0, 0, spritewidth, spriteheight);

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
