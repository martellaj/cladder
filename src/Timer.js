import { Progress } from "semantic-ui-react";
import "./Timer.css";
import { useState, useEffect, useMemo } from "react";

const TIME_LIMIT = 60000;
const INCREMENT = 100;

function Timer(props) {
  const { isGameOver, remainingSkips, resultTime } = props;

  const [progress, setProgress] = useState(0);

  const isDarkMode = window.localStorage.getItem("mode") === "dark";

  const getColor = () => {
    if (progressToShow < 50) {
      return "green";
    } else if (progressToShow < 80) {
      return "yellow";
    } else if (progressToShow < 90) {
      return "orange";
    } else {
      return "red";
    }
  };

  // hook that updates progress bar as time elapses
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (isGameOver) {
          clearInterval(timer);
          return oldProgress;
        }

        const oldElapsedTime = (oldProgress / 100) * TIME_LIMIT;
        const newElapsedTime = oldElapsedTime + INCREMENT;
        const newProgress = (newElapsedTime / TIME_LIMIT) * 100;

        return Math.min(newProgress, 100);
      });
    }, INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [isGameOver]);

  const progressToShow = useMemo(() => {
    if (resultTime) {
      return ((resultTime * 1000) / TIME_LIMIT) * 100;
    } else {
      const elapsedTime = (progress / 100) * TIME_LIMIT;
      const skipPenaltyTime = (1 - remainingSkips) * 5000;
      return ((elapsedTime + skipPenaltyTime) / TIME_LIMIT) * 100;
    }
  }, [progress, resultTime, remainingSkips]);

  return (
    <div className="timerContainer">
      <Progress
        className="progressBar"
        percent={progressToShow}
        color={getColor()}
        inverted={isDarkMode}
      />
    </div>
  );
}

export default Timer;
