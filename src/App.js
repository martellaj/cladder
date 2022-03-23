import { useState } from "react";
import "./App.css";
import Game from "./Game";
import Menu from "./Menu";
import { Icon } from "semantic-ui-react";
import HowToPlay from "./HowToPlay";
import toggleDarkMode from "./toggleDarkMode";

function App() {
  const [view, setView] = useState("menu");
  const [isDarkMode, setIsDarkMode] = useState(
    window.localStorage.getItem("mode") === "dark"
  );

  const onOptionSelected = (option) => {
    if (option === "toggleDarkMode") {
      setIsDarkMode(!isDarkMode);
    }

    setView(option);
  };

  const header = (
    <div
      className="header"
      style={{
        width: "100%",
        fontSize: "28px",
        height: "50px",
        fontVariant: "all-small-caps",
        marginBottom: "12px",
        flexShrink: "0",
      }}
    >
      <div className="headerSection" style={{ marginLeft: "6px" }}>
        <Icon
          onClick={() => {
            setView("menu");
          }}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: view !== "menu" ? "visible" : "hidden",
          }}
          name="bars"
          inverted={isDarkMode}
        />
      </div>
      <span>CLADDER</span>
      <div
        className="headerSection"
        style={{ flexDirection: "row-reverse", marginRight: "6px" }}
      >
        <Icon
          name={isDarkMode ? "lightbulb" : "moon"}
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            toggleDarkMode();
          }}
          className="button"
          inverted={isDarkMode}
        />
        {/* <Icon
          onClick={() => window.open("https://twitter.com/martellaj", "_blank")}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: false ? "visible" : "hidden",
          }}
          name="twitter"
        /> */}
      </div>
    </div>
  );

  let content = null;

  switch (view) {
    case "game":
      content = <Game />;
      break;
    case "howToPlay":
      content = <HowToPlay />;
      break;
    case "menu":
    default:
      content = (
        <Menu
          onOptionSelected={onOptionSelected}
          puzzleNumber={getPuzzleNumber()}
          isDarkMode={isDarkMode}
        />
      );
      break;
  }

  const isIos = iOS();

  return (
    <div className={`App ${isIos && "App-iOS"}`}>
      {header}
      {content}
    </div>
  );
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

const getPuzzleNumber = (date) => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = date || new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};

export default App;
