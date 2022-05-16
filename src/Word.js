import Tile from "./Tile";
import "./Word.css";
import { useEffect, useState } from "react";

function Word(props) {
  const {
    answer,
    guess,
    mode = "board",
    alteredPosition = -1,
    id,
    failed = false,
    selectedIndex = -1,
    onTileSelected = null,
    showTileToChange = false,
  } = props;

  const [indexToAnimate, setIndexToAnimate] = useState(-1);

  useEffect(() => {
    if (mode === "hint") {
      setIndexToAnimate(guess?.length - 1);
    }
  }, [mode, guess]);

  const tiles = [];

  if (guess !== undefined) {
    for (let i = 0; i < guess.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={guess[i]}
          mode={"hint"}
          shouldAnimate={indexToAnimate === i}
          onSelected={onTileSelected ? () => onTileSelected?.(i) : null}
          isSelected={selectedIndex === i}
          wordLength={answer.length}
          altered={mode === "hint" && alteredPosition === i && showTileToChange}
        />
      );
    }

    for (let i = guess.length; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={" "}
          wordLength={answer.length}
          altered={
            (mode === "board" && alteredPosition === i) ||
            (mode === "hint" && alteredPosition === i && showTileToChange)
          }
        />
      );
    }
  } else {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={answer[i]}
          altered={
            (mode === "board" && alteredPosition === i) ||
            (mode === "hint" && alteredPosition === i && showTileToChange)
          }
          wordLength={answer.length}
          failed={failed}
        />
      );
    }
  }

  return (
    <div id={id} className={`wordContainer`}>
      {tiles}
    </div>
  );
}

export default Word;
