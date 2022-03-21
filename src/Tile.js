import "./Tile.css";

function Tile(props) {
  const { letter = " ", isLast } = props;

  return <div className={`tile ${!isLast && "not-last"}`}>{letter}</div>;
}

export default Tile;
