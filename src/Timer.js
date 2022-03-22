import { Progress } from "semantic-ui-react";
import "./Timer.css";

function Timer(props) {
  const { guessed = 0, total = 10, progress } = props;

  const getColor = () => {
    if (progress < 50) {
      return "green";
    } else if (progress < 80) {
      return "yellow";
    } else if (progress < 90) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <div className="timerContainer">
      <Progress className="progressBar" percent={progress} color={getColor()} />
      <div className="score">
        {guessed} / {total}
      </div>
    </div>
  );
}

export default Timer;
