import "./Tile.css";
import { /*useEffect, */ useEffect, useState } from "react";

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
    shouldAnimate = false,
    yay,
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

  useEffect(() => {
    if (
      shouldAnimate &&
      window.localStorage.getItem("selectionMode") !== "true"
    ) {
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [shouldAnimate]);

  return (
    <div
      onClick={() => {
        if (
          !isSelected &&
          window.localStorage.getItem("selectionMode") === "true"
        ) {
          setIsAnimating(true);

          setTimeout(() => {
            setIsAnimating(false);
          }, 300);
        }

        onSelected?.();
      }}
      className={`tile ${isSelected && "selected"} ${altered && "altered"} ${
        attempted && "attempted"
      } ${completed && "completed"} ${failed && "failed"} ${
        wordLength === 5 && "fiveLetterTile"
      } ${isAnimating && "animateTile"} ${yay && "bouncingTile"}`}
    >
      {letter}
    </div>
  );
}

export default Tile;
