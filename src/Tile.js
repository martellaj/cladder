import "./Tile.css";

function Tile(props) {
  const { letter = " ", onSelected, isSelected, altered } = props;

  return (
    <div
      onClick={onSelected}
      className={`tile ${isSelected && "selected"} ${altered && "altered"}`}
    >
      {letter}
    </div>
  );
}

export default Tile;
