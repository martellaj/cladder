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
  let keyboardBackground = "#d3d6da";
  let keyboardActiveBackground = "#ededed";
  let alteredFailedBackground = "indianred";
  let selectedTileBackground = "#c0b9f9";
  let statsBackground = "#f1f1f1";

  if (mode === "dark") {
    black = "white";
    white = "#121212";
    alteredBackground = "#c39b38";
    keyboardBackground = "#373737";
    alteredFailedBackground = "darkred";
    keyboardActiveBackground = "#2b2b2d";
    selectedTileBackground = "#6654f2";
    statsBackground = "#272727";
  }

  let root = document.documentElement;
  root.style.setProperty("--black", black);
  root.style.setProperty("--white", white);
  root.style.setProperty("--alteredBackground", alteredBackground);
  root.style.setProperty("--keyboardBackground", keyboardBackground);
  root.style.setProperty("--alteredFailedBackground", alteredFailedBackground);
  root.style.setProperty(
    "--keyboardActiveBackground",
    keyboardActiveBackground
  );
  root.style.setProperty("--selectedTileBackground", selectedTileBackground);
  root.style.setProperty("--statsBackground", statsBackground);
}
