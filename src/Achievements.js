import "./Achievements.css";
import isAchievementCompleted from "./utils/isAchievementCompleted";

const WIN1 = 0;
const WIN10 = 1;
const WIN100 = 2;

const achievementsData = [
  {
    type: WIN1,
    title: "Cladder Rookie",
    description: "Win 1 game",
  },
  {
    type: WIN10,
    title: "Cladder Gamer",
    description: "Win 10 games",
  },
  {
    type: WIN100,
    title: "Cladder Champion",
    description: "Win 100 games",
  },
];

function Achievement(props) {
  const { type, title, description } = props;

  const { completed, progress } = isAchievementCompleted(type);

  return (
    <div
      className={`achievementContainer ${completed && "achievementCompleted"}`}
    >
      <div className="achievementContainerLeft">
        <div className="achievementTitle">{title}</div>
        <div className="achievementDescription">{description}</div>
      </div>

      <div className="achievementContainerRight">
        <div className="achievementProgress">{progress}</div>
      </div>
    </div>
  );
}

export default function Achievements(props) {
  return (
    <div className="achievementsContainer">
      {achievementsData.map((achievementData, index) => {
        return (
          <Achievement
            key={index}
            type={achievementData.type}
            title={achievementData.title}
            description={achievementData.description}
          />
        );
      })}
    </div>
  );
}
