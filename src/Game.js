import { game as _game } from "./data";
import { useState, useEffect, useMemo, useCallback } from "react";
import useEventListener from "./useEventListener";
import Timer from "./Timer";
import Word from "./Word";
import Results from "./Results";
import animateCSS from "./animateCSS";
import { getNegativeWord, getPositiveWord } from "./getWord";
import { Button } from "semantic-ui-react";
import Keyboard from "./Keyboard";
import StatsComponent from "./StatsComponent";

const TIME_LIMIT = 60000;
const INCREMENT = 200;

let tileHintTimer = null;

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomPuzzle() {
  return Math.floor(Math.random() * getPuzzleNumber());
}

export default function Game(props) {
  const {
    isIos,
    isDarkMode,
    isPractice,
    selectionMode,
    isHardMode,
    isTeacherMode,
    puzzleNumber,
  } = props;

  const [guess, setGuess] = useState(""); // current typed guess
  const [progress, setProgress] = useState(0); // how much time left
  const [isOver, setIsOver] = useState(false); // has game ended
  const [gameLevel, setGameLevel] = useState(0); // current game level
  const [skippedLevel, setSkippedLevel] = useState(false); // has user skipped level
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [shouldShowTileToChange, setShouldShowTileToChange] = useState(false);

  const specificGameLevel = useMemo(() => {
    return params?.p !== null
      ? parseInt(params.p)
      : isPractice
      ? getRandomPuzzle()
      : puzzleNumber !== undefined
      ? puzzleNumber
      : undefined;
  }, [isPractice, puzzleNumber]);

  // let d = new Date();
  // d = d.setDate(d.getDate() + 1);
  const PUZZLE_NUMBER = useMemo(() => {
    return specificGameLevel ?? getPuzzleNumber();
  }, [specificGameLevel]);

  const [remainingSkips, setRemainingSkips] = useState(
    isHardMode ? 0 : getSkipsCount(PUZZLE_NUMBER)
  );

  // gets the daily puzzle
  const game = _game[PUZZLE_NUMBER];

  if (!game) {
    window.location.href = `/?v=${Math.random()}`;
  }

  // useEffect(() => {
  //   if (guess === "foo") {
  //     setGameLevel(game.length - 1);
  //     setGuess("");
  //   }
  // }, [guess, game.length]);

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
        setGuess(selectionMode ? word : "");
      }, 150);

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [guess, answer, word, selectionMode]);

  // checks answer when guess is made
  useEffect(() => {
    if (selectionMode && selectedIndex !== -1 && guess !== word) {
      setTimeout(() => {
        checkAnswer();
      }, 150);
    } else if (!selectionMode && guess && guess.length === answer.length) {
      setTimeout(() => {
        checkAnswer();
      }, 150);
    }
  }, [guess, word, selectedIndex, checkAnswer, answer.length, selectionMode]);

  // hook for when timer ends
  // todo: add game level info
  useEffect(() => {
    if (progress >= 100 && !isTeacherMode) {
      clearTimeout(tileHintTimer);
      setIsOver(true);
    }
  }, [progress, isTeacherMode]);

  // hook that updates level information
  useEffect(() => {
    if (gameLevel === game.length) {
      clearTimeout(tileHintTimer);
      setIsOver(true);
      return;
    }

    setSelectedIndex(-1);

    setShouldShowTileToChange(false);
    clearTimeout(tileHintTimer);

    // set new level information
    setWord(game[gameLevel].word);
    setHint(game[gameLevel].hint);
    setAnswer(game[gameLevel].answer);

    // clear guess
    setGuess(selectionMode ? word : "");

    if (!isHardMode) {
      tileHintTimer = setTimeout(() => {
        setShouldShowTileToChange(true);
        setTimeout(() => {
          animateCSS(".altered", "heartBeat");
        }, 0);
      }, 10000);
    }
  }, [gameLevel, game, word, selectionMode, isHardMode]);

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
    // ignore stored result if using param or practicing
    if (specificGameLevel !== undefined || isPractice) {
      return;
    }

    const data = window.localStorage.getItem(`puzzle-${PUZZLE_NUMBER}`);

    if (data) {
      const _data = JSON.parse(data);
      setGameLevel(_data.score);
      setProgress((_data.time * 100000) / TIME_LIMIT);
      setIsOver(true);
    }
  }, [PUZZLE_NUMBER, specificGameLevel, isPractice]);

  // hook that saves game progress to local storage
  useEffect(() => {
    const time = parseFloat(
      (((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)
    );

    if (isOver && !isPractice) {
      window.localStorage.setItem(
        `puzzle-${PUZZLE_NUMBER}`,
        JSON.stringify({
          score: gameLevel,
          time: time,
        })
      );
    }
  }, [
    isOver,
    PUZZLE_NUMBER,
    gameLevel,
    progress,
    specificGameLevel,
    isPractice,
  ]);

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

    if (selectionMode) {
      if (selectedIndex > -1) {
        const newGuess =
          guess.substring(0, selectedIndex) +
          key +
          guess.substring(selectedIndex + 1);
        setGuess(newGuess);
      }
    } else if (key.length === 1 && guess.length < answer.length) {
      setGuess(guess + key);
    }
  });

  // keydown handler for OSK (mobile users)
  const onKeyboardKeyPress = (key) => {
    if (isOver || key === "ENTER") {
      return;
    }

    if (key === "DELETE") {
      const newGuess = guess.slice(0, -1);

      setGuess(newGuess || "");
      return;
    }

    if (selectionMode) {
      if (selectedIndex > -1) {
        const newGuess =
          guess.substring(0, selectedIndex) +
          key +
          guess.substring(selectedIndex + 1);
        setGuess(newGuess);
      } else {
        setMessageDetails({
          message: "Tap a tile to change its letter!",
          color: "#c39b38",
        });

        setTimeout(() => {
          setMessageDetails({
            message: "",
            color: "",
          });
        }, 3000);
      }
    } else if (guess.length < answer.length) {
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
    return progress < 85 && remainingSkips > 0;
  }, [progress, remainingSkips]);

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

  const onTileSelected = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  return (
    <>
      {!isTeacherMode && (
        <div style={{ width: "100%" }}>{<Timer progress={progress} />}</div>
      )}

      {isOver && (
        <Results
          isIos={isIos}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          correct={gameLevel}
          isPractice={isPractice}
          isTeacherMode={isTeacherMode}
          time={(((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)}
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
            animateCSS("#shareButton", "heartBeat");
          }}
          specificGameLevel={specificGameLevel}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto 0px",
        }}
      >
        {isOver && (
          <>
            {<div style={{ height: "36px" }}></div>}
            <StatsComponent resultsPage={true} isTeacherMode={isTeacherMode} />
            <div style={{ height: "60px" }}></div>
            {board}
            <div style={{ height: "24px" }}></div>
          </>
        )}

        {!isOver && (
          <>
            {!selectionMode && (
              <Word
                id="previousWord"
                key={`${word}-prev`}
                answer={word}
                mode="board"
              />
            )}
            <Word
              id="guessingWord"
              key={answer}
              answer={answer}
              guess={guess}
              mode="hint"
              selectedIndex={selectedIndex}
              onTileSelected={onTileSelected}
              alteredPosition={game[gameLevel]?.alteredPosition}
              showTileToChange={shouldShowTileToChange}
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

                  // penalize user for skipping by incrementing timer
                  setProgress((oldProgress) => {
                    if (isOver) {
                      return oldProgress;
                    }

                    const elapsedTime = (oldProgress / 100) * TIME_LIMIT;
                    const newElapsedTime =
                      ((elapsedTime + 5 * 1000) / TIME_LIMIT) * 100;

                    return Math.min(newElapsedTime, 100);
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
        <Keyboard
          onKeyPress={onKeyboardKeyPress}
          selectionMode={selectionMode}
        />
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

const getSkipsCount = (puzzleNumber) => {
  const hardPuzzles = [51];

  return hardPuzzles.includes(puzzleNumber) ? 3 : 1;
};
