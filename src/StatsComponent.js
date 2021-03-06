import { useEffect, useState } from "react";
import { getStats } from "./stats";

export default function StatsComponent(props) {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    setTimeout(() => {
      setStats(getStats());
    }, 200);
  }, []);

  const { isTeacherMode } = props;

  const { averageWinTime, fastestWinTime, gamesPlayed, gamesWon } = stats;

  return (
    <div className={"statsContainer"}>
      <div className="statsBlocks">
        <div className="statsBlock">
          <div className="statsValue">{gamesPlayed}</div>
          <div className="statsTitle">Played</div>
        </div>
        <div className="statsBlock">
          <div className="statsValue">{gamesWon}</div>
          <div className="statsTitle">Won</div>
        </div>
        <div className="statsBlock">
          <div className="statsValue">
            {gamesPlayed > 0 ? Math.floor((gamesWon / gamesPlayed) * 100) : 0}
          </div>
          <div className="statsTitle">Win %</div>
        </div>
      </div>
      {!isTeacherMode && (
        <div className="statsBlocks">
          <div className="statsBlock">
            <div className="statsValue">{averageWinTime} sec</div>
            <div className="statsTitle">Average Time (Win)</div>
          </div>
          <div className="statsBlock">
            <div className="statsValue">{fastestWinTime} sec</div>
            <div className="statsTitle">Fastest Time (Win)</div>
          </div>
        </div>
      )}
    </div>
  );
}
