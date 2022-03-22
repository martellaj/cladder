import { game as _game } from "./data";
import { useState, useEffect, useMemo, useCallback } from "react";
import useEventListener from "./useEventListener";
import Timer from "./Timer";
import Word from "./Word";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Results from "./Results";
import animateCSS from "./animateCSS";

const TIME_LIMIT = 30000;
const INCREMENT = 100;

export default function Game() {
  const [guess, setGuess] = useState(""); // current typed guess
  const [progress, setProgress] = useState(0); // how much time left
  const [isOver, setIsOver] = useState(false); // has game ended
  const [gameLevel, setGameLevel] = useState(0); // current game level
  const [selected, setSelected] = useState(0);

  const PUZZLE_NUMBER = getPuzzleNumber();

  // gets the daily puzzle
  const game = _game[PUZZLE_NUMBER];

  useEffect(() => {
    if (guess === "foo") {
      setGameLevel(game.length - 1);
      setGuess("");
    }
  }, [guess, game.length]);

  // current level information
  const [word, setWord] = useState(game[gameLevel]?.word);
  const [hint, setHint] = useState(game[gameLevel]?.hint);
  const [answer, setAnswer] = useState(game[gameLevel]?.answer);

  // success or failure message after guess
  const [messageDetails, setMessageDetails] = useState({
    message: "",
    color: "",
  });

  /**
   * checks if the user's guess matches the answer
   *
   * - if correct, clear answer and increment level
   * - if incorrect, clear answer
   */
  const checkAnswer = useCallback(() => {
    // don't check before guess is set or if guess hasn't changed yet
    if (!guess || guess.toLowerCase() === word.toLowerCase()) {
      return;
    }

    if (guess.toLowerCase() === answer.toLowerCase()) {
      setGameLevel((currentLevel) => {
        return currentLevel + 1;
      });
    } else {
      animateCSS(".wordContainer", "shakeX");
      setMessageDetails({ message: "not quite", color: "darkred" });

      setTimeout(() => {
        setGuess(word);
      }, 500);
    }

    setTimeout(() => {
      setMessageDetails({ message: "", color: "" });
    }, 1000);
  }, [guess, word, answer]);

  // checks answer when guess is made
  useEffect(() => {
    if (guess) {
      checkAnswer();
    }
  }, [guess, checkAnswer]);

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
    setGuess(game[gameLevel].word);
  }, [gameLevel, game]);

  // hook that congratulates user when they get an answer right
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

  // tries to see if game has been played today
  useEffect(() => {
    const data = window.localStorage.getItem(`puzzle-${PUZZLE_NUMBER}`);

    if (data) {
      const _data = JSON.parse(data);
      setGameLevel(_data.score);
      setProgress((_data.time * 100000) / TIME_LIMIT);
      setIsOver(true);
    }
  }, [PUZZLE_NUMBER]);

  // hook that saves game progress to local storage
  useEffect(() => {
    const data = window.localStorage.getItem(`puzzle-${PUZZLE_NUMBER}`);

    if (isOver && !data) {
      window.localStorage.setItem(
        `puzzle-${PUZZLE_NUMBER}`,
        JSON.stringify({
          score: gameLevel,
          time: (((progress / 100) * TIME_LIMIT) / 1000).toFixed(2),
        })
      );
    }
  }, [isOver, PUZZLE_NUMBER, gameLevel, progress]);

  // adds keydown handlers to window so desktop users can type
  useEventListener("keydown", (e) => {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }

    const key = e.key.toLowerCase().trim();
    if (key.length === 1) {
      let foo = parseInt(key);
      if (typeof foo === "number" && foo - 1 < answer.length) {
        setSelected(foo - 1);
        return;
      }

      const newGuess =
        guess.substring(0, selected) + key + guess.substring(selected + 1);
      setGuess(newGuess);
    }
  });

  // keydown handler for OSK (mobile users)
  const onKeyboardKeyPress = (key) => {
    const newGuess =
      guess.substring(0, selected) + key + guess.substring(selected + 1);
    setGuess(newGuess);
  };

  const board = useMemo(() => {
    const _board = [];

    _board.push(
      <Word key={game[0].word + "123"} answer={game[0].word} mode="board" />
    );

    for (let i = 0; i < gameLevel; i++) {
      _board.push(
        <Word
          key={game[i].answer}
          answer={game[i].answer}
          alteredPosition={game[i].alteredPosition}
          mode="board"
        />
      );
    }

    return _board;
  }, [game, gameLevel]);

  return (
    <>
      <div style={{ width: "100%" }}>{<Timer progress={progress} />}</div>

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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        {isOver && board}

        {!isOver && (
          <>
            <Word
              key={answer}
              answer={guess}
              mode="hint"
              shouldAnimate={gameLevel > 0}
              selected={selected}
              onSelected={(index) => {
                setSelected(index);
              }}
            />
            <div id="hint" className="hint">
              {hint}
            </div>
          </>
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
          <Keyboard
            onKeyPress={onKeyboardKeyPress}
            maxLength={answer.length}
            mergeDisplay={true}
            layoutName={"default"}
            layout={{
              default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M",
              ],
            }}
            display={{
              "{numbers}": "123",
              "{ent}": "enter",
              "{escape}": "esc ⎋",
              "{tab}": "tab ⇥",
              "{backspace}": "⌫",
              "{capslock}": "caps lock ⇪",
              "{shift}": "⇧",
              "{controlleft}": "ctrl ⌃",
              "{controlright}": "ctrl ⌃",
              "{altleft}": "alt ⌥",
              "{altright}": "alt ⌥",
              "{metaleft}": "cmd ⌘",
              "{metaright}": "cmd ⌘",
              "{abc}": "ABC",
            }}
          />
        </div>
      )}

      {messageDetails.message && (
        <div
          className="message slide-top"
          style={{
            backgroundColor: messageDetails.color,
            top: `${
              document
                .getElementById(isOver ? "shareButton" : "hint")
                ?.getBoundingClientRect()?.top - 50
            }px`,
          }}
        >
          {messageDetails.message}
        </div>
      )}
    </>
  );
}

const getPuzzleNumber = (date) => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = date || new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};
