import { game as _game } from "./data";
import { useState, useEffect, useMemo, useCallback } from "react";
import useEventListener from "./useEventListener";
import Timer from "./Timer";
import Word from "./Word";
import Results from "./Results";
import { getNegativeWord, getPositiveWord } from "./getWord";
import { Button } from "semantic-ui-react";
import Keyboard from "./Keyboard";
import StatsComponent from "./StatsComponent";
// import getRandomThreeLetterPuzzle from "./randomPuzzleGenerator/three/three";
import getRandomFourLetterPuzzle from "./randomPuzzleGenerator/four/four";
import getDailyPuzzleNumber from "./getDailyPuzzleNumber";
import { bluePuzzle } from "./specialPuzzles/bluePuzzle";
import { horsePuzzle } from "./specialPuzzles/horsePuzzle";
import getCompletedAchievements from "./utils/getCompletedAchievements";
import getAchievementByType from "./utils/getAchievementByType";
import { Achievement } from "./Achievements";

const isStreaming = false;

const TIME_LIMIT = 60000;
const INCREMENT = 200;

let tileHintTimer = null;

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const puzzleParam = params?.p ?? undefined;

const specialPuzzleParam = params?.special ?? undefined;

function getRandomPuzzleNumber() {
  return Math.floor(Math.random() * getDailyPuzzleNumber());
}

