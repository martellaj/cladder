import achievementsData from "./achievementsData";

export default function getAchievementByType(type) {
  return achievementsData.filter((achievementData) => {
    return achievementData.type === type;
  })[0];
}
