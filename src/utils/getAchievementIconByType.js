export default function getAchievementIconByType(type) {
  if (type >= 4 && type <= 6) {
    return "lightning";
  }

  return "trophy";
}
