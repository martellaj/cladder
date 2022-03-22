import Tile from "./Tile";
import "./Word.css";

function Word(props) {
  const {
    answer,
    guess,
    mode = "guess",
    alteredPosition,
    shouldAnimate,
  } = props;

  const tiles = [];

  if (mode === "hint") {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile
          key={i}
          letter={answer[i]}
          // small={true}
          altered={alteredPosition === i}
          mode={"hint"}
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
        shouldAnimate && "animate__animated animate__slideInUp"
      }`}
    >
      {tiles}
    </div>
  );
}

export default Word;
