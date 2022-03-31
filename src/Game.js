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

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

export default function Game(props) {
  const { isIos, isDarkMode } = props;

  const [guess, setGuess] = useState(""); // current typed guess
  const [gameLevel, setGameLevel] = useState(0); // current game level
  const [skippedLevel, setSkippedLevel] = useState(false); // has user skipped level
  const [remainingSkips, setRemainingSkips] = useState(1);
  const [isTimeLeftToSkip, setIsTimeLeftToSkip] = useState(true);
  const [storedResultTime, setStoredResultTime] = useState(0);

  // game end states
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isCompletedPreviously, setIsCompletedPreviously] = useState(false);

  // game status
  const isGameOver = useMemo(() => {
    return isTimerExpired || isPuzzleSolved || isCompletedPreviously;
  }, [isTimerExpired, isPuzzleSolved, isCompletedPreviously]);

  const specificGameLevel = params?.pz ?? null;

  const startTime = useMemo(() => {
    return Date.now();
  }, []);

  const resultTime = useMemo(() => {
    if (storedResultTime) {
      return storedResultTime;
    }

    if (!isGameOver) {
      return 0;
    }

    const elapsedTime = parseFloat(Date.now() - startTime);
    const skipPenaltyTime = (1 - remainingSkips) * 5000;

    const time = parseFloat(
      ((elapsedTime + skipPenaltyTime) / 1000).toFixed(2)
    );
    return Math.min(60.0, time);
  }, [startTime, storedResultTime, isGameOver, remainingSkips]);

  useEffect(() => {
    let innerTimer = null;
    const timer = setTimeout(() => {
      if (remainingSkips === 0) {
        innerTimer = setTimeout(() => {
          setIsTimerExpired(true);
        }, 5000);
      } else {
        setIsTimerExpired(true);
      }
    }, 60000);

    return () => {
      clearTimeout(innerTimer);
      clearTimeout(timer);
    };
  }, [remainingSkips]);

  // let d = new Date();
  // d = d.setDate(d.getDate() + 1);
  const PUZZLE_NUMBER = specificGameLevel ?? getPuzzleNumber();

  // gets the daily puzzle
  const game = _game[PUZZLE_NUMBER];

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

  const onHideSkips = useCallback(() => {
    setIsTimeLeftToSkip(false);
  }, []);

  // hook that updates level information
  useEffect(() => {
    if (gameLevel === game.length) {
      setIsPuzzleSolved(true);
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
    if (gameLevel > 0 && gameLevel < 10 && !isGameOver) {
      setMessageDetails({ message: getPositiveWord(), color: "green" });

      // reset if user skipped
      setSkippedLevel(false);

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [gameLevel, isGameOver, skippedLevel]);

  // tries to see if game has been played today
  useEffect(() => {
    // let user replay if they visit using link
    if (specificGameLevel !== null) {
      return;
    }

    const data = window.localStorage.getItem(`puzzle-${PUZZLE_NUMBER}`);

    if (data) {
      const _data = JSON.parse(data);
      setGameLevel(_data.score);
      setStoredResultTime(_data.time);
      setIsCompletedPreviously(true);
    }
  }, [PUZZLE_NUMBER, specificGameLevel]);

  // hook that saves game progress to local storage
  useEffect(() => {
    const data = window.localStorage.getItem(`puzzle-${PUZZLE_NUMBER}`);

    if (isGameOver && !data && !specificGameLevel) {
      window.localStorage.setItem(
        `puzzle-${PUZZLE_NUMBER}`,
        JSON.stringify({
          score: gameLevel,
          time: resultTime,
        })
      );

      updateStats({
        score: gameLevel,
        time: resultTime,
      });
    }
  }, [
    isGameOver,
    PUZZLE_NUMBER,
    gameLevel,
    specificGameLevel,
    startTime,
    resultTime,
  ]);

  // adds keydown handlers to window so desktop users can type
  useEventListener("keydown", (e) => {
    if (isGameOver) {
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
    if (isGameOver) {
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
    return isTimeLeftToSkip && remainingSkips > 0;
  }, [isTimeLeftToSkip, remainingSkips]);

  const messageTargetId = useMemo(() => {
    let id = "hint";

    if (isGameOver) {
      id = "shareButton";
    } else if (showSkipButton) {
      id = "skipButton";
    } else {
      id = "hint";
    }

    return id;
  }, [isGameOver, showSkipButton]);

  return (
    <>
      <div style={{ width: "100%" }}>
        {
          <Timer
            isGameOver={isGameOver}
            onHideSkips={onHideSkips}
            resultTime={resultTime}
            remainingSkips={remainingSkips}
          />
        }
      </div>

      {isGameOver && (
        <Results
          isIos={isIos}
          correct={gameLevel}
          time={resultTime}
          onCopied={() => {
            setMessageDetails({
              message: "COPIED TO YOUR CLIPBOARD",
              color: "green",
            });

            setTimeout(() => {
              setMessageDetails({ message: "", color: "" });
            }, 1000);
          }}
          puzzleNumber={PUZZLE_NUMBER}
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
        {isGameOver && board}

        {!isGameOver && (
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

      {!isGameOver && (
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

const getPuzzleNumber = (date) => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = date || new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};
