const getDailyPuzzleNumber = () => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};

export default getDailyPuzzleNumber;
