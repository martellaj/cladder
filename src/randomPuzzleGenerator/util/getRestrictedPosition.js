const getRestrictedPosition = (puzzle) => {
  if (puzzle.length < 2) {
    return -1;
  }

  const currentLevelAlteredPosition = puzzle[puzzle.length - 1].alteredPosition;
  const previousLevelAlteredPosition =
    puzzle[puzzle.length - 2].alteredPosition;

  if (currentLevelAlteredPosition === previousLevelAlteredPosition) {
    return currentLevelAlteredPosition;
  }

  return -1;
};

export default getRestrictedPosition;
