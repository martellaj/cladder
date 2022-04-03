import "./Tile.css";

function Tile(props) {
  const {
    letter = " ",
    onSelected,
    isSelected,
    altered,
    failed = false,
    wordLength = 3,
    showHint = false,
  } = props;

  return (
    <div
      onClick={onSelected}
      className={`tile ${isSelected && "selected"} ${altered && "altered"} ${
        failed && "failed"
      } ${wordLength === 5 && "fiveLetterTile"} ${showHint && "tileHint"}`}
    >
      {letter}
    </div>
  );
}

export default Tile;
