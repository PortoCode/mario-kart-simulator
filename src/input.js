const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function askPlayer(number, playerTypeValues, invalidChoice = null) {
  console.log(`\nAvailable characters:`);
  playerTypeValues.forEach((char, index) => {
    console.log(`  ${index + 1} - ${char}`);
  });

  let selectedIndex;
  do {
    const input = await askQuestion(
      `\nChoose Player ${number} (enter a number 1-${playerTypeValues.length}): `
    );
    const num = parseInt(input.trim());

    if (isNaN(num) || num < 1 || num > playerTypeValues.length) {
      console.log("❌ Invalid number! Please enter a valid option.");
      continue;
    }

    const selectedName = playerTypeValues[num - 1];

    if (selectedName === invalidChoice) {
      console.log(
        "❌ Player 2 cannot be the same as Player 1! Choose a different one."
      );
      continue;
    }

    selectedIndex = num - 1;
  } while (selectedIndex === undefined);

  return playerTypeValues[selectedIndex];
}

function closeInput() {
  rl.close();
}

module.exports = {
  askQuestion,
  askPlayer,
  closeInput,
};
