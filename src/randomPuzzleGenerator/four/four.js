import getAlteredPosition from "../util/getAlteredPosition";
import getRandomInt from "../util/getRandomInt";
import getRestrictedPosition from "../util/getRestrictedPosition";
import isValidNextLevel from "../util/isValidNextLevel";

// read and parse data
import four from "./fourData";
const fourKeys = Object.keys(four);

const getRandomFourLetterPuzzle = () => {
  try {
    const randomizer = getRandomizer();

    const initialWord = fourKeys[randomizer];
    const nextLevel = getNextLevel(initialWord);

    const puzzle = [
      {
        word: initialWord,
        hint: nextLevel.hint,
        answer: nextLevel.answer,
        alteredPosition: getAlteredPosition(initialWord, nextLevel.answer),
      },
    ];
    const puzzleAnswers = [initialWord, nextLevel.answer];

    while (puzzle.length < 10) {
      const previousAnswer = puzzle[puzzle.length - 1].answer;
      const nextNextLevel = getNextLevel(
        previousAnswer,
        getRestrictedPosition(puzzle)
      );

      if (!nextNextLevel) {
        return getRandomFourLetterPuzzle();
      }

      if (!puzzleAnswers.includes(nextNextLevel.answer)) {
        puzzle.push({
          word: previousAnswer,
          hint: nextNextLevel.hint,
          answer: nextNextLevel.answer,
          alteredPosition: getAlteredPosition(
            previousAnswer,
            nextNextLevel.answer
          ),
        });

        puzzleAnswers.push(nextNextLevel.answer);
      }
    }

    return puzzle;
  } catch (e) {
    console.log("failed to get a puzzle");
    return getRandomFourLetterPuzzle();
  }
};

const getNextLevel = (word, restrictedPosition = -1) => {
  const randomizer = getRandomizer();

  let attempts = 0;

  for (let i = randomizer; i < fourKeys.length; i++) {
    const candidateWord = fourKeys[i];

    if (
      /^[a-zA-Z]+$/.test(candidateWord) === true &&
      isValidNextLevel(word, candidateWord, restrictedPosition)
    ) {
      const hints = four[candidateWord];
      const randomHint = hints[Math.floor(Math.random() * hints.length)];

      return {
        answer: candidateWord,
        hint: randomHint,
      };
    }

    // reset if we haven't found a next word
    if (i === fourKeys.length - 1) {
      if (attempts === 1) {
        return null;
      }

      i = 0;
      attempts++;
    }
  }
};

const getRandomizer = () => {
  return getRandomInt(0, fourKeys.length - 1);
};

export default getRandomFourLetterPuzzle;
