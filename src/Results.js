import { Button } from "semantic-ui-react";
import copy from "copy-to-clipboard";

export default function Results(props) {
  const { correct, time, onCopied } = props;

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
      <div className="resultsTime">{time} seconds</div>
      <Button
        className="positive"
        onClick={() => {
          const text = `I solved ${correct} / 10 hints in ${time} seconds playing ONE-OFF!\n\nhttps://one-off.app`;

          let success = copy(text);
          if (success) {
            onCopied();
          }

          if (!success) {
            navigator.share({
              text: text,
            });
          }
        }}
      >
        share
      </Button>
    </div>
  );
}
