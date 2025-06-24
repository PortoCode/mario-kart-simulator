const { askPlayer, closeInput } = require("./input");
const { PlayerType, createPlayer } = require("./player");
const { playRace, declareWinner } = require("./game");

(async function main() {
  console.log("|-----  Welcome to Mario Kart Simulator  -----|");

  const playerTypeValues = Object.values(PlayerType);

  const player1Name = await askPlayer(1, playerTypeValues);
  const player2Name = await askPlayer(2, playerTypeValues, player1Name);

  const player1 = createPlayer(player1Name);
  const player2 = createPlayer(player2Name);

  console.log(
    `\n🚦 The race between ${player1.name} and ${player2.name} begins!\n`
  );

  await playRace(player1, player2);
  declareWinner(player1, player2);

  closeInput();
})();
