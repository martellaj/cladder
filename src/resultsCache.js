export function consolidate() {
  try {
    if (!getScores()) {
      const scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < 10; i++) {
        const dailyResult = window.localStorage.getItem(`puzzle-${i}`);

        if (dailyResult) {
          const result = JSON.parse(dailyResult);
          const score = result.score;
          scores[score] = scores[score] + 1;
        }
      }

      window.localStorage.setItem("alltimeResults", scores);
    }
  } catch (e) {
    console.error(e);
  }
}

export function getScores() {
  try {
    const scores = window.localStorage.getItem("alltimeResults");

    if (scores) {
      const scoresArray = scores.split(",").map((score) => parseInt(score));
      return scoresArray;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}
