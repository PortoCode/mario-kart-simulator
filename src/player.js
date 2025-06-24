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

function createPlayer(name) {
  const stats = playerStats[name];
  return new Player(name, stats.speed, stats.handling, stats.power);
}

module.exports = {
  Player,
  PlayerType,
  createPlayer,
};
