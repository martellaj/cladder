import {
  HARD1,
  HARD10,
  HARD100,
  SPEED20,
  SPEED30,
  SPEED40,
  WIN1,
  WIN10,
  WIN100,
} from "./achievementsData";

export default function getAchievementIconByType(type) {
  switch (type) {
    case WIN1:
    case WIN10:
    case WIN100:
      return "trophy";
    case HARD1:
    case HARD10:
    case HARD100:
      return "asterisk";
    case SPEED20:
    case SPEED30:
    case SPEED40:
      return "lightning";
    default:
      return "trophy";
  }
}
