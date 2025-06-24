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

const TrackSegmentType = Object.freeze({
  STRAIGHT: "STRAIGHT",
  TURN: "TURN",
  BATTLE: "BATTLE",
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

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return TrackSegmentType.STRAIGHT;
  if (random < 0.66) return TrackSegmentType.TURN;
  return TrackSegmentType.BATTLE;
}

async function logRollResult(player, type, dice, attribute) {
  console.log(
    `${
      player.name
    } 🎲 rolled a ${type.toLowerCase()} die: ${dice} + ${attribute} = ${
      dice + attribute
    }`
  );
}

async function playRace(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Round ${round}`);
    const block = await getRandomBlock();
    console.log(`Track Segment: ${block}`);

    const dice1 = await rollDice();
    const dice2 = await rollDice();

    let result1 = 0;
    let result2 = 0;

    if (block === TrackSegmentType.STRAIGHT) {
      result1 = dice1 + player1.speed;
      result2 = dice2 + player2.speed;
      await logRollResult(player1, "speed", dice1, player1.speed);
      await logRollResult(player2, "speed", dice2, player2.speed);
    } else if (block === TrackSegmentType.TURN) {
      result1 = dice1 + player1.handling;
      result2 = dice2 + player2.handling;
      await logRollResult(player1, "handling", dice1, player1.handling);
      await logRollResult(player2, "handling", dice2, player2.handling);
    } else if (block === TrackSegmentType.BATTLE) {
      const power1 = dice1 + player1.power;
      const power2 = dice2 + player2.power;

      console.log(`${player1.name} battles ${player2.name}! 🥊`);
      await logRollResult(player1, "power", dice1, player1.power);
      await logRollResult(player2, "power", dice2, player2.power);

      if (power1 > power2) {
        console.log(
          `${player1.name} wins the battle! ${player2.name} loses 1 point 🐢`
        );
        player2.losePoint();
      } else if (power2 > power1) {
        console.log(
          `${player2.name} wins the battle! ${player1.name} loses 1 point 🐢`
        );
        player1.losePoint();
      } else {
        console.log("⚔️ The battle is a tie. No points lost.");
      }

      continue;
    }

    if (result1 > result2) {
      console.log(`${player1.name} earns a point!`);
      player1.earnPoint();
    } else if (result2 > result1) {
      console.log(`${player2.name} earns a point!`);
      player2.earnPoint();
    } else {
      console.log("It's a tie! No points awarded.");
    }
  }
}

function declareWinner(player1, player2) {
  console.log("\n🏁 Final Results:");
  console.log(`${player1.name}: ${player1.points} point(s)`);
  console.log(`${player2.name}: ${player2.points} point(s)`);

  if (player1.points > player2.points) {
    console.log(`🏆 ${player1.name} wins the race! Congratulations!`);
  } else if (player2.points > player1.points) {
    console.log(`🏆 ${player2.name} wins the race! Congratulations!`);
  } else {
    console.log("🤝 The race ends in a tie!");
  }
}

(async function main() {
  console.log("|-----  Welcome to Mario Kart Simulator  -----|");

  const player1 = await askPlayer(1);
  const player2 = await askPlayer(2, player1.name);

  console.log(
    `\n🚦 The race between ${player1.name} and ${player2.name} begins!\n`
  );

  await playRace(player1, player2);
  declareWinner(player1, player2);

  rl.close();
})();
