import { Button } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import { useEffect } from "react";

export default function Results(props) {
  const {
    correct,
    time,
    onCopied,
    puzzleNumber,
    isIos,
    onLoaded,
    isPractice,
    isHardMode,
    isDarkMode,
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
    bigMessage = "Everything okay?";
  }

  return (
    <div className="resultsContainer">
      <div className="bigMessage">{bigMessage}</div>
      <div
        id="gameResult"
        className="resultsScore"
        data-score={correct}
        data-time={time}
      >
        {correct} / 10
      </div>
      {didComplete && <div className="resultsTime">{time} seconds</div>}
      {!isPractice && (
        <Button
          id="shareButton"
          className="positive button"
          style={{ marginBottom: "24px" }}
          size="massive"
          inverted={isDarkMode}
          onClick={() => {
            const text = `#Cladder ${puzzleNumber}\n\n✅ ${correct}/10${
              isHardMode ? "*" : ""
            }\n${
              didComplete ? `🚀 ${time} seconds\n` : ""
            }\nhttps://playcladder.com`;

            var ua = navigator.userAgent.toLowerCase();
            var isAndroid = ua.indexOf("android") > -1;
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
    </div>
  );
}
