import { getStats } from "../stats";
import { TEST, WIN1, WIN10, WIN100 } from "./achievementsData";

export default function isAchievementCompleted(type) {
  const stats = getStats();

  switch (type) {
    case TEST: {
      return {
        progress: `?? / ??`,
        completed: stats.gamesWon >= 31,
      };
    }
    case WIN1: {
      return {
        progress: `${Math.min(stats.gamesWon, 1)} / 1`,
        completed: stats.gamesWon >= 1,
      };
    }
    case WIN10: {
      return {
        progress: `${Math.min(stats.gamesWon, 10)} / 10`,
        completed: stats.gamesWon >= 10,
      };
    }
    case WIN100: {
      return {
        progress: `${Math.min(stats.gamesWon, 100)} / 100`,
        completed: stats.gamesWon >= 100,
      };
    }
    default:
      return false;
  }
}
