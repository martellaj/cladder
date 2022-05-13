import getAlteredPosition from "../util/getAlteredPosition";
import getRandomInt from "../util/getRandomInt";
import getRestrictedPosition from "../util/getRestrictedPosition";
import isValidNextLevel from "../util/isValidNextLevel";

// read and parse data
import four from "./fourData";
const fourKeys = Object.keys(four);

const getRandomFourLetterPuzzle = async () => {
  const start = Date.now();

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
  const randomizer = getRandomizer();

  for (let i = randomizer; i < fourKeys.length; i++) {
    const candidateWord = fourKeys[i];

    if (
      /^[a-zA-Z]+$/.test(candidateWord) === true &&
      isValidNextLevel(word, candidateWord, restrictedPosition)
    ) {
      return {
        answer: candidateWord,
        hint: four[candidateWord][
          getRandomInt(0, four[candidateWord].length - 1)
        ],
      };
    }

    // reset if we haven't found a next word
    if (i === fourKeys.length - 1) {
      i = 0;
    }
  }
};

const getRandomizer = () => {
  return getRandomInt(0, fourKeys.length - 1);
};

export default getRandomFourLetterPuzzle;
