import { Button } from "semantic-ui-react";

export default function Menu(props) {
  const { onOptionSelected, puzzleNumber } = props;

  return (
    <>
      <div className="menuContainer">
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton button"
            color="green"
            onClick={() => onOptionSelected("game")}
          >
            PLAY
          </Button>
        </div>
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton button"
            color="yellow"
            onClick={() => onOptionSelected("howToPlay")}
          >
            HOW TO PLAY
          </Button>
        </div>
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton button"
            onClick={() => onOptionSelected("about")}
            disabled
          >
            ABOUT
          </Button>
        </div>
        <div
          style={{
            marginBottom: "24px",
            position: "absolute",
            bottom: 0,
          }}
        >
          <div>#{puzzleNumber}</div>
          <div>v0.0.7</div>
        </div>
      </div>
    </>
  );
}
