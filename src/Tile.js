import "./Tile.css";

function Tile(props) {
  const { letter = " ", onSelected, isSelected } = props;

  return (
    <div onClick={onSelected} className={`tile ${isSelected && "selected"}`}>
      {letter}
    </div>
  );
}

export default Tile;
