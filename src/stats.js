export function copyStats(_stats) {
  const stats = window.localStorage.getItem("stats");

  if (stats) {
    return;
  }

  window.localStorage.setItem("stats", _stats);
}

export function getStats() {
  try {
    const stats = window.localStorage.getItem("stats");

    if (stats) {
      return JSON.parse(stats);
    } else {
      return {
        averageWinTime: 0,
        fastestWinTime: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
    }
  } catch (e) {
    return {
      averageWinTime: 0,
      fastestWinTime: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }
}

export function updateStats(result) {
  const stats = getStats();

  stats.gamesPlayed++;

  if (result.score === 10) {
    stats.gamesWon++;
  }

  stats.scores[result.score]++;

  if (result.score === 10) {
    stats.averageWinTime = parseFloat(
      (
        (stats.averageWinTime * (stats.gamesWon - 1) + result.score) /
        stats.gamesWon
      ).toFixed(2)
    );
  }

  if (result.score === 10 && result.time < stats.fastestWinTime) {
    stats.fastestWinTime = result.time;
  }

  window.localStorage.setItem("stats", JSON.stringify(stats));
}
