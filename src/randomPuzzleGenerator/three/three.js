import getAlteredPosition from "../util/getAlteredPosition";
import getRandomInt from "../util/getRandomInt";
import getRestrictedPosition from "../util/getRestrictedPosition";
import isValidNextLevel from "../util/isValidNextLevel";

// read and parse data
import three from "./threeData";
const threeKeys = Object.keys(three);

const getRandomThreeLetterPuzzle = () => {
  const start = Date.now();

  const randomizer = getRandomizer();

  const initialWord = threeKeys[randomizer];
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

  const duration = Date.now() - start;
  console.log(`took ${duration}ms\n`);

  console.log(puzzle);

  return puzzle;
};

const getNextLevel = (word, restrictedPosition = -1) => {
  try {
    const randomizer = getRandomizer();

    let attempts = 0;

    for (let i = randomizer; i < threeKeys.length; i++) {
      const candidateWord = threeKeys[i];

      if (
        /^[a-zA-Z]+$/.test(candidateWord) === true &&
        isValidNextLevel(word, candidateWord, restrictedPosition)
      ) {
        const hints = three[candidateWord];
        const randomHint = hints[Math.floor(Math.random() * hints.length)];

        return {
          answer: candidateWord,
          hint: randomHint,
        };
      }

      // reset if we haven't found a next word
      if (i === threeKeys.length - 1) {
        if (attempts === 1) {
          window.location.href = "/";
          return;
        }

        i = 0;
        attempts++;
      }
    }
  } catch (e) {
    window.location.href = "/";
  }
};

const getRandomizer = () => {
  return getRandomInt(0, threeKeys.length - 1);
};

export default getRandomThreeLetterPuzzle;
