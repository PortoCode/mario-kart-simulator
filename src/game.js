const { getRandomBlock, TrackSegmentType } = require("./track");

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
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
    console.log("-----------------------------");
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

module.exports = {
  playRace,
  declareWinner,
  rollDice,
};
