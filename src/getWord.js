export function getPositiveWord() {
  const words = ["NICE!", "GOT 'EM", "BOOM!", "WOW!"];
  return getRandom(words);
}

export function getNegativeWord() {
  const words = ["NOT QUITE", "OOPS!", "TRY AGAIN"];
  return getRandom(words);
}

function getRandom(words) {
  return words[Math.floor(Math.random() * words.length)];
}
