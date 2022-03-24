export default function toggleDarkMode() {
  const mode = window.localStorage.getItem("mode") || "light";

  if (mode === "light") {
    // flip to dark
    window.localStorage.setItem("mode", "dark");
  } else {
    // flip to light
    window.localStorage.setItem("mode", "light");
  }

  reloadColors();
}

export function reloadColors() {
  const mode = window.localStorage.getItem("mode") || "light";

  let black = "black";
  let white = "white";
  let alteredBackground = "palegoldenrod";
  let keyboardBackground = "#ececec";
  let alteredFailedBackground = "indianred";

  if (mode === "dark") {
    black = "white";
    white = "#121212";
    alteredBackground = "#c39b38";
    keyboardBackground = "darkgray";
    alteredFailedBackground = "darkred";
  }

  let root = document.documentElement;
  root.style.setProperty("--black", black);
  root.style.setProperty("--white", white);
  root.style.setProperty("--alteredBackground", alteredBackground);
  root.style.setProperty("--keyboardBackground", keyboardBackground);
  root.style.setProperty("--alteredFailedBackground", alteredFailedBackground);
}
