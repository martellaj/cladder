import "./Achievements.css";
import isAchievementCompleted from "./utils/isAchievementCompleted";
import { useEffect, useState } from "react";
import { Button, Input, Icon } from "semantic-ui-react";
import achievementsData from "./utils/achievementsData";
import getAchievementIconByType from "./utils/getAchievementIconByType";

export function Achievement(props) {
  const { type, title, description, isSupporter, onClick } = props;

  const { completed, progress } = isAchievementCompleted(type);

  return (
    <div
      className={`achievementContainer ${completed && "achievementCompleted"} ${
        !isSupporter && "achievementLocked"
      } ${onClick && "clickable"}`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isSupporter && (
          <Icon
            name={getAchievementIconByType(type)}
            className="achievementIcon"
          />
        )}
        <div className="achievementContainerLeft">
          <div className="achievementTitle">{title}</div>
          <div className="achievementDescription">{description}</div>
        </div>
      </div>

      <div className="achievementContainerRight">
        <div className="achievementProgress">{progress}</div>
      </div>
    </div>
  );
}

function SupporterClaim(props) {
  const { isDarkMode, onCorrectCode } = props;

  const [code, setCode] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div style={{ display: "inline" }}>
        <span style={{ fontWeight: "bold" }}>Achievements</span> are available
        to all supporters! After you donate (whatever you choose), we'll send
        you a code to unlock achievements and challenge mode!
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <Button
          id="achievementPageDonateButton"
          className="button active"
          style={{
            marginBottom: "12px",
          }}
          size="large"
          color="purple"
          onClick={() => {
            window.open("https://www.buymeacoffee.com/playcladder", "_blank");
          }}
        >
          ❤️ SUPPORT BY DONATING
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            style={{ marginRight: "12px" }}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button
            className="button"
            inverted={isDarkMode}
            onClick={() => {
              const CODE = "JAVAGIFT";

              if (code.trim().toLowerCase() === CODE.toLowerCase()) {
                // save for later
                window.localStorage.setItem("isSupporter", true);

                onCorrectCode(true);
              } else {
                alert(
                  "That didn't work. Maybe try again? Please send an email to playcladder@gmail.com if the code you received isn't working."
                );
              }
            }}
          >
            UNLOCK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Achievements(props) {
  const [isSupporter, setIsSupporter] = useState(
    window.localStorage.getItem("isSupporter") === "true" || true
  );

  useEffect(() => {
    window.localStorage.setItem("achievementsPageSeen", "true");
  }, []);

  return (
    <>
      {!isSupporter && (
        <SupporterClaim
          isDarkMode={props.isDarkMode}
          onCorrectCode={setIsSupporter}
        />
      )}
      <div className="achievementsContainer">
        {achievementsData.map((achievementData, index) => {
          return (
            <Achievement
              key={index}
              type={achievementData.type}
              title={achievementData.title}
              description={achievementData.description}
              isSupporter={isSupporter}
            />
          );
        })}
      </div>
    </>
  );
}
