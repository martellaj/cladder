import Tile from "./Tile";
import "./Word.css";
import { useEffect, useState, useRef } from "react";
import { Icon } from "semantic-ui-react";

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
    hint = "",
    reserveShowHintSpace = false,
  } = props;

  const [indexToAnimate, setIndexToAnimate] = useState(-1);
  const [showHint, setShowHint] = useState(false);
  const wordContainerRef = useRef(null);

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
    <div className="outerWordContainer">
      <div
        id={id}
        className={`wordContainer`}
        style={{ position: "relative" }}
        ref={wordContainerRef}
      >
        {tiles}
        {showHint && (
          <div
            className="hintBackground"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: wordContainerRef?.current.clientHeight || "50px",
              width: wordContainerRef?.current.clientWidth - 6 || "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              overflow: "auto",
            }}
            title={hint}
          >
            {hint}
          </div>
        )}
      </div>
      {(hint || reserveShowHintSpace) && (
        <Icon
          name="lightbulb outline"
          className="answerHintLater"
          size="big"
          onClick={() => setShowHint(!showHint)}
          style={{
            visibility: reserveShowHintSpace ? "hidden" : "visible",
          }}
        />
      )}
    </div>
  );
}

export default Word;
