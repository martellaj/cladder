import { Progress } from "semantic-ui-react";
import { useEffect, useState } from "react";
import "./Timer.css";

const TIME_LIMIT = 30000;
const INCREMENT = 100;

function Timer(props) {
  const { guessed = 0, total = 10 } = props;

  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        const oldProg = (oldProgress / 100) * TIME_LIMIT;

        const newProgress = ((oldProg + INCREMENT) / TIME_LIMIT) * 100;

        return Math.min(newProgress, 100);
      });
    }, INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
