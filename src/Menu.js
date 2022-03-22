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
        <span
          style={{
            marginBottom: "24px",
            position: "absolute",
            bottom: 0,
          }}
        >
          v0.0.4
        </span>
      </div>
    </>
  );
}
