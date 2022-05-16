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
  let white = "#f0f0f0";
  let alteredBackground = "palegoldenrod";
  let keyboardBackground = "#d3d6da";
  let keyboardActiveBackground = "#ededed";
  let alteredFailedBackground = "indianred";
  let selectedTileBackground = "#c0b9f9";
  let statsBackground = "#f1f1f1";
  let attemptedTileBackground = "#c0b9f9";
  let completedTileBackground = "#ade8ad";
  let bannerBackgroundColor = "#f3f3f3";
  let headerBackgroundColor = "#dcdcdc";

  if (mode === "dark") {
    black = "white";
    white = "#161616";
    alteredBackground = "#c39b38";
    keyboardBackground = "#373737";
    alteredFailedBackground = "darkred";
    keyboardActiveBackground = "#2b2b2d";
    selectedTileBackground = "#6654f2";
    statsBackground = "#272727";
    attemptedTileBackground = "#6654f2";
    completedTileBackground = "#3b843b";
    bannerBackgroundColor = "#1b1c1d";
    headerBackgroundColor = "#222223";
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
  root.style.setProperty("--attemptedTileBackground", attemptedTileBackground);
  root.style.setProperty("--completedTileBackground", completedTileBackground);
  root.style.setProperty("--bannerBackgroundColor", bannerBackgroundColor);
  root.style.setProperty("--headerBackgroundColor", headerBackgroundColor);
}
