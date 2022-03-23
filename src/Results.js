import { Button } from "semantic-ui-react";
import copy from "copy-to-clipboard";

const isDarkMode = window.localStorage.getItem("mode") === "dark";

export default function Results(props) {
  const { correct, time, onCopied, puzzleNumber, isIos } = props;

  const didComplete = correct === 10;

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
      <div className="resultsScore">{correct} / 10</div>
      {didComplete && <div className="resultsTime">{time} seconds</div>}
      <Button
        id="shareButton"
        className="positive button"
        inverted={isDarkMode}
        onClick={() => {
          const text = `✅ ${correct}/10\n${
            didComplete ? `🚀 ${time} seconds\n` : ""
          }\n#cladder #cladder${puzzleNumber}\n\nhttps://cladder.xyz`;

          if (isIos) {
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
    </div>
  );
}
