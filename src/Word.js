import Tile from "./Tile";
import "./Word.css";

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
  } = props;

  const tiles = [];

  if (guess !== undefined) {
    for (let i = 0; i < guess.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={guess[i]}
          mode={"hint"}
          onSelected={() => onTileSelected?.(i)}
          isSelected={selectedIndex === i}
          wordLength={answer.length}
          altered={mode === "board" && alteredPosition === i}
        />
      );
    }

    for (let i = guess.length; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={" "}
          wordLength={answer.length}
          altered={mode === "board" && alteredPosition === i}
        />
      );
    }
  } else {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={answer[i]}
          altered={mode === "board" && alteredPosition === i}
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
