import { Button, Icon } from "semantic-ui-react";
import animateCSS from "./animateCSS";
import { useEffect } from "react";

export default function Menu(props) {
  const {
    onOptionSelected,
    puzzleNumber,
    isDarkMode,
    showChallengeMode = false,
    isReturningPlayer,
  } = props;

  useEffect(() => {
    const challengePageSeen =
      window.localStorage.getItem("challengePageSeen") === "true";

    if (isReturningPlayer && !challengePageSeen) {
      animateCSS("#challengeButton", "tada");
    }
  });

  return (
    <div className="menuContainer">
      <div className="menuButton">
        <Button
          id="playButton"
          size="massive"
          className="menuButton button"
          color="green"
          inverted={isDarkMode}
          onClick={() => onOptionSelected("game")}
        >
          PLAY
        </Button>
      </div>
      {showChallengeMode && (
        <div className="menuButton">
          <Button
            id="challengeButton"
            size="massive"
            className="menuButton button"
            color="yellow"
            inverted={isDarkMode}
            onClick={() => {
              window.localStorage.setItem("challengePageSeen", "true");
              onOptionSelected("challenge");
            }}
          >
            CHALLENGE
          </Button>
        </div>
      )}
      <div className="menuButton">
        <Button
          id="archiveButton"
          size="massive"
          className="menuButton button"
          color="orange"
          inverted={isDarkMode}
          onClick={() => onOptionSelected("archive")}
        >
          ARCHIVE
        </Button>
      </div>
      <div className="menuButton">
        <Button
          id="practiceButton"
          size="massive"
          className="menuButton button"
          color="red"
          inverted={isDarkMode}
          onClick={() => onOptionSelected("practice")}
        >
          PRACTICE
        </Button>
      </div>
      {!showChallengeMode && (
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton button"
            color="yellow"
            inverted={isDarkMode}
            onClick={() => onOptionSelected("howToPlay")}
          >
            HOW TO PLAY
          </Button>
        </div>
      )}
      <div
        style={{
          marginBottom: "24px",
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <Icon
            onClick={() => onOptionSelected("howToPlay")}
            tabIndex="0"
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
            name={"help"}
            inverted={isDarkMode}
            className="button footerButton headerButton"
          />

          <Icon
            onClick={() => onOptionSelected("about")}
            tabIndex="0"
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
            name={"info circle"}
            inverted={isDarkMode}
            className="button footerButton headerButton"
          />

          <Icon
            onClick={() => onOptionSelected("settings")}
            tabIndex="0"
            style={{
              cursor: "pointer",
            }}
            name={"setting"}
            inverted={isDarkMode}
            className="button footerButton headerButton"
          />
        </div>
        <span
          style={{
            fontSize: "18px",
            fontVariant: "all-petite-caps",
            marginTop: "8px",
          }}
        >
          #{puzzleNumber}
        </span>
      </div>
    </div>
  );
}
