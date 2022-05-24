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
  let alteredBackground = "#f2c61f";
  let alteredColorText = "black";
  let keyboardBackground = "#d3d6da";
  let keyboardActiveBackground = "#ededed";
  let attemptedTileBackground = "#c0b9f9";
  let alteredFailedBackground = alteredBackground;
  let selectedTileBackground = "#6435c9";
  let statsBackground = "#dcdcdc";
  let completedTileBackground = "#5bbd72";
  let bannerBackgroundColor = "#f3f3f3";
  let headerBackgroundColor = "#dcdcdc";
  let attemptedColorText = "white";

  let achievementBackground = "#7f7f7f";
  let achievementBackgroundSuccess = "#5bbd72";
  let achievementDescription = "white";
  let achievementBackgroundLocked = "#b6b6b6";

  let hintBackground = "#2e2e2e";

  if (mode === "dark") {
    black = "white";
    white = "#121213";
    alteredBackground = "#ffe21f";
    alteredColorText = "black";
    keyboardBackground = "#373737";
    attemptedTileBackground = "#6654f2";
    alteredFailedBackground = alteredBackground;
    keyboardActiveBackground = "#2b2b2d";
    selectedTileBackground = "#6435c9";
    statsBackground = "#222223";
    completedTileBackground = "#2ecc40";
    bannerBackgroundColor = "#1b1c1d";
    headerBackgroundColor = "#222223";
    attemptedColorText = "black";

    achievementBackground = "#b9b9b9";
    achievementDescription = "black";
    achievementBackgroundSuccess = "#2ecc40";
    achievementBackgroundLocked = "#787878";

    hintBackground = "#2e2e2e";
  }

  let root = document.documentElement;
  root.style.setProperty("--black", black);
  root.style.setProperty("--white", white);
  root.style.setProperty("--alteredBackground", alteredBackground);
  root.style.setProperty("--alteredColorText", alteredColorText);
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
  root.style.setProperty("--attemptedColorText", attemptedColorText);

  root.style.setProperty("--achievementBackground", achievementBackground);
  root.style.setProperty("--achievementDescription", achievementDescription);
  root.style.setProperty(
    "--achievementBackgroundSuccess",
    achievementBackgroundSuccess
  );
  root.style.setProperty(
    "--achievementBackgroundLocked",
    achievementBackgroundLocked
  );

  root.style.setProperty("--hintBackground", hintBackground);
}
