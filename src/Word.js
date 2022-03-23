import Tile from "./Tile";
import "./Word.css";

function Word(props) {
  const {
    answer,
    guess = "",
    shouldAnimate,
    onSelected,
    selected = -1,
    mode = "board",
    alteredPosition = -1,
  } = props;

  const tiles = [];

  if (guess) {
    for (let i = 0; i < guess.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={guess[i]}
          mode={"hint"}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
          altered={mode === "board" && alteredPosition === i}
        />
      );
    }

    for (let i = guess.length; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={" "}
          mode={"hint"}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
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
          mode={"hint"}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
          altered={mode === "board" && alteredPosition === i}
        />
      );
    }
  }

  return (
    <div
      id="wordContainer"
      className={`wordContainer ${
        shouldAnimate && "animate__animated animate__bounce"
      }`}
    >
      {tiles}
    </div>
  );
}

export default Word;
