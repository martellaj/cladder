import { Button } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import { useEffect } from "react";

export default function Results(props) {
  const {
    correct,
    time,
    onCopied,
    puzzleNumber,
    onLoaded,
    isHardMode,
    isDarkMode,
    isTeacherMode,
    isPractice,
    isChallengeMode,
    onPlayAgain,
    skipsUsed,
  } = props;

  const didComplete = correct === 10;

  useEffect(() => {
    setTimeout(() => {
      onLoaded();
    }, 250);
  }, []);

  let bigMessage = "";
  if (correct === 10) {
    bigMessage = "Perfect!";
  } else if (correct > 6) {
    bigMessage = "Impressive!";
  } else if (correct > 2) {
    bigMessage = "Nice try!";
  } else {
    bigMessage = "There's always tomorrow!";
  }

  const isSupporter = window.localStorage.getItem("isSupporter") === "true";

  return (
    <div className="resultsContainer">
      <div style={{ marginBottom: "24px" }}>
        <div className="bigMessage">{bigMessage}</div>
        <div
          id="gameResult"
          className="resultsScore"
          data-score={correct}
          data-time={time}
        >
          {correct} / 10
        </div>
        {isChallengeMode && (
          <div style={{ fontSize: "medium", marginBottom: "12px" }}>
            ({skipsUsed === 1 ? `${skipsUsed} skip` : `${skipsUsed} skips`})
          </div>
        )}
        {didComplete && !isTeacherMode && (
          <div className="resultsTime">{time} seconds</div>
        )}
      </div>
      <>
        {isChallengeMode ? (
          <Button
            className="positive button"
            style={{ marginBottom: "18px" }}
            size="massive"
            inverted={isDarkMode}
            onClick={() => onPlayAgain()}
          >
            PLAY AGAIN
          </Button>
        ) : (
          <Button
            id="shareButton"
            className="positive button"
            style={{ marginBottom: "18px" }}
            size="massive"
            inverted={isDarkMode}
            onClick={() => {
              const text = `#Cladder ${puzzleNumber}\n\n✅ ${correct}/10${
                isHardMode && !isTeacherMode ? "*" : ""
              }\n${
                didComplete && !isTeacherMode ? `🚀 ${time} seconds\n` : ""
              }\nhttps://playcladder.com`;

              var ua = navigator.userAgent.toLowerCase();
              var isAndroid = ua.indexOf("android") > -1;

              const isIos =
                [
                  "iPad Simulator",
                  "iPhone Simulator",
                  "iPod Simulator",
                  "iPad",
                  "iPhone",
                  "iPod",
                ].includes(navigator.platform) ||
                // iPad on iOS 13 detection
                (navigator.userAgent.includes("Mac") &&
                  "ontouchend" in document);

              if (isIos || isAndroid) {
                navigator.share({
                  text: text,
                });
              } else {
                copy(text);
                onCopied();
              }
            }}
          >
            SHARE
          </Button>
        )}

        {!isSupporter && (
          <Button
            id="donateButton"
            className="button active"
            style={{
              marginBottom: "12px",
            }}
            size="large"
            color="purple"
            inverted={isDarkMode}
            onClick={() => {
              window.open("https://www.buymeacoffee.com/playcladder", "_blank");
            }}
          >
            ❤️ SUPPORT BY DONATING
          </Button>
        )}
      </>
    </div>
  );
}
