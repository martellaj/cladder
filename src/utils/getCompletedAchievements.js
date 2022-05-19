import isAchievementCompleted from "./isAchievementCompleted";
import achievementsData from "./achievementsData";

export default function getCompletedAchievements() {
  const achievements = [];

  achievementsData.map((achievementData, index) => {
    achievements[achievementData.type] = isAchievementCompleted(
      achievementData.type
    ).completed;
  });

  return achievements;
}
