import { Button } from "semantic-ui-react";

export default function Menu(props) {
  const { onOptionSelected } = props;

  return (
    <>
      <div className="menuContainer">
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton"
            color="green"
            onClick={() => onOptionSelected("game")}
          >
            play
          </Button>
        </div>
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton"
            color="yellow"
            onClick={() => onOptionSelected("how")}
          >
            how to play
          </Button>
        </div>
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton"
            onClick={() => onOptionSelected("contact")}
          >
            contact
          </Button>
        </div>
        <span style={{ marginTop: "auto", marginBottom: "24px" }}>v0.0.1</span>
      </div>
    </>
  );
}
