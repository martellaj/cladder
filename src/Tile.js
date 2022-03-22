import "./Tile.css";

function Tile(props) {
  const { letter = " ", small = false, altered, mode = "guess" } = props;

  return (
    <div
      className={`tile ${small && "smallTile"} ${
        mode === "hint" ? (altered ? " altered " : " stale ") : undefined
      }`}
    >
      {letter}
    </div>
  );
}

export default Tile;
