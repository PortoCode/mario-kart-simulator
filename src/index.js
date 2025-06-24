const readline = require("readline");

const PlayerType = Object.freeze({
  MARIO: "Mario",
  PEACH: "Peach",
  YOSHI: "Yoshi",
  BOWSER: "Bowser",
  LUIGI: "Luigi",
  DONKEY_KONG: "Donkey Kong",
});

const playerTypesArray = Object.values(PlayerType);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function askPlayer(number, invalidChoice = null) {
  let choice;
  do {
    const input = await askQuestion(
      `Choose player ${number} (${playerTypesArray.join(", ")}): `
    );
    const trimmed = input.trim();
    if (!playerTypesArray.includes(trimmed)) {
      console.log("❌ Invalid choice! Please choose a valid player.\n");
      continue;
    }
    if (trimmed === invalidChoice) {
      console.log(
        "❌ Player 2 cannot be the same as Player 1! Choose another.\n"
      );
      continue;
    }
    choice = trimmed;
  } while (!choice);
  return choice;
}

(async function main() {
  console.log("|-----  Welcome to Mario Kart Simulator  -----|");

  const player1 = await askPlayer(1);
  const player2 = await askPlayer(2, player1);

  console.log(`\n✅ Player 1 is: ${player1}`);
  console.log(`✅ Player 2 is: ${player2}`);

  rl.close();
})();
