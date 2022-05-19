export function getStats() {
  try {
    let gamesPlayed = 0;
    let gamesWon = 0;
    let cumulativeWonTime = 0;
    let fastestWinTime = -1;
    const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var i = 0, len = localStorage.length; i < len; ++i) {
      if (localStorage.key(i).includes("puzzle-")) {
        const data = JSON.parse(localStorage.getItem(localStorage.key(i)));

        // increment games played for each game
        gamesPlayed++;

        // increment games won for each game that was completed
        if (data.score === 10) {
          gamesWon++;

          cumulativeWonTime += data.time;

          // update fastest win time if applicable
          if (data.time < fastestWinTime || fastestWinTime === -1) {
            fastestWinTime = data.time;
          }
        }

        // increment number of times each score was reached
        scores[data.score]++;
      }
    }

    return {
      averageWinTime:
        gamesWon > 0 ? parseFloat(cumulativeWonTime / gamesWon).toFixed(2) : 0,
      fastestWinTime:
        fastestWinTime > -1 ? parseFloat(fastestWinTime).toFixed(2) : 0,
      gamesPlayed,
      gamesWon,
      scores,
    };
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
