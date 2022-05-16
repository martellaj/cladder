import { Button } from "semantic-ui-react";
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
          fontVariant: "all-small-caps",
          fontSize: "16px",
        }}
      >
        <div>#{puzzleNumber}</div>
        <div style={{ marginTop: "2px" }}>v1.1.0</div>
        {/* eslint-disable-next-line */}
        <a id="contact" onClick={() => onOptionSelected("about")}>
          CONTACT
        </a>
      </div>
    </div>
  );
}
