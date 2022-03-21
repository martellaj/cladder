import { useState } from "react";
import "./Guess.css";
import Tile from "./Tile";
import useEventListener from "./useEventListener";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function Guess(props) {
  const { answer } = props;

  const [guess, setGuess] = useState("");

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }

    if (e.key === "Backspace") {
      setGuess(guess.slice(0, -1));
      return;
    }

    if (guess.length === answer.length) {
      return;
    }

    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }

    const key = e.key.toLowerCase().trim();
    if (key.length === 1) {
      setGuess(guess + key);
    }
  };

  const onKeyboardKeyPress = (key) => {
    if (key === "{enter}") {
      checkAnswer();
      return;
    }

    if (key === "{bksp}") {
      setGuess(guess.slice(0, -1));
      return;
    }

    if (guess.length === answer.length) {
      return;
    }

    setGuess(guess + key);
  };

  useEventListener("keydown", onKeyDown);

  const tiles = [];
  for (let i = 0; i < answer.length; i++) {
    if (i < guess.length) {
      tiles.push(<Tile letter={guess[i]} />);
    } else {
      tiles.push(<Tile />);
    }
  }

  const checkAnswer = () => {
    alert("todo");
  };

  return (
    <div className="guessContainer">
      <div className="tiles">{tiles}</div>
      <Keyboard
        onKeyPress={onKeyboardKeyPress}
        maxLength={answer.length}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "z x c v b n m",
            "{bksp} {enter}",
          ],
        }}
        display={{
          "{shift}": "⇧",
          "{shiftactivated}": "⇧",
          "{enter}": "↵",
          "{bksp}": "⌫",
          "{altright}": ".?123",
          "{downkeyboard}": "🞃",
          "{space}": " ",
          "{default}": "ABC",
          "{back}": "⇦",
        }}
      />
    </div>
  );
}

export default Guess;
