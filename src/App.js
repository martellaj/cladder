import "./App.css";
// import Guess from "./Guess";
import Timer from "./Timer";
import Word from "./Word";
import { useState, useEffect } from "react";
import useEventListener from "./useEventListener";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { game } from "./data";

const TIME_LIMIT = 30000;
const INCREMENT = 100;

function App() {
  const [guess, setGuess] = useState("");
  const [progress, setProgress] = useState(0);
  const [isOver, setIsOver] = useState(false);

  const [currentClue, setCurrentClue] = useState(0);

  const [word, setWord] = useState(game[currentClue].word);
  const [hint, setHint] = useState(game[currentClue].hint);
  const [answer, setAnswer] = useState(game[currentClue].answer);

  const [messageDetails, setMessageDetails] = useState({
    message: "",
    color: "",
  });

  useEffect(() => {
    if (progress >= 100) {
      setIsOver(true);
    }
  }, [progress]);

  useEffect(() => {
    setWord(game[currentClue].word);
    setHint(game[currentClue].hint);
    setAnswer(game[currentClue].answer);
  }, [currentClue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }

        const oldProg = (oldProgress / 100) * TIME_LIMIT;

        const newProgress = ((oldProg + INCREMENT) / TIME_LIMIT) * 100;

        return Math.min(newProgress, 100);
      });
    }, INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

  const checkAnswer = () => {
    if (guess === answer) {
      setMessageDetails({ message: "nice", color: "green" });

      setCurrentClue((currentClue) => {
        return currentClue + 1;
      });

      setGuess("");
    } else {
      setMessageDetails({ message: "not quite", color: "red" });
      setGuess("");
    }

    setTimeout(() => {
      setMessageDetails({ message: "", color: "" });
    }, 1000);
  };

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          fontSize: "28px",
          fontVariant: "all-small-caps",
        }}
      >
        ONE-OFF
        {!isOver && <Timer progress={progress} />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Word answer={word} mode="hint" />
        <div className="hint">{hint}</div>
      </div>

      <div
        id="guessRegion"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Word answer={word} guess={guess} />
        </div>

        {messageDetails.message && (
          <div
            className="message slide-top"
            style={{
              backgroundColor: messageDetails.color,
              top: `${
                document.getElementById("guessRegion")?.getBoundingClientRect()
                  .top - 50
              }px`,
            }}
          >
            {messageDetails.message}
          </div>
        )}

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
    </div>
  );
}

export default App;
