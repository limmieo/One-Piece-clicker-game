let clickButton = document.getElementById("click-button");
let currencyDisplay = document.getElementById("currency");
let doubleClickUpgrade = document.getElementById("double-click-upgrade");
let doubleClickUpgradeCost = 10;
let clickValue = 1;
let currency = 100;
let doubleClickUpgradePurchased = false;
let allowMultiplePurchases = true;
let farmIntervalId = null;
let mineIntervalId = null;
let health = 100;
let healthDisplay = document.getElementById("health");
let healthBar = document.getElementById("health-bar");
let healthBarText = document.getElementById("health-bar-text");
let healthBarTextContainer = document.getElementById(
  "health-bar-text-container"
);
currencyDisplay.textContent = currency; // Update the currency display
////
///Health bar///
////
// Update the health bar width and color based on the current health level
function updateHealthBar() {
  const healthPercent = health / 100;
  const color =
    healthPercent > 0.5 ? "green" : healthPercent > 0.2 ? "yellow" : "red"; // Change color based on health level
  healthBar.style.width = `${healthPercent * 100}%`;
  healthBar.style.backgroundColor = color;
}

// Call the updateHealthBar function initially to set the initial state of the health bar
updateHealthBar();

// Add a function to increment the currency and update the display and health bar text
function incrementCurrency(value) {
  currency += value;
  health -= 10; // Decrease health by 10 with each click
  if (health <= 0) {
    currency += 10; // Reward the player with 100 currency when health is depleted
    health = 100; // Reset the health level
  }
  if (currency < 0) {
    currency = 0;
  }

  healthDisplay.textContent = health;
  updateHealthBar(); // Update the health bar after each click
  checkUpgradeAvailability();
}

// This function is called when the player clicks the upgrade button
function purchaseDoubleClickUpgrade() {
  if (
    currency >= doubleClickUpgradeCost &&
    (allowMultiplePurchases || !doubleClickUpgradePurchased)
  ) {
    currency -= doubleClickUpgradeCost;
    clickValue *= 2;
    currencyDisplay.textContent = currency.toString();

    // Increase the cost of the upgrade and update the button text
    doubleClickUpgradeCost *= 2.5; // You can change this to any other increase factor
    doubleClickUpgradeCost = Math.floor(doubleClickUpgradeCost); // Round the cost down to an integer
    doubleClickUpgrade.textContent = `Double your power (Cost: ${doubleClickUpgradeCost} Gold)`;

    if (!allowMultiplePurchases) {
      doubleClickUpgradePurchased = true;
      doubleClickUpgrade.disabled = true;
      doubleClickUpgrade.textContent = "Power unlocked (Purchased)";
    }
  }
}

// This function is called whenever the player's currency changes
function checkUpgradeAvailability() {
  if (
    currency >= doubleClickUpgradeCost &&
    (allowMultiplePurchases || !doubleClickUpgradePurchased)
  ) {
    doubleClickUpgrade.disabled = false; // Enable the upgrade button
  } else {
    doubleClickUpgrade.disabled = true; // Disable the upgrade button
  }
}

// add farming function for farm button in html it should cost 100 gold and increase gold by 10 every second
function farm() {
  //cost 100 gold and increase gold by 10 every second and increase cost by 10%
  if (currency >= 100) {
    currency -= 100;
    currencyDisplay.textContent = currency;
    setInterval(function () {
      incrementCurrency(10);
    }, 1000);
    checkUpgradeAvailability();
  }
}

// add mining function for mine button in html
function mine() {
  if (currency >= 500) {
    currency -= 500;
    currencyDisplay.textContent = currency;
    setInterval(function () {
      incrementCurrency(100);
    }, 1000);
    checkUpgradeAvailability();
  }
}

doubleClickUpgrade.addEventListener("click", purchaseDoubleClickUpgrade);

document.getElementById("farm").addEventListener("click", farm); //add a function when someone clicks the farm button
document.getElementById("mine").addEventListener("click", mine);
clickButton.addEventListener("click", function () {
  incrementCurrency(clickValue);
});

// Update the initial cost and text content of the doubleClickUpgrade button
doubleClickUpgradeCost = Math.floor(doubleClickUpgradeCost); // Round the cost down to an integer
doubleClickUpgrade.textContent = `Double your power (Cost: ${doubleClickUpgradeCost} Gold)`;
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
