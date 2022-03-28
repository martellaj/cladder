import { getScores } from "./resultsCache";
import "./ScoreDistribution.css";

export default function ScoreDistribution(props) {
  const { puzzleNumber } = props;

  const scores = getScores();

  if (!scores) {
    return null;
  }

  const userTodayScore = parseInt(
    localStorage.getItem(`puzzle-${puzzleNumber}`) || "-1"
  );

  let totalCount = 0;
  for (let i = 0; i < scores.length; i++) {
    totalCount += scores[i];
  }

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="scoreDistributionContainer">
      <Guess
        guess={1}
        count={scores[1]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={2}
        count={scores[2]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={3}
        count={scores[3]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={4}
        count={scores[4]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={5}
        count={scores[5]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={6}
        count={scores[6]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={7}
        count={scores[7]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={8}
        count={scores[8]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={9}
        count={scores[9]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={10}
        count={scores[10]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
      <Guess
        guess={0}
        count={scores[0]}
        totalCount={totalCount}
        userTodayScore={userTodayScore}
      />
    </div>
  );
}

const Guess = (props) => {
  const { guess, count, totalCount, userTodayScore } = props;

  return (
    <div className="graph-container">
      <div className="guess">{guess ? guess : "X"}</div>
      <div className="graph">
        <div
          className={`graph-bar align-right ${
            userTodayScore === guess ? "highlight" : ""
          }`}
          style={{ width: `${(count / totalCount) * 100}%` }}
        >
          <div className="num-guesses">{count}</div>
        </div>
        <div
          style={{
            marginLeft: "12px",
            color: "#b59f3b",
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {Math.floor((count / totalCount) * 100)}%
        </div>
      </div>
    </div>
  );
};
