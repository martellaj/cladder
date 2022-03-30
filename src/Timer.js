import { Progress } from "semantic-ui-react";
import "./Timer.css";
import { useEffect, useState } from "react";

const TIME_LIMIT = 60000;
const INCREMENT = 100;

function Timer(props) {
  const {
    setIsOver,
    isOver,
    setHideSkips,
    skipsUsed,
    finalTime = -1,
    start,
  } = props;

  const [progress, setProgress] = useState(0);

  const isDarkMode = window.localStorage.getItem("mode") === "dark";

  const getColor = () => {
    if (progress < 50) {
      return "green";
    } else if (progress < 75) {
      return "yellow";
    } else if (progress < 85) {
      return "orange";
    } else {
      return "red";
    }
  };

  // hook that updates progress bar as time elapses
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (isOver) {
          return oldProgress;
        }

        const now = Date.now();
        const timeElapsed = now - start;
        const progress = (timeElapsed / TIME_LIMIT) * 100;

        return Math.min(progress, 100);
      });
    }, INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [isOver, start]);

  useEffect(() => {
    if (progress >= 100) {
      setIsOver(true);
    } else if (progress >= 85) {
      setHideSkips(true);
    }
  }, [progress, setIsOver, setHideSkips]);

  const elapsedTime = (progress / 100) * TIME_LIMIT;

  const totalProgress =
    finalTime > -1
      ? ((finalTime * 1000) / TIME_LIMIT) * 100
      : Math.min(
          progress +
            skipsUsed * (((elapsedTime + 5 * 1000) / TIME_LIMIT) * 100),
          100
        );

  return (
    <div className="timerContainer">
      <Progress
        className="progressBar"
        percent={totalProgress}
        color={getColor()}
        inverted={isDarkMode}
      />
    </div>
  );
}

export default Timer;
