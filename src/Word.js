import Tile from "./Tile";
import "./Word.css";

function Word(props) {
  const { answer, guess, mode = "guess" } = props;

  const tiles = [];

  if (mode === "hint") {
    for (let i = 0; i < answer.length; i++) {
      tiles.push(
        <Tile key={i} letter={answer[i]} isLast={i === answer.length - 1} />
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

  return <div className="wordContainer">{tiles}</div>;
}

export default Word;
