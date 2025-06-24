const TrackSegmentType = Object.freeze({
  STRAIGHT: "STRAIGHT",
  TURN: "TURN",
  BATTLE: "BATTLE",
});

async function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return TrackSegmentType.STRAIGHT;
  if (random < 0.66) return TrackSegmentType.TURN;
  return TrackSegmentType.BATTLE;
}

module.exports = {
  TrackSegmentType,
  getRandomBlock,
};
