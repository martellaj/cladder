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

export function copyScores(scores) {
  const alltimeResults = window.localStorage.getItem("alltimeResults");

  if (alltimeResults) {
    return;
  }

  window.localStorage.setItem("alltimeResults", scores);
}
