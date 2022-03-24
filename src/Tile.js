import "./Tile.css";

function Tile(props) {
  const {
    letter = " ",
    onSelected,
    isSelected,
    altered,
    failed = false,
  } = props;

  return (
    <div
      onClick={onSelected}
      className={`tile ${isSelected && "selected"} ${altered && "altered"} ${
        failed && "failed"
      }`}
    >
      {letter}
    </div>
  );
}

export default Tile;
