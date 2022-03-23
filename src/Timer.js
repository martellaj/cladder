import { Progress } from "semantic-ui-react";
import "./Timer.css";

function Timer(props) {
  const { progress } = props;

  const isDarkMode = window.localStorage.getItem("mode") === "dark";

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
      <Progress
        className="progressBar"
        percent={progress}
        color={getColor()}
        inverted={isDarkMode}
      />
    </div>
  );
}

export default Timer;
