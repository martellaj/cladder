import { getStats } from "../stats";

export default function isAchievementCompleted(type) {
  const stats = getStats();

  switch (type) {
    case 0: {
      return {
        progress: `${Math.min(stats.gamesWon, 1)} / 1`,
        completed: stats.gamesWon >= 1,
      };
    }
    case 1: {
      return {
        progress: `${Math.min(stats.gamesWon, 10)} / 10`,
        completed: stats.gamesWon >= 10,
      };
    }
    case 2: {
      return {
        progress: `${Math.min(stats.gamesWon, 100)} / 100`,
        completed: stats.gamesWon >= 100,
      };
    }
    default:
      return false;
  }
}