export default function Game(props) {
  const {
    archivePuzzleNumber = -1, // which puzzle from archive user selected
    isDarkMode,
    isHardMode,
    isTeacherMode,
    mode, // daily, archive, practice, challenge
    onPlayAgain,
    selectionMode,
    onOptionSelected,
    setIsTeacherMode,
  } = props;

  const preGameAchievementsStatus = useMemo(() => {
    return getCompletedAchievements();
  }, []);

  /**
   * puzzle number for the game being completed (where applicable)
   */
  const puzzleNumber = useMemo(() => {
    if (puzzleParam) {
      return puzzleParam;
    }

    if (specialPuzzleParam) {
      return specialPuzzleParam;
    }

    if (mode === "daily") {
      return getDailyPuzzleNumber();
    }

    if (mode === "practice") {
      return getRandomPuzzleNumber();
    }

    if (mode === "archive") {
      return archivePuzzleNumber || 0;
    }

    return -1;
  }, [mode, archivePuzzleNumber]);

  /**
   * the actual puzzle being completed
   */
  const game = useMemo(() => {
    // if challenge mode, get a random nyt puzzle
    if (mode === "challenge") {
      const shouldGetThreeLetterPuzzle = Math.random() < 0.5;

      let puzzle = null;

      while (!puzzle) {
        try {
          if (shouldGetThreeLetterPuzzle) {
            puzzle = getRandomFourLetterPuzzle(); // [three letter ones kinda suck] getRandomThreeLetterPuzzle();
          } else {
            puzzle = getRandomFourLetterPuzzle();
          }
        } catch (e) {}
      }

      return puzzle;
    }

    if (specialPuzzleParam === "bert") {
      return bluePuzzle;
    } else if (specialPuzzleParam === "michael") {
      return horsePuzzle;
    }

    // else, use puzzleNumber as index
    return _game[puzzleNumber];
  }, [mode, puzzleNumber]);

  // if there's no game data, then refresh the page
  if (!game) {
    window.location.href = `/?v=${Math.random()}`;
  }

  /**
   * returns results from daily game (if played)
   * else returns undefined
   */
  const getDailyResult = useCallback(() => {
    if (mode === "daily" && puzzleNumber === getDailyPuzzleNumber()) {
      const resultData = window.localStorage.getItem(`puzzle-${puzzleNumber}`);

      if (resultData) {
        const parsedResultData = JSON.parse(resultData);
        return {
          score: parsedResultData.score,
          progress: (parsedResultData.time * 100000) / TIME_LIMIT,
        };
      }
    }

    return undefined;
  }, [mode, puzzleNumber]);
  const dailyResult = getDailyResult();

  /**
   * initializes the number of remaining skips
   */
  const initializeRemainingSkips = () => {
    if (mode === "challenge") {
      return 1;
    }

    if (isHardMode) {
      return 0;
    }

    return getSkipsCount(puzzleNumber);
  };

  //////////////////////
  ///// GAME STATE /////
  //////////////////////
  const [progress, setProgress] = useState(dailyResult?.progress ?? 0); // how much time left
  const [gameLevel, setGameLevel] = useState(dailyResult?.score ?? 0); // current game level
  const [isOver, setIsOver] = useState(!!dailyResult); // has game ended
  const [guess, setGuess] = useState(""); // current typed guess
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [shouldShowTileToChange, setShouldShowTileToChange] = useState(false);
  const [remainingSkips, setRemainingSkips] = useState(
    initializeRemainingSkips
  );
  const [skipsUsed, setSkipsUsed] = useState(
    mode === "challenge" ? 0 : undefined
  );
  const [achievements, setAchievements] = useState([]);
  const [showHints, setShowHints] = useState(false);

  /////////////////////////////////
  /// CURRENT ROUND INFORMATION ///
  /////////////////////////////////
  const [word, setWord] = useState(game[gameLevel]?.word);
  const [hint, setHint] = useState(game[gameLevel]?.hint);
  const [answer, setAnswer] = useState(game[gameLevel]?.answer ?? "");

  // success or failure message after guess
  const [messageDetails, setMessageDetails] = useState({
    message: "",
    color: "",
  });

  const [winningAnimation, setWinningAnimation] = useState(false);

  /**
   * saves game result to localStorage
   */
  const saveResult = useCallback(() => {
    // no-op for practice and challenge modes
    if (
      mode === "practice" ||
      mode === "challenge" ||
      specialPuzzleParam !== undefined
    ) {
      return;
    }

    const time = parseFloat(
      (((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)
    );

    window.localStorage.setItem(
      `puzzle-${puzzleNumber}`,
      JSON.stringify({
        score: gameLevel,
        time: time,
      })
    );
  }, [mode, progress, gameLevel, puzzleNumber]);

  /**
   * checks if the user's guess matches the answer
   */
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
      document.getElementById("guessingWord").classList.add("animateWrongWord");
      setTimeout(() => {
        document
          .getElementById("guessingWord")
          .classList.remove("animateWrongWord");
      }, 700);

      setMessageDetails({
        message: getNegativeWord(),
        color: isDarkMode ? "#ff695e" : "#d95c5c",
      });

      setTimeout(() => {
        setGuess(selectionMode ? word : "");
      }, 150);

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [guess, answer, word, selectionMode, isDarkMode]);

  // hook that checks answer when guess is made
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
  useEffect(() => {
    if (progress >= 100 && !isTeacherMode) {
      // clear pendin timeout
      clearTimeout(tileHintTimer);

      // save result to localStorage
      saveResult();

      // update game state
      setIsOver(true);
    }
  }, [progress, isTeacherMode, saveResult]);

  // hook that updates level information
  useEffect(() => {
    if (gameLevel === game.length) {
      clearTimeout(tileHintTimer);

      setWinningAnimation(true);

      setTimeout(() => {
        setWinningAnimation(false);
        setIsOver(true);
      }, 900);

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
          if (!isOver) {
            document
              .getElementsByClassName("altered")[0]
              ?.classList.add("animateHintTile");
            setTimeout(() => {
              document
                .getElementsByClassName("altered")[0]
                ?.classList.remove("animateHintTile");
            }, 800);
          }
        }, 0);
      }, 10000);
    }
  }, [gameLevel, game, word, selectionMode, isHardMode, isOver]);

  // hook that congratulates user when they get an answer right
  useEffect(() => {
    if (gameLevel > 0 && gameLevel < 10 && !isOver) {
      setMessageDetails({
        message: getPositiveWord(),
        color: getComputedStyle(document.documentElement).getPropertyValue(
          "--achievementBackgroundSuccess"
        ),
      });

      setTimeout(() => {
        setMessageDetails({ message: "", color: "" });
      }, 1000);
    }
  }, [gameLevel, isOver]);

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

  // hook that saves game progress to local storage
  useEffect(() => {
    // no-op for practice and challenge modes
    if (
      mode === "practice" ||
      mode === "challenge" ||
      specialPuzzleParam !== undefined
    ) {
      return;
    }

    const time = parseFloat(
      (((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)
    );

    const alreadyPlayed = getDailyResult() !== undefined;

    if (isOver) {
      window.localStorage.setItem(
        `puzzle-${puzzleNumber}`,
        JSON.stringify({
          score: gameLevel,
          time: time,
        })
      );

      if (window.localStorage.getItem("isSupporter") === "true") {
        if (!alreadyPlayed && isHardMode) {
          // increment hard mode wins
          window.localStorage.setItem(
            "hardModeWins",
            parseInt(window.localStorage.getItem("hardModeWins") || "0") + 1
          );
        }

        // check achievements
        requestAnimationFrame(() => {
          const postGameAchievementsStatus = getCompletedAchievements();

          const newAchievements = [];

          for (let i = 0; i < preGameAchievementsStatus.length; i++) {
            const pre = preGameAchievementsStatus[i];
            const post = postGameAchievementsStatus[i];

            if (post === true && pre === false) {
              newAchievements.push(getAchievementByType(i));
            }
          }

          console.log(newAchievements);
          setAchievements(newAchievements);
        });
      }
    }
  }, [
    mode,
    progress,
    isOver,
    puzzleNumber,
    gameLevel,
    preGameAchievementsStatus,
    isHardMode,
    getDailyResult,
  ]);

  const showSkipButton = useMemo(() => {
    if (mode === "challenge") {
      return true;
    }

    return progress < 85 && remainingSkips > 0;
  }, [progress, remainingSkips, mode]);

  const [debounceSkip, setDeboounceSkip] = useState(false);
  const onSkipped = useCallback(() => {
    if (!showSkipButton) {
      return;
    }

    if (debounceSkip) {
      return;
    }

    if (!debounceSkip) {
      setDeboounceSkip(true);
      setTimeout(() => {
        setDeboounceSkip(false);
      }, 500);
    }

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
      const newElapsedTime = ((elapsedTime + 5 * 1000) / TIME_LIMIT) * 100;

      return Math.min(newElapsedTime, 100);
    });

    // decrement remaining skips (unless in challenge mode)
    mode !== "challenge" && setRemainingSkips(remainingSkips - 1);

    // increment number of skips used
    mode === "challenge" && setSkipsUsed(skipsUsed + 1);
  }, [showSkipButton, isOver, mode, remainingSkips, skipsUsed, debounceSkip]);

  // adds keydown handlers to window so desktop users can type
  useEventListener("keydown", (e) => {
    if (isOver) {
      onPlayAgain && onPlayAgain();
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

    if (e.key === " ") {
      e.preventDefault();
      e.stopPropagation();

      if (!isOver) {
        onSkipped();
      }

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
          color: isDarkMode ? "#ffe21f" : "#f2c61f",
          overrideTextColor: "black",
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

    const renderMe = (element, i) => {
      return element;
    };

    _board.push(
      renderMe(
        <Word
          key={game[0].word + "123"}
          answer={game[0].word}
          mode="board"
          showHint={showHints}
          hint="(starter word)"
        />,
        -1
      )
    );

    for (let i = 0; i < gameLevel; i++) {
      _board.push(
        renderMe(
          <Word
            key={game[i].answer}
            answer={game[i].answer}
            alteredPosition={game[i].alteredPosition}
            mode="board"
            hint={game[i].hint}
            showHint={showHints}
          />,
          i
        )
      );
    }

    if (gameLevel < 10) {
      _board.push(
        renderMe(
          <Word
            key={game[gameLevel].answer}
            answer={game[gameLevel].answer}
            alteredPosition={game[gameLevel].alteredPosition}
            failed={true}
            mode="board"
            hint={game[gameLevel].hint}
            showHint={showHints}
          />,
          gameLevel
        )
      );
    }

    return (
      <div>
        <Button
          basic
          id="showHintsButton"
          size="large"
          inverted={isDarkMode}
          onClick={() => setShowHints(!showHints)}
        >
          {showHints ? "HIDE" : "SHOW"} HINTS
        </Button>
        {_board}
      </div>
    );
  }, [game, gameLevel, isDarkMode, showHints]);

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
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          correct={gameLevel}
          isPractice={mode === "practice"}
          isTeacherMode={isTeacherMode}
          time={(((progress / 100) * TIME_LIMIT) / 1000).toFixed(2)}
          onCopied={() => {
            setMessageDetails({
              message: "COPIED TO YOUR CLIPBOARD",
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--achievementBackgroundSuccess"),
            });

            setTimeout(() => {
              setMessageDetails({ message: "", color: "" });
            }, 1000);
          }}
          puzzleNumber={puzzleNumber}
          isChallengeMode={mode === "challenge"}
          onPlayAgain={onPlayAgain}
          skipsUsed={skipsUsed}
          mode={mode}
          gameData={game}
          setIsTeacherMode={setIsTeacherMode}
        />
      )}

      {achievements.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "500px",
            width: "100%",
            marginTop: "36px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {achievements.map((_achievement) => {
            return (
              <Achievement
                key={_achievement.type}
                type={_achievement.type}
                title={_achievement.title}
                description={_achievement.description}
                isSupporter={true}
                onClick={() => {
                  onOptionSelected("achievements");
                }}
              />
            );
          })}
        </div>
      ) : null}

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
            {(mode === "daily" || mode === "archive") && (
              <>
                <div
                  style={{
                    height: "36px",
                  }}
                ></div>
                <StatsComponent
                  resultsPage={true}
                  isTeacherMode={isTeacherMode}
                />
              </>
            )}
            <div style={{ height: "60px" }}></div>
            <div id="resultBoardContainer">{board}</div>
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
                winningAnimation={winningAnimation}
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
              winningAnimation={winningAnimation}
            />
            <div id="hint" className="hint">
              {hint}
            </div>
            {showSkipButton && (
              <Button
                id="skipButton"
                onClick={onSkipped}
                className="button"
                inverted={isDarkMode}
                color="red"
              >
                {mode === "challenge"
                  ? "SKIP (SPACEBAR)"
                  : `SKIP (${remainingSkips} left)`}
              </Button>
            )}
          </>
        )}
      </div>

      {isStreaming && !isOver && <div className="cta">PLAYCLADDER.COM</div>}

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
            color:
              messageDetails.overrideTextColor ||
              (isDarkMode ? "black" : "white"),
            top: `${
              document.getElementById(messageTargetId)?.getBoundingClientRect()
                ?.top - (isOver ? 20 : 50)
            }px`,
          }}
        >
          {messageDetails.message}
        </div>
      )}
    </>
  );
}

const getSkipsCount = (puzzleNumber) => {
  const hardPuzzles = [51];

  return hardPuzzles.includes(puzzleNumber) ? 3 : 2;
};
