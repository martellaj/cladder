const isValidNextLevel = (word, candidateWord, restrictedPosition = -1) => {
  let alteredPosition = -1;

  for (let i = 0; i < word.length; i++) {
    // set altered position if we haven't already found one
    if (word[i] !== candidateWord[i] && alteredPosition === -1) {
      // return false if the altered position is restricted
      if (i === restrictedPosition) {
        return false;
      }

      alteredPosition = i;
    } else if (word[i] !== candidateWord[i]) {
      // return false if there are multiple different letters
      return false;
    }
  }

  // valid level if we found a single altered position
  return alteredPosition !== -1;
};

export default isValidNextLevel;
