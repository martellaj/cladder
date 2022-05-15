import "./Tile.css";
import { /*useEffect, */ useState } from "react";

function Tile(props) {
  const {
    letter = " ",
    onSelected,
    isSelected,
    altered,
    failed = false,
    wordLength = 3,
    attempted = false,
    completed = false,
  } = props;

  const [isAnimating, setIsAnimating] = useState(false);

  // useEffect(() => {
  //   if (letter && !isSelected) {
  //     setIsAnimating(true);

  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 500);
  //   }
  // }, [letter, isSelected]);

  return (
    <div
      onClick={() => {
        if (!isSelected) {
          setIsAnimating(true);

          setTimeout(() => {
            setIsAnimating(false);
          }, 500);
        }

        onSelected();
      }}
      className={`tile ${isSelected && "selected"} ${altered && "altered"} ${
        attempted && "attempted"
      } ${completed && "completed"} ${failed && "failed"} ${
        wordLength === 5 && "fiveLetterTile"
      } ${isAnimating && "animateTile"}`}
    >
      {letter}
    </div>
  );
}

export default Tile;
