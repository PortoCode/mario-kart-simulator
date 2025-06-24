const readline = require("readline");

class Player {
  constructor(name, speed, handling, power, points = 0) {
    this.name = name;
    this.speed = speed;
    this.handling = handling;
    this.power = power;
    this.points = points;
  }

  earnPoint() {
    this.points += 1;
  }

  losePoint() {
    if (this.points > 0) {
      this.points -= 1;
    }
  }
}

const PlayerType = Object.freeze({
  MARIO: "Mario",
  PEACH: "Peach",
  YOSHI: "Yoshi",
  BOWSER: "Bowser",
  LUIGI: "Luigi",
  DONKEY_KONG: "Donkey Kong",
});

const playerStats = {
  [PlayerType.MARIO]: { speed: 4, handling: 3, power: 3 },
  [PlayerType.PEACH]: { speed: 3, handling: 4, power: 2 },
  [PlayerType.YOSHI]: { speed: 2, handling: 4, power: 3 },
  [PlayerType.BOWSER]: { speed: 5, handling: 2, power: 5 },
  [PlayerType.LUIGI]: { speed: 3, handling: 4, power: 4 },
  [PlayerType.DONKEY_KONG]: { speed: 2, handling: 2, power: 5 },
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function askPlayer(number, invalidChoice = null) {
  const choices = Object.values(PlayerType);

  console.log(`\nAvailable characters:`);
  choices.forEach((char, index) => {
    console.log(`  ${index + 1} - ${char}`);
  });

  let selectedIndex;
  do {
    const input = await askQuestion(
      `\nChoose Player ${number} (enter a number 1-${choices.length}): `
    );
    const num = parseInt(input.trim());

    if (isNaN(num) || num < 1 || num > choices.length) {
      console.log("❌ Invalid number! Please enter a valid option.");
      continue;
    }

    const selectedName = choices[num - 1];

    if (selectedName === invalidChoice) {
      console.log(
        "❌ Player 2 cannot be the same as Player 1! Choose a different one."
      );
      continue;
    }

    selectedIndex = num - 1;
  } while (selectedIndex === undefined);

  return createPlayer(choices[selectedIndex]);
}

function createPlayer(name) {
  const stats = playerStats[name];
  return new Player(name, stats.speed, stats.handling, stats.power);
}

(async function main() {
  console.log("|-----  Welcome to Mario Kart Simulator  -----|");

  const player1 = await askPlayer(1);
  const player2 = await askPlayer(2, player1.name);

  console.log(
    `\n🚦 The race between ${player1.name} and ${player2.name} begins!\n`
  );

  rl.close();
})();
