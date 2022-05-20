import { getStats } from "../stats";
import {
  HARD1,
  HARD10,
  HARD100,
  SPEED20,
  SPEED30,
  SPEED40,
  TEST,
  WIN1,
  WIN10,
  WIN100,
} from "./achievementsData";

export default function isAchievementCompleted(type) {
  const stats = getStats();
  const hardModeWins = parseInt(
    window.localStorage.getItem("hardModeWins") || "0"
  );

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
    case HARD1: {
      return {
        progress: `${hardModeWins} / 1`,
        completed: hardModeWins >= 1,
      };
    }
    case HARD10: {
      return {
        progress: `${hardModeWins} / 10`,
        completed: hardModeWins >= 10,
      };
    }
    case HARD100: {
      return {
        progress: `${hardModeWins} / 100`,
        completed: hardModeWins >= 100,
      };
    }
    case SPEED40: {
      return {
        progress: stats.fastestWinTime || "0.00",
        completed: stats.fastestWinTime ? stats.fastestWinTime < 40 : false,
      };
    }
    case SPEED30: {
      return {
        progress: stats.fastestWinTime || "0.00",
        completed: stats.fastestWinTime ? stats.fastestWinTime < 30 : false,
      };
    }
    case SPEED20: {
      return {
        progress: stats.fastestWinTime || "0.00",
        completed: stats.fastestWinTime ? stats.fastestWinTime < 20 : false,
      };
    }
    default:
      return false;
  }
}
