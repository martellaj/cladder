import Tile from "./Tile";
import "./Word.css";

function Word(props) {
  const {
    answer,
    guess,
    mode = "guess",
    shouldAnimate,
    onSelected,
    selected = -1,
    shouldAnimateWrong,
  } = props;

  const tiles = [];

  if (mode === "hint") {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={answer[i]}
          mode={"hint"}
          onSelected={() => onSelected?.(i)}
          isSelected={selected === i}
        />
      );
    }
  } else {
    for (let i = 0; i < answer.length; i++) {
      if (i < guess.length) {
        tiles.push(<Tile key={i} letter={guess[i]} />);
      } else {
        tiles.push(<Tile key={i} />);
      }
    }
  }

  return (
    <div
      className={`wordContainer ${
        shouldAnimate && "animate__animated animate__bounce"
      } ${shouldAnimateWrong && "animate__animated animate__shakeX"}`}
    >
      {tiles}
    </div>
  );
}

export default Word;
