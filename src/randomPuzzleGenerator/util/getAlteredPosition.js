const getAlteredPosition = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return i;
    }
  }
};

export default getAlteredPosition;
