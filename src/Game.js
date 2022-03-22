import { game } from "./data";
import { useState, useEffect, useMemo } from "react";
import useEventListener from "./useEventListener";
import Timer from "./Timer";
import Word from "./Word";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Results from "./Results";

const TIME_LIMIT = 30000;
const INCREMENT = 100;

export default function Game() {
  const [guess, setGuess] = useState(""); // current typed guess
  const [progress, setProgress] = useState(0); // how much time left
  const [isOver, setIsOver] = useState(false); // has game ended
  const [gameLevel, setGameLevel] = useState(0); // current game level

  useEffect(() => {
    if (guess === "foo") {
      setGameLevel(game.length - 1);
      setGuess("");
    }
  }, [guess]);

  // current level information
  const [word, setWord] = useState(game[gameLevel]?.word);
  const [hint, setHint] = useState(game[gameLevel]?.hint);
  const [answer, setAnswer] = useState(game[gameLevel]?.answer);

  // success or failure message after guess
  const [messageDetails, setMessageDetails] = useState({
    message: "",
    color: "",
  });

  // hook for when timer ends
  // todo: add game level info
  useEffect(() => {
    if (progress >= 100) {
      setIsOver(true);
    }
  }, [progress]);

  // hook that updates level information
  useEffect(() => {
    if (gameLevel === game.length) {
      setIsOver(true);
      return;
    }

    setWord(game[gameLevel].word);
    setHint(game[gameLevel].hint);
    setAnswer(game[gameLevel].answer);
  }, [gameLevel]);

  useEffect(() => {
    if (gameLevel > 0 && gameLevel < 10) {
      setMessageDetails({ message: "nice", color: "green" });
    }

    setTimeout(() => {
      setMessageDetails({ message: "", color: "" });
    }, 1000);
  }, [gameLevel]);

  // hook that updates progress bar as time elapses
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (isOver) {
          return oldProgress;
        }

        const elapsedTime = (oldProgress / 100) * TIME_LIMIT;
        const newElapsedTime = ((elapsedTime + INCREMENT) / TIME_LIMIT) * 100;

        return Math.min(newElapsedTime, 100);
      });
    }, INCREMENT);

    return () => {
      clearInterval(timer);
    };
  }, [isOver]);

  // adds keydown handlers to window so desktop users can type
  useEventListener("keydown", (e) => {
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
  });

  // keydown handler for OSK (mobile users)
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

  /**
   * checks if the user's guess matches the answer
   *
   * - if correct, clear answer and increment level
   * - if incorrect, clear answer
   */
  const checkAnswer = () => {
    if (guess === answer) {
      setGameLevel((currentLevel) => {
        return currentLevel + 1;
      });

      setGuess("");
    } else {
      setMessageDetails({ message: "not quite", color: "darkred" });
      setGuess("");
    }

    setTimeout(() => {
      setMessageDetails({ message: "", color: "" });
    }, 1000);
  };

  const board = useMemo(() => {
    const _board = [];
    for (let i = 0; i <= gameLevel; i++) {
      if (i === 10) {
        _board.push(
          <Word
            key={game[9].answer}
            answer={game[9].answer}
            alteredPosition={gameLevel > i ? game[9].alteredPosition : -1}
            mode="hint"
          />
        );
        break;
      }

      _board.push(
        <Word
          key={game[i].word}
          answer={game[i].word}
          alteredPosition={gameLevel > i ? game[i].alteredPosition : -1}
          mode="hint"
        />
      );
    }

    return _board;
  }, [gameLevel]);

  return (
    <>
      <div
        style={{
          width: "100%",
          fontSize: "28px",
          fontVariant: "all-small-caps",
        }}
      >
        NAME OF GAME
        {<Timer progress={progress} />}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {board}
        {!isOver && (
          <div style={{ marginTop: "6px" }}>
            <Word key={word} answer={word} guess={guess} />
          </div>
        )}
      </div>

      {!isOver && (
        <div
          id="guessRegion"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <div className="hint">{hint}</div>

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
      )}

      {isOver && (
        <Results
          correct={gameLevel}
          time={(((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)}
          onCopied={() => {
            setMessageDetails({
              message: "copied to your clipboard",
              color: "green",
            });

            setTimeout(() => {
              setMessageDetails({ message: "", color: "" });
            }, 1000);
          }}
        />
      )}

      {messageDetails.message && (
        <div
          className="message slide-top"
          style={{
            backgroundColor: messageDetails.color,
            top: `${
              document.getElementById("guessRegion")?.getBoundingClientRect()
                ?.top - 50
            }px`,
          }}
        >
          {messageDetails.message}
        </div>
      )}
    </>
  );
}
