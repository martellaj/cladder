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
    shouldPromote,
  } = props;

  const engagedWithPromo =
    window.localStorage.getItem("engagedWithPromo1") === "true";

  const isOgSupporter = window.localStorage.getItem("ogSupporter") === "true";

  useEffect(() => {
    const challengePageSeen =
      window.localStorage.getItem("challengePageSeen") === "true";

    if (isReturningPlayer && !challengePageSeen) {
      animateCSS("#challengeButton", "tada");
    }

    // todo also track if button was clicked
    if (shouldPromote && !engagedWithPromo) {
      animateCSS("#moreGamesButton", "tada");
    }
  }, [engagedWithPromo, isReturningPlayer, shouldPromote]);

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
      {!shouldPromote && showChallengeMode && (
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
      {!shouldPromote && (
        <div className="menuButton">
          <Button
            id="archiveButton"
            size="massive"
            className="menuButton button"
            color={showChallengeMode ? "orange" : "yellow"}
            inverted={isDarkMode}
            onClick={() => onOptionSelected("archive")}
          >
            ARCHIVE
          </Button>
        </div>
      )}
      {shouldPromote && (
        <div className="menuButton">
          <Button
            id="moreGamesButton"
            size="massive"
            className="menuButton button"
            color="yellow"
            inverted={isDarkMode}
            onClick={() => onOptionSelected("moreGames")}
          >
            MORE GAMES
          </Button>
        </div>
      )}
      <div className="menuButton">
        <Button
          id="practiceButton"
          size="massive"
          className="menuButton button"
          color={shouldPromote ? "orange" : "red"}
          inverted={isDarkMode}
          onClick={() => onOptionSelected("practice")}
        >
          PRACTICE
        </Button>
      </div>
      {shouldPromote && isOgSupporter && (
        <div className="menuButton">
          <Button
            id="challengeButton"
            size="massive"
            className="menuButton button"
            color="red"
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
