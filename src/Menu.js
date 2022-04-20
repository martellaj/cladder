import { Button } from "semantic-ui-react";

export default function Menu(props) {
  const { onOptionSelected, puzzleNumber, isDarkMode } = props;

  return (
    <>
      <div className="menuContainer">
        <div className="menuButton">
          <Button
            id="playButton"
            size="massive"
            className="menuButton button"
            color="green"
            inverted={isDarkMode}
            onClick={() => onOptionSelected("game")}
          >
            PLAY
          </Button>
        </div>
        <div className="menuButton">
          <Button
            id="practiceButton"
            size="massive"
            className="menuButton button"
            color="red"
            inverted={isDarkMode}
            onClick={() => onOptionSelected("practice")}
          >
            PRACTICE
          </Button>
        </div>
        <div className="menuButton">
          <Button
            size="massive"
            className="menuButton button"
            color="yellow"
            inverted={isDarkMode}
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
            inverted={isDarkMode}
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
          <div>v0.0.94</div>
        </div>
      </div>
    </>
  );
}
