import Tile from "./Tile";
import "./Word.css";

function Word(props) {
  const {
    answer,
    guess,
    onSelected,
    selected = -1,
    mode = "board",
    alteredPosition = -1,
    id,
    failed = false,
    hintPosition,
  } = props;

  const tiles = [];

  if (guess !== undefined) {
    for (let i = 0; i < guess.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={guess[i]}
          mode={"hint"}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
          wordLength={answer.length}
          altered={mode === "board" && alteredPosition === i}
          showHint={mode === "hint" && hintPosition === i}
        />
      );
    }

    for (let i = guess.length; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={" "}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
          wordLength={answer.length}
          altered={mode === "board" && alteredPosition === i}
          showHint={mode === "hint" && hintPosition === i}
        />
      );
    }
  } else {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={answer[i]}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
          altered={mode === "board" && alteredPosition === i}
          wordLength={answer.length}
          failed={failed}
          showHint={mode === "hint" && hintPosition === i}
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
