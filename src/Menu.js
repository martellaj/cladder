import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";

export default function Menu(props) {
  const { onOptionSelected } = props;

  const [isAboutOpen, setIsAboutOpen] = useState(false);

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
            onClick={() => setIsAboutOpen(true)}
          >
            about
          </Button>
        </div>
      </div>

      <Modal
        onClose={() => setIsAboutOpen(false)}
        onOpen={() => setIsAboutOpen(true)}
        open={isAboutOpen}
      >
        <Modal.Header>about</Modal.Header>
        <Modal.Content>This is a game.</Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setIsAboutOpen(false)}>
            close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
