import { game as _game } from "./data";
import { useState, useEffect, useMemo, useCallback } from "react";
import useEventListener from "./useEventListener";
import Timer from "./Timer";
import Word from "./Word";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Results from "./Results";
import animateCSS from "./animateCSS";
import { getNegativeWord, getPositiveWord } from "./getWord";
import { Button } from "semantic-ui-react";
import { updateStats } from "./stats";

export default function Game(props) {
  const { isIos, isDarkMode, score = -1, time = -1, puzzleNumber } = props;

  const [guess, setGuess] = useState(""); // current typed guess
  const [gameLevel, setGameLevel] = useState(score > 0 ? score : 0); // current game level
  const [skippedLevel, setSkippedLevel] = useState(false); // has user skipped level
  const [remainingSkips, setRemainingSkips] = useState(2);

  // Timer bits
  const [isOver, setIsOver] = useState(score >= 0); // has game ended
  const [hideSkips, setHideSkips] = useState(false);

  // Results bits
  const [finalScore, setFinalScore] = useState(score);
  const [finalTime, setFinalTime] = useState(time);

  const start = useMemo(() => {
    return Date.now();
  }, []);

  // gets the daily puzzle
  const game = _game[puzzleNumber];

  // current level information
  const [word, setWord] = useState(game[gameLevel]?.word);
  const [hint, setHint] = useState(game[gameLevel]?.hint);
  const [answer, setAnswer] = useState(game[gameLevel]?.answer);

  // success or failure message after guess
  const [messageDetails, setMessageDetails] = useState({
    message: "",
    color: "",
  });

  // checks if the user's guess matches the answer
  const checkAnswer = useCallback(() => {
    // don't check before guess is set or if guess hasn't changed yet
    if (!guess) {
      return;
    }

    if (guess.toLowerCase() === answer.toLowerCase()) {
      setGameLevel((currentLevel) => {
        return currentLevel + 1;
      });
    } else {
      animateCSS("#guessingWord", "shakeX");
      setMessageDetails({ message: getNegativeWord(), color: "darkred" });

      setTimeout(() => {
        setGuess("");
      }, 150);

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [guess, answer]);

  // checks answer when guess is made
  useEffect(() => {
    if (guess && guess.length === answer.length) {
      setTimeout(() => {
        checkAnswer();
      }, 150);
    }
  }, [guess, checkAnswer, answer, word]);

  // hook that updates level information
  useEffect(() => {
    if (gameLevel === game.length) {
      setIsOver(true);
      return;
    }

    // set new level information
    setWord(game[gameLevel].word);
    setHint(game[gameLevel].hint);
    setAnswer(game[gameLevel].answer);

    // clear guess
    setGuess("");
  }, [gameLevel, game, word]);

  // hook that congratulates user when they get an answer right
  useEffect(() => {
    if (gameLevel > 0 && gameLevel < 10 && !isOver) {
      setMessageDetails({ message: getPositiveWord(), color: "green" });

      // reset if user skipped
      setSkippedLevel(false);

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [gameLevel, isOver, skippedLevel]);

  // hook that saves game progress to local storage
  useEffect(() => {
    const data = window.localStorage.getItem(`puzzle-${puzzleNumber}`);

    if (isOver && !data) {
      const end = Date.now();
      const time = parseFloat((end - start) / 1000).toFixed(2);

      setFinalScore(gameLevel);
      setFinalTime(time);

      window.localStorage.setItem(
        `puzzle-${puzzleNumber}`,
        JSON.stringify({
          score: gameLevel,
          time: time,
        })
      );

      updateStats({
        score: gameLevel,
        time: time,
      });
    }
  }, [isOver, puzzleNumber, gameLevel, start]);

  // adds keydown handlers to window so desktop users can type
  useEventListener("keydown", (e) => {
    if (isOver) {
      return;
    }

    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return;
    }

    if (e.key === "Backspace") {
      const newGuess = guess.slice(0, -1);

      setGuess(newGuess || "");
      return;
    }

    const key = e.key.toLowerCase().trim();
    if (key.length === 1 && guess.length < answer.length) {
      setGuess(guess + key);
    }
  });

  // keydown handler for OSK (mobile users)
  const onKeyboardKeyPress = (key) => {
    if (isOver) {
      return;
    }

    if (key === "{backspace}") {
      const newGuess = guess.slice(0, -1);

      setGuess(newGuess || "");
      return;
    }

    if (guess.length < answer.length) {
      setGuess(guess + key);
    }
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

    if (gameLevel < 10) {
      _board.push(
        <Word
          key={game[gameLevel].answer}
          answer={game[gameLevel].answer}
          alteredPosition={game[gameLevel].alteredPosition}
          failed={true}
          mode="board"
        />
      );
    }

    return _board;
  }, [game, gameLevel]);

  const showSkipButton = useMemo(() => {
    return !hideSkips && remainingSkips > 0;
  }, [hideSkips, remainingSkips]);

  const messageTargetId = useMemo(() => {
    let id = "hint";

    if (isOver) {
      id = "shareButton";
    } else if (showSkipButton) {
      id = "skipButton";
    } else {
      id = "hint";
    }

    return id;
  }, [isOver, showSkipButton]);

  return (
    <>
      <div style={{ width: "100%" }}>
        {
          <Timer
            setHideSkips={setHideSkips}
            setIsOver={setIsOver}
            skipsUsed={2 - remainingSkips}
            isOver={isOver}
            finalTime={isOver && finalTime ? finalTime : -1}
            start={start}
          />
        }
      </div>

      {isOver && finalScore > -1 && (
        <Results
          correct={finalScore}
          time={finalTime}
          isIos={isIos}
          onCopied={() => {
            setMessageDetails({
              message: "COPIED TO YOUR CLIPBOARD",
              color: "green",
            });

            setTimeout(() => {
              setMessageDetails({ message: "", color: "" });
            }, 1000);
          }}
          puzzleNumber={puzzleNumber}
          onLoaded={() => {
            setMessageDetails({
              message: "PLEASE SHARE ❤️",
              color: "green",
            });

            setTimeout(() => {
              setMessageDetails({ message: "", color: "" });
            }, 2000);
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
              id="previousWord"
              key={`${word}-prev`}
              answer={word}
              mode="board"
            />
            <Word
              id="guessingWord"
              key={answer}
              answer={answer}
              guess={guess}
              mode="hint"
            />
            <div id="hint" className="hint">
              {hint}
            </div>
            {showSkipButton && (
              <Button
                id="skipButton"
                onClick={() => {
                  // note user skipped level (so no notification)
                  setSkippedLevel(true);

                  // increment level
                  setGameLevel((currentLevel) => {
                    return currentLevel + 1;
                  });

                  // decrement remaining skips
                  setRemainingSkips(remainingSkips - 1);
                }}
                className="button"
                inverted={isDarkMode}
                color="red"
              >
                SKIP ({remainingSkips} left)
              </Button>
            )}
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
            layoutName={"default"}
            layout={{
              default: [
                "Q W E R T Y U I O P",
                "A S D F G H J K L",
                "Z X C V B N M {backspace}",
              ],
            }}
            display={{
              "{backspace}": "⌫",
            }}
          />
        </div>
      )}

      {messageDetails.message && (
        <div
          className="message slide-top"
          style={{
            letterSpacing: "0.2rem",
            textTransform: "uppercase",
            backgroundColor: messageDetails.color,
            top: `${
              document.getElementById(messageTargetId)?.getBoundingClientRect()
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
